import { Box, Button, Container, Paper, Stack, StackProps, styled, Typography } from '@mui/material'
import { upperFirst } from 'lodash'
import range from 'lodash/range'
import { Link } from 'react-router-dom'

import { Good, GoodOrCamel } from '../api'
import cardsImg from '../assets/cards.png'
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
      <Typography variant="h6" mt={2}>
        Le Marché
      </Typography>
      <CardStack>
        {game.market.map((card, index) => (
          <Card key={index} type={card} />
        ))}
      </CardStack>
      <Typography variant="h6" mt={2}>
        Ma Main
      </Typography>
      <CardStack>
        {game.hand.map((card, index) => (
          <Card key={index} type={card} />
        ))}
      </CardStack>
      <Typography variant="h6" mt={2}>
        Mon Enclos
      </Typography>
      <CardStack>
        {range(game.camelsCount).map((index) => (
          <Card key={index} type={GoodOrCamel.Camel} />
        ))}
      </CardStack>
      <Typography variant="h6" mt={2}>
        Les Jetons Restants
      </Typography>
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
      <Box height={300} />
    </Container>
  )
}

const CardStack = (props: StackProps) => (
  <Paper sx={{ p: 2 }}>
    <Stack direction="row" spacing={1} flexWrap="wrap" {...props} />
  </Paper>
)

const CARD_IMG_HEIGHT = 516
const CARD_IMG_WIDTH = 372

const Card = styled('div')<{ type: GoodOrCamel | Good }>(({ type }) => {
  let index
  switch (type) {
    case GoodOrCamel.Diamonds:
      index = 2
      break
    case GoodOrCamel.Leather:
      index = 3
      break
    case GoodOrCamel.Gold:
      index = 4
      break
    case GoodOrCamel.Spice:
      index = 5
      break
    case GoodOrCamel.Silver:
      index = 6
      break
    case GoodOrCamel.Cloth:
      index = 7
      break
    case GoodOrCamel.Camel:
      index = 8
      break
    default:
      index = 1
  }
  return {
    borderRadius: 10,
    position: 'relative',
    width: CARD_IMG_WIDTH / 2,
    height: CARD_IMG_HEIGHT / 2,
    backgroundImage: `url("${cardsImg}")`,
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundPosition: `-${(CARD_IMG_WIDTH / 2) * index}px 0`,
    backgroundSize: `${3864 / 2}px ${CARD_IMG_HEIGHT / 2}px`,
  }
})
