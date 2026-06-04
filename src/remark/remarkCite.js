import { visit } from 'unist-util-visit';

// Matches [@citeKey] anywhere in text, e.g. [@girard.1987] or [@doe.2020]
const CITE_PATTERN = /\[@([^\]\s,]+)\]/g;

/**
 * Factory that accepts pre-parsed bibliography data (plain JS objects, no
 * citation-js dependency here) and returns a remark plugin.
 *
 * bibData shape: { [id]: { reference: string } }
 * `reference` is the inner HTML of the formatted entry (no outer wrapper divs).
 */
export function createRemarkCitePlugin(bibData) {
  return function remarkCite() {
    return (tree) => {
      const cited = [];      // ordered by first appearance
      const citedSet = new Set();
      const replacements = []; // collected before splicing to preserve indices

      visit(tree, 'text', (node, index, parent) => {
        if (!node.value.includes('[@')) return;
        CITE_PATTERN.lastIndex = 0;
        if (!CITE_PATTERN.test(node.value)) return;
        CITE_PATTERN.lastIndex = 0;

        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = CITE_PATTERN.exec(node.value)) !== null) {
          if (match.index > lastIndex) {
            parts.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
          }

          const key = match[1];
          if (!citedSet.has(key)) {
            cited.push(key);
            citedSet.add(key);
          }

          const num = cited.indexOf(key) + 1;
          if (bibData[key]) {
            parts.push({
              type: 'link',
              url: '#references',
              children: [{ type: 'strong', children: [{ type: 'text', value: `[${num}]` }] }],
            });
          } else {
            parts.push({ type: 'text', value: `[?${key}]` });
          }

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < node.value.length) {
          parts.push({ type: 'text', value: node.value.slice(lastIndex) });
        }

        replacements.push({ parent, index, parts });
      });

      // Apply in reverse so splicing doesn't shift earlier indices
      for (let i = replacements.length - 1; i >= 0; i--) {
        const { parent, index, parts } = replacements[i];
        parent.children.splice(index, 1, ...parts);
      }

      if (cited.length === 0) return;

      const refHtml = cited
        .filter(key => bibData[key]?.reference)
        .map((key, i) => `<div class="csl-entry"><span class="cite-num">[${i + 1}]</span><span>${bibData[key].reference}</span></div>`)
        .join('');

      tree.children.push(
        // MDX v3 rejects raw `html` nodes — use a JSX element with dangerouslySetInnerHTML
        {
          type: 'mdxJsxFlowElement',
          name: 'div',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'className', value: 'cite-bibliography' },
            {
              type: 'mdxJsxAttribute',
              name: 'dangerouslySetInnerHTML',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: `{ __html: ${JSON.stringify(refHtml)} }`,
                data: {
                  estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [{
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ObjectExpression',
                        properties: [{
                          type: 'Property',
                          key: { type: 'Identifier', name: '__html' },
                          value: { type: 'Literal', value: refHtml, raw: JSON.stringify(refHtml) },
                          kind: 'init',
                          computed: false,
                          shorthand: false,
                          method: false,
                        }],
                      },
                    }],
                  },
                },
              },
            },
          ],
          children: [],
          data: { _mdxExplicitJsx: true },
        }
      );
    };
  };
}
