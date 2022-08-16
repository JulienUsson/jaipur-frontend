import { useParams } from 'react-router-dom'

export function useGameIdFromPath(): number {
  const params = useParams()
  return parseInt(params.gameId!)
}

export function usePlayerIndexFromPath(): number {
  const params = useParams()
  return parseInt(params.playerIndex!)
}
