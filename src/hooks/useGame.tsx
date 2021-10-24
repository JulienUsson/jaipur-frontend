import useSWR from 'swr'

import { GameApi } from '../api'

export default function useGame(id: number) {
  const api = new GameApi()
  const { data } = useSWR(`games/${id}`, async () => await api.findOneGameById({ id }), {
    suspense: true,
    refreshInterval: 3000,
  })
  return data!
}
