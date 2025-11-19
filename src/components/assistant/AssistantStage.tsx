import { Link, useParams } from 'react-router-dom'
import { assistantNavItems } from '../../constants/assistant'
import { AssistantNavId } from '../../types/assistant'
import { FashionAwakening } from './FashionAwakening'
import { PetOffering } from './PetOffering'
import './AssistantStage.less'

const renderContent = (activeNav: AssistantNavId) => {
  switch (activeNav) {
    case 'fashion-awakening':
      return <FashionAwakening />
    case 'pet-offering':
      return <PetOffering />
    default:
      return null
  }
}

type AssistantStageProps = {
  activeNav?: AssistantNavId
  onNavChange?: (id: AssistantNavId) => void
}

export const AssistantStage = ({ activeNav, onNavChange: _onNavChange }: AssistantStageProps) => {
  const params = useParams<{ navId?: string }>()
  const currentNavId = (params.navId || activeNav || 'fashion-awakening') as AssistantNavId

  return (
    <div className="assistant-stage">
      <aside className="assistant-stage__nav">
        <div className="assistant-stage__nav-list">
          {assistantNavItems.map((item) => (
            <Link
              key={item.id}
              to={`/assistant/${item.id}`}
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
      <section className="assistant-stage__panel">{renderContent(currentNavId)}</section>
    </div>
  )
}


