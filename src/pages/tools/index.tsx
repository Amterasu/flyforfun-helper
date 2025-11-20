import { Link, useParams } from 'react-router-dom'
import { assistantNavItems } from '../../constants/assistant'
import { AssistantNavId } from '../../types/assistant'
import { Bless } from './bless'
import { PetOffering } from './PetOffering'
import './index.less'

const renderContent = (activeNav: AssistantNavId) => {
  switch (activeNav) {
    case 'fashion-awakening':
      return <Bless />
    case 'pet-offering':
      return <PetOffering />
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
      <aside className="tool-stage__nav">
        <div className="tool-stage__nav-list">
          {assistantNavItems.map((item) => (
            <Link
              key={item.id}
              to={`/tool/${item.id}`}
              className={item.id === currentNavId ? 'nav-card is-active' : 'nav-card'}
            >
              <div className="nav-card__texts">
                <span className="nav-card__title">{item.title}</span>
                <span className="nav-card__desc">{item.description}</span>
              </div>
              {item.badge && <span className="nav-card__badge">{item.badge}</span>}
            </Link>
          ))}
        </div>
      </aside>
      <section className="tool-stage__panel">{renderContent(currentNavId)}</section>
    </div>
  )
}

