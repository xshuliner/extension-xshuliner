import type React from 'react';
import ReactMarkdown from 'react-markdown';

export interface IXMarkdownProps {
  content: string;
  className?: string;
}

export default function XMarkdown({
  content,
  className,
}: IXMarkdownProps): React.ReactNode {
  return (
    <div className={`max-w-none ${className || ''}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className='mt-6 mb-4 text-3xl font-bold text-foreground first:mt-0'>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className='mt-5 mb-3 text-2xl font-semibold text-foreground'>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className='mt-4 mb-2 text-xl font-semibold text-foreground'>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className='mb-4 leading-relaxed text-foreground'>{children}</p>
          ),
          ul: ({ children }) => (
            <ul className='mb-4 ml-6 list-disc space-y-2 text-foreground'>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className='mb-4 ml-6 list-decimal space-y-2 text-foreground'>
              {children}
            </ol>
          ),
          li: ({ children }) => <li className='text-foreground'>{children}</li>,
          strong: ({ children }) => (
            <strong className='font-semibold text-foreground'>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className='text-foreground italic'>{children}</em>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground'>
                {children}
              </code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className='my-4 border-l-4 border-primary pl-4 text-muted-foreground italic'>
              {children}
            </blockquote>
          ),
          hr: () => <hr className='my-6 border-t border-border' />,
          a: ({ children, href }) => (
            <a
              href={href}
              className='text-primary underline hover:text-primary/80'
              target='_blank'
              rel='noopener noreferrer'
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
