import React from 'react';
import BlogCard from './BlogCard.jsx';

export default function BlogGrid({ posts }) {
  return (
    <div className="mmc-blog-grid">
      {posts.map((post, index) => (
        <BlogCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
}
