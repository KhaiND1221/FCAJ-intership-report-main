import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                // Headings with proper styling
                h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-accent-orange after:to-amber-400 after:rounded">
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-6 pb-2 border-b border-gray-200">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">{children}</h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-3">{children}</h4>
                ),

                // Paragraphs
                p: ({ children }) => (
                    <p className="text-text-secondary leading-relaxed mb-4">{children}</p>
                ),

                // Strong/Bold text
                strong: ({ children }) => (
                    <strong className="font-semibold text-text-primary">{children}</strong>
                ),

                // Links - internal vs external
                a: ({ href, children }) => {
                    const isInternal = href?.startsWith('/');
                    if (isInternal) {
                        return (
                            <Link to={href || '#'} className="text-accent-orange hover:underline">
                                {children}
                            </Link>
                        );
                    }
                    return (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-orange hover:underline"
                        >
                            {children}
                        </a>
                    );
                },

                // Unordered lists
                ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary ml-4">
                        {children}
                    </ul>
                ),

                // Ordered lists
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-text-secondary ml-4">
                        {children}
                    </ol>
                ),

                // List items
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,

                // Horizontal rule
                hr: () => <hr className="my-8 border-gray-200" />,

                // Tables with nice styling
                table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                        <table className="content-table">{children}</table>
                    </div>
                ),
                thead: ({ children }) => <thead>{children}</thead>,
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => <tr>{children}</tr>,
                th: ({ children }) => <th>{children}</th>,
                td: ({ children }) => <td className="text-text-secondary">{children}</td>,

                // Code blocks
                code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                        return (
                            <code className="bg-gray-100 text-rose-600 px-1.5 py-0.5 rounded text-sm font-mono">
                                {children}
                            </code>
                        );
                    }
                    return (
                        <div className="code-block">
                            <div className="code-header">
                                <span>{className?.replace('language-', '') || 'code'}</span>
                            </div>
                            <pre className="code-content">
                                <code>{children}</code>
                            </pre>
                        </div>
                    );
                },

                // Blockquotes for admonitions
                blockquote: ({ children }) => (
                    <blockquote className="admonition-note">{children}</blockquote>
                ),

                // Images
                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt || ''}
                        className="content-image max-w-full h-auto mx-auto"
                    />
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
