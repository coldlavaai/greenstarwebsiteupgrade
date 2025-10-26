import { PortableText as PortableTextReact } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components = {
  block: {
    normal: ({ children }: any) => <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const href = value?.href || '#'
      return (
        <a
          href={href}
          className="text-primary hover:text-primary-light underline transition-colors"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value || value.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}

// Simple inline version without default styling
export function PortableTextInline({ value }: { value: PortableTextBlock[] }) {
  if (!value || value.length === 0) {
    return null
  }

  const simpleComponents = {
    block: {
      normal: ({ children }: any) => <>{children}</>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      link: ({ value, children }: any) => {
        const href = value?.href || '#'
        return (
          <a
            href={href}
            className="underline hover:opacity-80 transition-opacity"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        )
      },
    },
  }

  return <PortableTextReact value={value} components={simpleComponents} />
}
