import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MDXComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2"
      {...props}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-800" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-lg font-medium mb-3 mt-4 text-gray-700" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7 text-gray-700" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside mb-4 space-y-2 text-gray-700 px-4"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-2 text-gray-700 px-4"
      {...props}
    />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-600 bg-gray-50 py-2"
      {...props}
    />
  ),
  code: ({
    children,
    className,
    ...props
  }: React.HTMLProps<HTMLElement> & { className?: string }) => {
    const match = /language-(\w+)/.exec(className || '')
    if (match) {
      const language = match[1]
      return (
        <SyntaxHighlighter
          style={tomorrow as never}
          language={language}
          PreTag="div"
          className="rounded-lg"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    }
    return (
      <code
        className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-pink-600"
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }: React.HTMLProps<HTMLPreElement>) => (
    <div className="mb-4">{children}</div>
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),
  strong: (props: React.HTMLProps<HTMLElement>) => (
    <strong className="font-bold text-gray-900" {...props} />
  ),
  em: (props: React.HTMLProps<HTMLElement>) => (
    <em className="italic text-gray-700" {...props} />
  ),
}

export default MDXComponents
