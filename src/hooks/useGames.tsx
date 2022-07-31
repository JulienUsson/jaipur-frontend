import useSWR from 'swr'

import { useGameApi } from '../contexts/ApiConfigContext'

export default function useGames() {
  const api = useGameApi()
  return useSWR('games', async () => await api.findAllActiveGames(), {
    refreshInterval: 3000,
  })
}
