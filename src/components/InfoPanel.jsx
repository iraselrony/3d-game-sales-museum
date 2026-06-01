import { motion } from 'framer-motion'
import { useMuseumStore } from '../store/useMuseumStore'
import { CoverCard } from './CoverCard'

export function InfoPanel() {
  const game = useMuseumStore((state) => state.selectedGame())
  const visible = useMuseumStore((state) => state.isVisible(game.rank))

  return (
    <motion.aside
      key={game.rank}
      className="panel info-panel"
      aria-label="Selected exhibit details"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      style={{ '--panel-accent': game.accent }}
    >
      <div className="info-topline">
        <span>Rank #{game.rank}</span>
        <span className={visible ? 'status' : 'status status--muted'}>{visible ? 'Active' : 'Filtered'}</span>
      </div>
      <CoverCard game={game} />
      <h2>{game.title}</h2>
      <p className="sales-figure">{game.sales} estimated units</p>
      <p className="note">{game.note}</p>
      <dl className="facts">
        <div>
          <dt>Platform</dt>
          <dd>{game.platform}</dd>
        </div>
        <div>
          <dt>Era / Year</dt>
          <dd>
            {game.era} / {game.year}
          </dd>
        </div>
        <div>
          <dt>Publisher</dt>
          <dd>{game.publisher}</dd>
        </div>
        <div>
          <dt>Region / Flag</dt>
          <dd>
            {game.region} ({game.flag})
          </dd>
        </div>
      </dl>
    </motion.aside>
  )
}
