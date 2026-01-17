import React from 'react';
type Props = { html: string };
const BlogPostContent: React.FC<Props> = ({ html }) => (
  <div className="prose prose-invert prose-brand max-w-none mb-10">
    <div className="text-white/80 text-lg leading-relaxed space-y-6 blog-content" dangerouslySetInnerHTML={{ __html: html }} />
  </div>
);
export default BlogPostContent;
