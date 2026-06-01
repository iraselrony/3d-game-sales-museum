export function CoverCard({ game, compact = false }) {
  return (
    <div
      className={`cover-card ${compact ? 'cover-card--compact' : ''} motif-${game.cover.motif}`}
      style={{
        '--cover-a': game.cover.gradient[0],
        '--cover-b': game.cover.gradient[1],
        '--cover-accent': game.accent,
      }}
      aria-label={`${game.title} placeholder cover card`}
    >
      <span className="cover-rank">#{game.rank}</span>
      <span className="cover-initials">{game.cover.initials}</span>
      <span className="cover-grid" />
      <span className="cover-title">{game.title}</span>
    </div>
  )
}
