"use client";

import React from "react";

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <>
            <div
                className="blog-content mx-auto"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <style jsx global>{`
        .blog-content {
          line-height: 1.8;
          font-size: 1.125rem;
          color: var(--color-foreground);
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: bold;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: var(--color-primary);
        }

        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: bold;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: var(--color-primary);
        }

        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--color-primary);
        }

        .blog-content ul {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
          list-style-type: disc;
          list-style-position: outside;
        }

        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
          list-style-type: decimal;
          list-style-position: outside;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
          margin-left: 0.5rem;
          line-height: 1.8;
        }

        .blog-content a {
          color: var(--color-primary);
          text-decoration: underline;
          transition: opacity 0.2s;
        }

        .blog-content a:hover {
          opacity: 0.8;
        }

        .blog-content strong {
          font-weight: 600;
          color: var(--color-charcoal);
        }

        .blog-content blockquote {
          border-left: 4px solid var(--color-secondary);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--color-muted-foreground);
        }

        .blog-content code {
          background: var(--color-secondary);
          opacity: 0.2;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        /* Adjust for dark text on light secondary background if needed, or use a specific code bg */
        .blog-content code {
           background: rgba(0,0,0,0.05); /* Fallback/override */
           opacity: 1; /* Reset opacity from previous rule */
           border: 1px solid var(--color-border);
        }

        .blog-content pre {
          background: #1a1a1a;
          color: #fff;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
          border: 1px solid var(--color-border);
        }

        .blog-content img {
          border-radius: 0.75rem;
          margin: 2rem 0;
          max-width: 100%;
          height: auto;
        }
      `}</style>
        </>
    );
}
