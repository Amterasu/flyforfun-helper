import type { NavNode } from '../types'

const TOC_START =
  '<table><tr><td><details><summary>📁 Table of Contents</summary>'
const TOC_END = '</details></td></tr></table>'

export function parseReadmeNav(markdown: string): NavNode[] {
  const tocBlock = extractTocBlock(markdown)
  if (!tocBlock) return []

  const lines = tocBlock.split(/\r?\n/)
  const roots: NavNode[] = []
  const stack: NavNode[] = []
  let counter = 0

  lines.forEach((line) => {
    const match = line.match(/^(\s*)-\s+\[([^\]]+)\]\(([^)]+)\)/)
    if (!match) return

    const indent = match[1]?.length ?? 0
    const depth = Math.floor(indent / 2)
    const rawTitle = match[2].trim()
    const anchor = match[3].trim()

    const { label, emoji } = splitEmoji(rawTitle)

    const node: NavNode = {
      id: `${anchor}-${counter}`,
      title: rawTitle,
      label,
      emoji,
      anchor,
      depth,
      children: [],
    }
    counter += 1

    if (depth === 0) {
      roots.push(node)
      stack[0] = node
      stack.length = 1
    } else {
      const parent = stack[depth - 1]
      if (parent) {
        parent.children.push(node)
      } else if (roots.length) {
        roots[roots.length - 1].children.push(node)
      }
      stack[depth] = node
      stack.length = depth + 1
    }
  })

  return roots
}

function extractTocBlock(markdown: string): string | null {
  const start = markdown.indexOf(TOC_START)
  if (start === -1) return null
  const end = markdown.indexOf(TOC_END, start)
  if (end === -1) return null
  return markdown.slice(start + TOC_START.length, end)
}

function splitEmoji(title: string): { label: string; emoji?: string } {
  const match = title.match(/^([\p{Extended_Pictographic}\p{Symbol}\p{Emoji}]+)\s*(.+)?$/u)
  if (!match) {
    return { label: title }
  }

  const [, emoji, rest] = match
  return {
    emoji,
    label: rest?.trim() ?? title,
  }
}

export function countNavNodes(nodes: NavNode[]): number {
  return nodes.reduce(
    (total, node) => total + 1 + countNavNodes(node.children),
    0,
  )
}

export function filterNavTree(nodes: NavNode[], keyword: string): NavNode[] {
  if (!keyword.trim()) return nodes
  const term = keyword.trim().toLowerCase()

  const visit = (list: NavNode[]): NavNode[] =>
    list
      .map((node) => {
        const children = visit(node.children)
        const match =
          node.title.toLowerCase().includes(term) ||
          node.label.toLowerCase().includes(term)
        if (match || children.length) {
          return { ...node, children }
        }
        return null
      })
      .filter(Boolean) as NavNode[]

  return visit(nodes)
}

export function flattenNav(nodes: NavNode[]): NavNode[] {
  const result: NavNode[] = []
  const walk = (list: NavNode[]) => {
    list.forEach((node) => {
      result.push(node)
      if (node.children.length) walk(node.children)
    })
  }
  walk(nodes)
  return result
}

