import { Link, useParams } from 'react-router-dom'
import { assistantNavItems } from '../../constants/assistant'
import { AssistantNavId } from '../../types/assistant'
import { Bless } from './bless'
import { PetTool } from './pet'
import './index.less'

const renderContent = (activeNav: AssistantNavId) => {
  switch (activeNav) {
    case 'fashion-awakening':
      return <Bless />
    case 'pet-tool':
      return <PetTool />
    default:
      return null
  }
}

type ToolsPageProps = {
  activeNav?: AssistantNavId
  onNavChange?: (id: AssistantNavId) => void
}

export const ToolsPage = ({ activeNav }: ToolsPageProps) => {
  const params = useParams<{ navId?: string }>()
  const currentNavId = (params.navId || activeNav || 'fashion-awakening') as AssistantNavId

  return (
    <div className="tool-stage">
      <div className="tool-stage__nav">
        <div className="tool-stage__nav-list">
          {assistantNavItems.map((item) => (
            <Link
              key={item.id}
              to={`/tool/${item.id}`}
              className={item.id === currentNavId ? 'nav-card is-active' : 'nav-card'}
              title={item.description}
            >
              <div className="nav-card__texts">
                <span className="nav-card__title">{item.title}</span>
                <span className="nav-card__desc">{item.description}</span>
              </div>
              {item.badge && <span className="nav-card__badge">{item.badge}</span>}
            </Link>
          ))}
        </div>
      </div>
      <section className="tool-stage__panel">
        <div className="tool-stage__content">{renderContent(currentNavId)}</div>
      </section>
    </div>
  )
}

