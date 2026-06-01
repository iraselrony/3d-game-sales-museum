import { create } from 'zustand'
import { games } from '../data/games'

const defaultCamera = {
  position: [0, 6.6, 13.8],
  target: [0, 1.1, -0.5],
}

const getVisibleGames = (filters) =>
  games.filter((game) => {
    const platformMatch = filters.platform === 'All' || game.platform === filters.platform
    const eraMatch = filters.era === 'All' || game.era === filters.era
    const regionMatch = filters.region === 'All' || game.region === filters.region
    return platformMatch && eraMatch && regionMatch
  })

const findNextRank = (selectedRank, filters, direction) => {
  const visible = getVisibleGames(filters)
  if (!visible.length) return selectedRank
  const index = visible.findIndex((game) => game.rank === selectedRank)
  const safeIndex = index === -1 ? 0 : index
  const nextIndex = (safeIndex + direction + visible.length) % visible.length
  return visible[nextIndex].rank
}

export const useMuseumStore = create((set, get) => ({
  selectedRank: 1,
  filters: {
    platform: 'All',
    era: 'All',
    region: 'All',
  },
  isTouring: false,
  jumpNotice: '',
  cameraMode: 'overview',
  cameraTarget: defaultCamera,
  visibleGames: () => getVisibleGames(get().filters),
  selectedGame: () => games.find((game) => game.rank === get().selectedRank) ?? games[0],
  isVisible: (rank) => getVisibleGames(get().filters).some((game) => game.rank === rank),
  selectRank: (rank) => {
    const exists = games.some((game) => game.rank === rank)
    if (!exists) return
    set({
      selectedRank: rank,
      isTouring: false,
      jumpNotice: '',
      cameraMode: 'exhibit',
    })
  },
  jumpToRank: (rank) => {
    const game = games.find((item) => item.rank === rank)
    if (!game) {
      set({ jumpNotice: 'Choose a rank from 1 to 12.' })
      return
    }
    const visible = getVisibleGames(get().filters).some((item) => item.rank === rank)
    if (!visible) {
      set({ jumpNotice: `Rank ${rank} is hidden by the current filters.` })
      return
    }
    set({
      selectedRank: rank,
      jumpNotice: '',
      isTouring: false,
      cameraMode: 'exhibit',
    })
  },
  next: ({ keepTour = false } = {}) => {
    const state = get()
    set({
      selectedRank: findNextRank(state.selectedRank, state.filters, 1),
      isTouring: keepTour ? state.isTouring : false,
      jumpNotice: '',
      cameraMode: 'exhibit',
    })
  },
  previous: () => {
    const state = get()
    set({
      selectedRank: findNextRank(state.selectedRank, state.filters, -1),
      isTouring: false,
      jumpNotice: '',
      cameraMode: 'exhibit',
    })
  },
  setFilter: (key, value) => {
    const nextFilters = { ...get().filters, [key]: value }
    const visible = getVisibleGames(nextFilters)
    const selectedStillVisible = visible.some((game) => game.rank === get().selectedRank)
    set({
      filters: nextFilters,
      selectedRank: selectedStillVisible ? get().selectedRank : visible[0]?.rank ?? get().selectedRank,
      isTouring: false,
      jumpNotice: visible.length ? '' : 'No exhibits match these filters.',
      cameraMode: visible.length ? 'exhibit' : 'overview',
    })
  },
  resetFilters: () =>
    set({
      filters: { platform: 'All', era: 'All', region: 'All' },
      jumpNotice: '',
    }),
  toggleTour: () =>
    set((state) => ({
      isTouring: !state.isTouring,
      cameraMode: 'exhibit',
      jumpNotice: '',
    })),
  stopTour: () => set({ isTouring: false }),
  resetView: () =>
    set({
      isTouring: false,
      cameraMode: 'overview',
      cameraTarget: defaultCamera,
      jumpNotice: '',
    }),
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
}))
