// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import { createRequire } from 'module';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createRemarkCitePlugin } from './src/remark/remarkCite.js';

const _require = createRequire(import.meta.url);

/** @param {string} bibPath */
function buildBibData(bibPath) {
  if (!existsSync(bibPath)) return null;
  try {
    const { Cite } = _require('@citation-js/core');
    _require('@citation-js/plugin-bibtex');
    _require('@citation-js/plugin-csl');
    const content = readFileSync(bibPath, 'utf8');
    const all = new Cite(content);
    /** @type {Record<string, {reference: string}>} */
    const bibData = {};
    for (const entry of all.data) {
      const fullHtml = new Cite(entry).format('bibliography', {
        format: 'html',
        template: 'apa',
        lang: 'en-US',
      });
      // Extract just the inner content of <div class="csl-entry"> so the
      // remark plugin can prepend [N] numbers without nesting wrapper divs.
      const inner = /<div[^>]*class="csl-entry"[^>]*>([\s\S]*?)<\/div>/.exec(fullHtml);
      const rawRef = inner ? inner[1].trim() : fullHtml;
      // Reformat DOI URLs as "DOI: 10.xxx" external links instead of bare URLs.
      const reference = rawRef.replace(
        /https?:\/\/doi\.org\/(10\.[^\s<"]+)/g,
        (/** @type {string} */ _, /** @type {string} */ id) => `<a href="https://doi.org/${id}" target="_blank" rel="noopener noreferrer">DOI: ${id}</a>`,
      );
      bibData[String(entry.id)] = { reference };
    }
    return bibData;
  } catch (e) {
    console.warn('[remarkCite] Could not load bibliography:', e instanceof Error ? e.message : String(e));
    return null;
  }
}

const bibData = buildBibData(join(process.cwd(), 'references.bib'));
const remarkCitePlugin = bibData ? [createRemarkCitePlugin(bibData)] : [];

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Photography, Videography, Media',
  tagline: 'Lifestyle and Travel Photography',
  favicon: 'img/icon.ico',
  url: 'https://tomstimecapsule.github.io',
  baseUrl: '/',
  projectName: 'tomstimecapsule.github.io',
  organizationName: 'tomstimecapsule',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          blogTitle: "Tom's Time Capsule - Media Journal",
          blogDescription: 'Landscape, travel, and lifestyle content.',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            description: 'Landscape, travel, and lifestyle photography journal entries',
            title: 'ttc Journal',
            copyright: `Copyright © ${new Date().getFullYear()} tomstimecapsule.`
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: remarkCitePlugin,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-W3VH12GEFQ',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
      type: "text/css",
      rel: "stylesheet",
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social_16_9.jpg',
      colorMode: {
        defaultMode: 'light',
        // Ignore the visitor's OS dark-mode preference; always start in light.
        respectPrefersColorScheme: false,
      },
      metadata: [
        {name: 'keywords', content: "photography journal, blog, tom's time capsule"},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      navbar: {
        title: "tomstimecapsule",
        logo: {
          alt: 'toms time capsule site Logo',
          src: 'img/ttc.png',
          srcDark: 'img/ttc_dark.png',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {to: '/blog', label: 'Journal', position: 'right'},
          {to: '/contact', label: 'Contact', position: 'right'},
          {
            type: 'html',
            position: 'right',
            value: `<a href="https://www.instagram.com/tomstimecapsule/" target="_blank" rel="noopener noreferrer">
                      <i class="fa-brands fa-instagram navbar-icon"></i>
                    </a>`,
          },
          {
            type: 'html',
            position: 'right',
            value: `<a href="https://bsky.app/profile/tomstimecapsule.bsky.social" target="_blank" rel="noopener noreferrer">
                      <i class="fa-brands fa-bluesky navbar-icon"></i>
                    </a>`,
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Navigate',
            items: [
              {label: 'Journal', to: '/blog'},
              {label: 'Contact', to: '/contact'},
            ],
          },
          {
            title: 'Follow',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/tomstimecapsule/',
              },
              {
                label: 'BlueSky',
                href: 'https://bsky.app/profile/tomstimecapsule.bsky.social',
              },
            ],
          },
        ],
        logo: {
          alt: 'tom\'s time capsule logo',
          src: 'img/ttc_dark.png',
          width: 50,
        },
        copyright: `Copyright © ${new Date().getFullYear()} tomstimecapsule`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
