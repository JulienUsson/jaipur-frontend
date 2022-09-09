import { Box, Button, Container, Paper, Stack, StackProps, styled, Typography } from '@mui/material'
import { upperFirst } from 'lodash'
import range from 'lodash/range'
import { Link } from 'react-router-dom'

import TitleImg from '../assets/title.png'
import useGame from '../hooks/useGame'
import { useGameIdFromPath, usePlayerIndexFromPath } from '../hooks/usePath'

export default function Game() {
  const gameId = useGameIdFromPath()
  const playerId = usePlayerIndexFromPath()
  const game = useGame(gameId, playerId)

  return (
    <Container>
      <Stack alignItems="center">
        <Link to="/">
          <Box component="img" my={2} height="10vw" maxHeight={100} src={TitleImg} />
        </Link>
      </Stack>
      <Typography variant="h3" gutterBottom>
        {upperFirst(game.name)} - Joueur {playerId! + 1}
      </Typography>
      <Typography variant="h6">Le Marché</Typography>
      <CardStack>
        {game.market.map((card, index) => (
          <Card key={index}>{card}</Card>
        ))}
      </CardStack>
      <Typography variant="h6">Ma Main</Typography>
      <CardStack>
        {game.hand.map((card, index) => (
          <Card key={index}>{card}</Card>
        ))}
      </CardStack>
      <Typography variant="h6">Mon Enclos</Typography>
      <CardStack>
        {range(game.camelsCount).map((index) => (
          <Card key={index}>Chameau</Card>
        ))}
      </CardStack>{' '}
      <Typography variant="h6">Les Jetons Restants</Typography>
      <Typography variant="h6" mt={4} gutterBottom>
        Actions
      </Typography>
      <Stack direction="column" spacing={1} alignItems="flex-start">
        <Button variant="contained" color="primary" size="large">
          Prendre une marchandise
        </Button>
        <Button variant="contained" color="primary" size="large">
          Echanger des marchandises
        </Button>
        <Button variant="contained" color="primary" size="large">
          Prendre les chameaux
        </Button>
        <Button variant="contained" color="primary" size="large">
          Vendre des cartes
        </Button>
      </Stack>
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
