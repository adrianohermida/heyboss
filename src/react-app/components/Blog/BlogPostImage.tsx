import React from 'react';
type Props = { src: string; alt: string };
const BlogPostImage: React.FC<Props> = ({ src, alt }) => (
  <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
    <img src={src} alt={alt} className="w-full h-auto object-cover" />
  </div>
);
export default BlogPostImage;
