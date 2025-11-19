import { CoachingCard, type CoachingItem } from '../components/CoachingCard'
import './CoachingPage.less'

// 代练数据（示例数据，后续可以从配置文件或 API 加载）
const coachingList: CoachingItem[] = [
  {
    id: '1',
    name: '蘑菇王',
    cover: '/leech/moguwang.png', // 使用默认封面，后续可以替换
    contact: 'QQ: 919937231',
    description: `我从事飞飞国际服代练已多年，深知"信誉"是立身之本。所有服务均支持**全程进度查询，信誉记录可随时查验**。凭借扎实的技术和真诚的服务，在老板间积累了**绝佳的口碑**。您的账号安全与游戏体验，始终是我的首要考量。

**我的服务宗旨：** 不止是机械地完成任务，更是为您提供最优的练级方案和游戏理解，成为您值得信赖的飞飞引路人。

如果您正在寻找一个专业、靠谱、能真正帮到您的伙伴，请联系我！让我们携手，在飞飞的天空中飞得更高、更远。`
  }
  // 可以添加更多代练数据
]

export const CoachingPage = () => {
  return (
    <div className="coaching-page">
      <div className="doc-content">
        <div className="doc-content-layout">
          <div className="doc-content-main">
            <header>
              <p className="eyebrow">专业服务</p>
              <h2>🎮 代练</h2>
              <p className="lede">寻找专业的飞飞代练服务，安全可靠，信誉保证</p>
            </header>
            <div className="coaching-list">
              {coachingList.length > 0 ? (
                <div className="coaching-grid">
                  {coachingList.map((item) => (
                    <CoachingCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="empty-state-card">
                  <p>暂无代练服务，敬请期待。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

