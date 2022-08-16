import { Container, Paper, Stack, StackProps, styled, Typography } from '@mui/material'
import range from 'lodash/range'

import useGame from '../hooks/useGame'
import { useGameIdFromPath, usePlayerIndexFromPath } from '../hooks/usePath'

export default function Game() {
  const gameId = useGameIdFromPath()
  const playerId = usePlayerIndexFromPath()
  const game = useGame(gameId, playerId)

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Partie {game.name} Joueur {playerId! + 1}
      </Typography>

      <Typography variant="h6">Marché</Typography>
      <CardStack>
        {game.market.map((card, index) => (
          <Card key={index}>{card}</Card>
        ))}
      </CardStack>
      <Typography variant="h6">Main</Typography>
      <CardStack>
        {game.hand.map((card, index) => (
          <Card key={index}>{card}</Card>
        ))}
      </CardStack>
      <Typography variant="h6">Enclos</Typography>
      <CardStack>
        {range(game.camelsCount).map((index) => (
          <Card key={index}>Chameau</Card>
        ))}
      </CardStack>
    </Container>
  )
}

const CardStack = (props: StackProps) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Stack direction="row" spacing={1} {...props} />
  </Paper>
)

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  fontWeight: '500',
  textTransform: 'uppercase',
}))
