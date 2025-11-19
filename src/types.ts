export type Costume = {
  id: number
  order: number
  name: string
  releaseDate: string
  year: number
  group: string
  gearPieces: string[]
  notes: string[]
  image?: string
}

export type EventHighlight = {
  id: number
  period: string
  costumes: string[]
}

export type SaleHighlight = {
  id: string
  title: string
  period: string
  description: string
}

export type ParsedMarkdown = {
  costumes: Costume[]
  events: EventHighlight[]
  sales: SaleHighlight[]
}

export type NavNode = {
  id: string
  title: string
  label: string
  emoji?: string
  anchor: string
  depth: number
  children: NavNode[]
}

