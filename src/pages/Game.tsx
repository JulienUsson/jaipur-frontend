import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import useGame from '../hooks/useGame'

export default function Game() {
  const { gameId, playerIndex } = useParams<{ gameId: string; playerIndex: string }>()
  const game = useGame(parseInt(gameId))

  return (
    <>
      <Typography variant="h2">
        Partie {game.name} Joueur {playerIndex + 1}
      </Typography>

      <Typography variant="h6">Marché</Typography>

      <Typography variant="h6">Main</Typography>
    </>
  )
}
