import { marked } from 'marked'
import type { NavNode } from '../types'

export function extractSectionMarkdown(
  node: NavNode,
  markdown: string,
): string {
  if (!node || !markdown) return ''
  const lines = markdown.split(/\r?\n/)
  const headingLevel = Math.min(6, node.depth + 1)
  const headingPrefix = '#'.repeat(headingLevel)
  const normalizedTitle = node.title.trim()

  const headingIndex = lines.findIndex((line) =>
    line.trim().startsWith(`${headingPrefix} ${normalizedTitle}`),
  )

  if (headingIndex === -1) {
    return `${headingPrefix} ${normalizedTitle}\n\n> 暂无原文片段，确认 README 中是否存在该章节。`
  }

  let endIndex = headingIndex + 1
  while (endIndex < lines.length) {
    const line = lines[endIndex]
    if (line.trim().startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length ?? 0
      if (level <= headingLevel) {
        break
      }
    }
    endIndex += 1
  }

  return lines.slice(headingIndex, endIndex).join('\n').trim()
}

export function renderMarkdown(snippet: string): string {
  if (!snippet.trim()) {
    return '<p>暂无内容。</p>'
  }

  return marked.parse(snippet, {
    async: false,
    breaks: true,
    mangle: false,
    headerIds: true,
  }) as string
}

