import type {
  Costume,
  EventHighlight,
  ParsedMarkdown,
  SaleHighlight,
} from '../types'

const COSTUME_LINE = /^(\d+)\.\s+(\d{4}-\d{2}-\d{2}):\s+(.+)$/
const NEXT_ENTRY_LINE = /^(\d+)\.\s+\d{4}-\d{2}-\d{2}:/

export function parseCostumeMarkdown(markdown: string): ParsedMarkdown {
  const lines = markdown.split(/\r?\n/)
  const costumes: Costume[] = []
  let currentGroup = ''

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index]
    const trimmed = rawLine.trim()

    if (trimmed.startsWith('### ') && /\d/.test(trimmed)) {
      currentGroup = trimmed.replace('###', '').trim()
      continue
    }

    const normalized = trimmed.replace(/`/g, '')
    const match = normalized.match(COSTUME_LINE)

    if (!match) continue

    const order = Number(match[1])
    const releaseDate = match[2]
    const name = sanitizeText(match[3])
    const year = Number(releaseDate.slice(0, 4))

    const costume: Costume = {
      id: order,
      order,
      name,
      releaseDate,
      year,
      group: currentGroup || '未分组',
      gearPieces: [],
      notes: [],
    }

    index = collectCostumeDetails(lines, index + 1, costume)
    costumes.push(costume)
  }

  const events = extractEvents(markdown)
  const sales = extractSales(markdown)

  return {
    costumes,
    events,
    sales,
  }
}

function collectCostumeDetails(
  lines: string[],
  startIndex: number,
  costume: Costume,
): number {
  let index = startIndex

  for (; index < lines.length; index += 1) {
    const rawLine = lines[index]
    const trimmed = rawLine.trim()

    if (!trimmed) continue

    const normalized = trimmed.replace(/`/g, '')

    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      index -= 1
      break
    }

    if (normalized.match(NEXT_ENTRY_LINE)) {
      index -= 1
      break
    }

    if (trimmed.startsWith('</details>')) {
      break
    }

    if (trimmed.startsWith('*')) {
      const text = sanitizeText(trimmed.replace(/^[*-]\s*/, ''))
      if (!text) continue

      if (
        !costume.gearPieces.length &&
        /\/|Hat|Helmet|Suit|Hands|Shoes|Hair|Mask|Cloak|Backpack/i.test(text)
      ) {
        costume.gearPieces = text
          .split('/')
          .map((piece) =>
            piece
              .replace(/\(.*?\)/g, '')
              .replace(/\bBag\b/gi, 'Bag')
              .trim(),
          )
          .filter(Boolean)
      } else {
        costume.notes.push(text)
      }
    }

    const imageMatch = trimmed.match(/<img[^>]+src="([^"]+)"/i)
    if (imageMatch) {
      costume.image = imageMatch[1].replace('./', '/')
    }
  }

  return index
}

function sanitizeText(value: string): string {
  return value.replace(/`/g, '').replace(/\s+/g, ' ').trim()
}

function extractEvents(markdown: string): EventHighlight[] {
  const section = markdown
    .split('## 🎉 Costume Collection Event')[1]
    ?.split('## 🛒')[0]

  if (!section) return []

  const lines = section.split(/\r?\n/).map((line) => line.trim())
  const events: EventHighlight[] = []

  lines.forEach((line) => {
    if (!line.startsWith('1.') && !/^\d+\./.test(line)) return

    const sanitized = line.replace(/`/g, '')
    const match = sanitized.match(/^(\d+)\.\s*([^:]+):\s*(.+)$/)
    if (!match) return

    const period = match[2].trim()
    const costumeNames = match[3]
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)

    events.push({
      id: events.length + 1,
      period,
      costumes: costumeNames,
    })
  })

  return events
}

function extractSales(markdown: string): SaleHighlight[] {
  const section = markdown.split('## 🛒 On Sale')[1]
  if (!section) return []

  const blocks = section.split(/###\s+/).slice(1)
  const sales: SaleHighlight[] = []

  blocks.forEach((block) => {
    const [titleLine, ...rest] = block.split(/\r?\n/)
    const title = sanitizeText(titleLine ?? 'On Sale')

    rest.forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed.startsWith('*')) return

      const sanitized = sanitizeText(trimmed.replace(/^\*\s*/, ''))
      if (!sanitized) return

      const [periodPart, ...descriptionParts] = sanitized.split(':')
      const period = periodPart.trim()
      const description = descriptionParts.join(':').trim()

      sales.push({
        id: `${title}-${sales.length + 1}`,
        title,
        period,
        description: description || '更多详情请查看游戏内公告。',
      })
    })
  })

  return sales
}

