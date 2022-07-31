import useSWR from 'swr'

import { useGameApi } from '../contexts/ApiConfigContext'

export default function useGame(gameId: number) {
  const api = useGameApi()
  const { data } = useSWR(`games/${gameId}`, async () => await api.findOneGameById({ gameId }), {
    suspense: true,
    refreshInterval: 3000,
  })
  return data!
}
