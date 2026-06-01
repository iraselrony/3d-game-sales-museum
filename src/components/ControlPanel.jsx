import { filterOptions, games } from '../data/games'
import { useMuseumStore } from '../store/useMuseumStore'

const getVisibleGames = (filters) =>
  games.filter((game) => {
    const platformMatch = filters.platform === 'All' || game.platform === filters.platform
    const eraMatch = filters.era === 'All' || game.era === filters.era
    const regionMatch = filters.region === 'All' || game.region === filters.region
    return platformMatch && eraMatch && regionMatch
  })

export function ControlPanel() {
  const filters = useMuseumStore((state) => state.filters)
  const selectedRank = useMuseumStore((state) => state.selectedRank)
  const isTouring = useMuseumStore((state) => state.isTouring)
  const jumpNotice = useMuseumStore((state) => state.jumpNotice)
  const next = useMuseumStore((state) => state.next)
  const previous = useMuseumStore((state) => state.previous)
  const resetView = useMuseumStore((state) => state.resetView)
  const resetFilters = useMuseumStore((state) => state.resetFilters)
  const toggleTour = useMuseumStore((state) => state.toggleTour)
  const setFilter = useMuseumStore((state) => state.setFilter)
  const jumpToRank = useMuseumStore((state) => state.jumpToRank)
  const visibleGames = getVisibleGames(filters)

  return (
    <aside className="panel control-panel" aria-label="Museum controls">
      <div>
        <p className="eyebrow">Controls</p>
        <h1>Explore the ranked exhibits</h1>
        <p className="panel-copy">{visibleGames.length} of 12 exhibits active</p>
      </div>

      <div className="button-row">
        <button type="button" onClick={previous} disabled={!visibleGames.length}>
          Previous
        </button>
        <button type="button" onClick={next} disabled={!visibleGames.length}>
          Next
        </button>
      </div>

      <div className="button-row">
        <button type="button" className={isTouring ? 'active' : ''} onClick={toggleTour} disabled={!visibleGames.length}>
          {isTouring ? 'Pause Tour' : 'Guided Tour'}
        </button>
        <button type="button" onClick={resetView}>
          Reset View
        </button>
      </div>

      <label className="field">
        <span>Jump to rank</span>
        <select value={selectedRank} onChange={(event) => jumpToRank(Number(event.target.value))}>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((rank) => (
            <option key={rank} value={rank}>
              #{rank}
            </option>
          ))}
        </select>
      </label>

      <div className="filter-grid">
        <label className="field">
          <span>Platform</span>
          <select value={filters.platform} onChange={(event) => setFilter('platform', event.target.value)}>
            {filterOptions.platform.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Era</span>
          <select value={filters.era} onChange={(event) => setFilter('era', event.target.value)}>
            {filterOptions.era.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Region</span>
          <select value={filters.region} onChange={(event) => setFilter('region', event.target.value)}>
            {filterOptions.region.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" className="ghost-button" onClick={resetFilters}>
        Clear filters
      </button>
      {jumpNotice && <p className="notice">{jumpNotice}</p>}
    </aside>
  )
}
