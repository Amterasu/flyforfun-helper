import { docTree } from '../constants'
import './DocStage.less'

type DocPrimaryFilterProps = {
  activeSection: string
  onSelect: (id: string) => void
}

export const DocPrimaryFilter = ({ activeSection, onSelect }: DocPrimaryFilterProps) => {
  return (
    <div className="doc-primary-filter" role="tablist" aria-label="一级导航">
      {docTree.map((section) => (
        <button
          key={section.id}
          role="tab"
          aria-selected={section.id === activeSection}
          className={section.id === activeSection ? 'active' : ''}
          onClick={() => onSelect(section.id)}
        >
          {section.title}
        </button>
      ))}
    </div>
  )
}

