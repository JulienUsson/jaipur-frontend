import useSWR from 'swr'

import { useGameApi } from '../contexts/ApiConfigContext'

export default function useGame(gameId: number, playerId: number) {
  const api = useGameApi()
  const { data } = useSWR(
    `games/${gameId}/players/${playerId}`,
    async () => await api.findOneGameByIdAndPlayerId({ gameId, playerId }),
    {
      suspense: true,
      refreshInterval: 3000,
    },
  )
  return data!
}
