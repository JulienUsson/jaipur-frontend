import useSWR from 'swr'

import { GameApi } from '../api'

export default function useGames() {
  const api = new GameApi()
  const { data } = useSWR('games', async () => await api.findAllGames(), {
    suspense: true,
    refreshInterval: 3000,
  })
  return data!
}
