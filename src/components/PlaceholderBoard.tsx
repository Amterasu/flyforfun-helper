import './PlaceholderBoard.less'

type PlaceholderBoardProps = {
  title: string
}

export const PlaceholderBoard = ({ title }: PlaceholderBoardProps) => {
  return (
    <div className="placeholder-board">
      <h3>{title} 模块</h3>
      <p>交互工具尚在策划中，敬请期待下一次内容推送。</p>
      <div className="cta-row">
        <button className="solid-btn">订阅更新</button>
        <button className="ghost-btn">提交需求</button>
      </div>
    </div>
  )
}

