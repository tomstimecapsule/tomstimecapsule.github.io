import React from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
import BlogEndBar from "@site/src/customizations/BlogEndBar";

// Firestore doc IDs can't contain "/", so turn the permalink into a safe,
// stable, unique key (e.g. "/mimetic" -> "mimetic", "/blog/2025/x" -> "blog-2025-x").
function toReactionSlug(permalink) {
  return permalink.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
}

export default function BlogPostItemFooter() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;
  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  // Always render the footer on a full post page so reactions show even when
  // the post has no tags / edit link.
  const renderFooter = tagsExists || truncatedPost || editUrl || isBlogPostPage;
  if (!renderFooter) {
    return null;
  }
  // BlogPost footer - details view
  if (isBlogPostPage) {
    
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    return (
      <footer className="docusaurus-mt-lg">
        {tagsExists && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
        {/* Reactions are client-only: the firebase module must not run during SSR. */}
        <BrowserOnly>
          {() => {
            const BlogReactions =
              require('@site/src/components/BlogReactions').default;
            return <BlogReactions slug={toReactionSlug(metadata.permalink)} />;
          }}
        </BrowserOnly>
      </footer>
    );
  }
  // BlogPost footer - list view
  else {
    return (
      <div>
      <footer className="row docusaurus-mt-lg">
        {tagsExists && (
          <div className={clsx('col', {'col--9': truncatedPost})}>
            <TagsListInline tags={tags} />
          </div>
        )}
        {truncatedPost && (
          <div
            className={clsx('col text--right', {
              'col--3': tagsExists,
            })}>
            <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
          </div>
        )}
      </footer>
        {/* Same slug as the post page, so reactions are shared between views. */}
        <BrowserOnly>
          {() => {
            const BlogReactions =
              require('@site/src/components/BlogReactions').default;
            return <BlogReactions slug={toReactionSlug(metadata.permalink)} />;
          }}
        </BrowserOnly>
        {
          !isBlogPostPage && <BlogEndBar />
        }
        </div>
    );
  }
}
