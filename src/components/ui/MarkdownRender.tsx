'use client'

import styled from '@emotion/styled'
import { useMemo } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

interface MarkdownRenderProps {
  markdown: string
}


export const MarkdownRender = ({ markdown }: MarkdownRenderProps) => {
  const htmlContent = useMemo(() => {
    return remark().use(remarkGfm).use(html).processSync(markdown).toString()
  }, [markdown])

  return <MarkdownContainer dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

const MarkdownContainer = styled.div`
  & h1 {
    color: #1f2937;
    padding-bottom: 0.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.875rem;
    font-weight: 700;
  }

  & h2 {
    padding-bottom: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  & h3 {
    color: #1f2937;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  & p {
    margin: 1rem 0;
    line-height: 1.7;
    font-size: 1rem;
  }

  & ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  & ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    list-style-type: decimal;
  }

  & li {
    margin: 0.5rem 0;
    line-height: 1.7;
    font-size: 1rem;
    list-style-type: disc;
  }

  & strong {
    color: #1f2937;
    font-weight: 600;
  }

  & em {
    color: #6b7280;
    font-style: italic;
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  & th {
    background-color: #f8fafc;
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #e5e7eb;
    color: #374151;
    font-size: 0.875rem;
  }

  & td {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
    font-size: 0.9rem;
  }

  & tbody tr:hover {
    background-color: #f9fafb;
  }

  & tbody tr:last-child td {
    border-bottom: none;
  }

  & hr {
    border: none;
    border-top: 2px solid #e5e7eb;
    margin: 2.5rem 0;
  }

  & code {
    background-color: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.875em;
    color: #e11d48;
  }

  & pre {
    background-color: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;

    & code {
      background: none;
      padding: 0;
      color: #374151;
    }
  }

  & blockquote {
    border-left: 4px solid #3b82f6;
    margin: 1.5rem 0;
    padding-left: 1rem;
    color: #6b7280;
    font-style: italic;
    background-color: #f8fafc;
    padding: 1rem 1rem 1rem 1.5rem;
    border-radius: 0 4px 4px 0;
  }

  & a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
      color: #2563eb;
    }
  }
`