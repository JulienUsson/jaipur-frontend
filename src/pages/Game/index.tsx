import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  StackProps,
  styled,
  Typography,
} from '@mui/material'
import { upperFirst } from 'lodash'
import range from 'lodash/range'
import uniq from 'lodash/uniq'
import React from 'react'
import { Link } from 'react-router-dom'
import { mutate } from 'swr'

import { BonusTokens, Good, GoodOrCamel, Tokens } from '../../api'
import cardsImg from '../../assets/cards.png'
import tokensImg from '../../assets/icons.png'
import TitleImg from '../../assets/title.png'
import { useGameApi } from '../../contexts/ApiConfigContext'
import useGame from '../../hooks/useGame'
import { useGameIdFromPath, usePlayerIndexFromPath } from '../../hooks/usePath'
import createDialog, { showError } from '../../utils/createDialog'

import TakeCamelsDialog from './actions/TakeCamelsDialog'
import TakeGoodDialog from './actions/TakeGoodDialog'

export default function Game() {
  const gameId = useGameIdFromPath()
  const playerId = usePlayerIndexFromPath()
  const api = useGameApi()
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
        Ma Main ({game.hand.length})
      </Typography>
      <CardStack>
        {game.hand.map((card, index) => (
          <Card key={index} type={card} />
        ))}
      </CardStack>

      <Typography variant="h6" mt={2}>
        Mon Enclos ({game.camelsCount})
      </Typography>
      <CardStack>
        {range(game.camelsCount).map((index) => (
          <Card key={index} type={GoodOrCamel.Camel} />
        ))}
      </CardStack>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Les Jetons Restants</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <TokenStack>
              {range(game.bonusTokens._3).map((index) => (
                <Token key={index} type="_3" />
              ))}
            </TokenStack>
            <TokenStack>
              {range(game.bonusTokens._4).map((index) => (
                <Token key={index} type="_4" />
              ))}
            </TokenStack>
            <TokenStack>
              {range(game.bonusTokens._5).map((index) => (
                <Token key={index} type="_5" />
              ))}
            </TokenStack>
            <TokenStack>
              {game.tokens.diamonds.map((value, index) => (
                <Token key={index} type="diamonds" value={value} />
              ))}
            </TokenStack>
            <TokenStack>
              {game.tokens.gold.map((value, index) => (
                <Token key={index} type="gold" value={value} />
              ))}
            </TokenStack>
            <TokenStack>
              {game.tokens.silver.map((value, index) => (
                <Token key={index} type="silver" value={value} />
              ))}
            </TokenStack>
            <TokenStack>
              {game.tokens.cloth.map((value, index) => (
                <Token key={index} type="cloth" value={value} />
              ))}
            </TokenStack>
            <TokenStack>
              {game.tokens.spice.map((value, index) => (
                <Token key={index} type="spice" value={value} />
              ))}
            </TokenStack>
            <TokenStack>
              {game.tokens.leather.map((value, index) => (
                <Token key={index} type="leather" value={value} />
              ))}
            </TokenStack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h4" mt={4} gutterBottom>
        Actions
      </Typography>
      <Stack direction="column" spacing={1} alignItems="flex-start">
        <Button variant="contained" color="primary" size="large" onClick={handleTakeGood}>
          Prendre une marchandise
        </Button>
        <Button variant="contained" color="primary" size="large">
          Echanger des marchandises
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={handleTakeCamels}>
          Prendre les chameaux
        </Button>
        <Button variant="contained" color="primary" size="large">
          Vendre des cartes
        </Button>
      </Stack>

      <Box height={300} />
    </Container>
  )

  async function handleTakeGood() {
    const marketGoods = uniq(
      game.market.filter((goodOrCamel) => goodOrCamel !== GoodOrCamel.Camel) as unknown as Good[],
    )
    const good = await createDialog<Good | undefined>((onClose) => (
      <TakeGoodDialog market={marketGoods} onClose={onClose} />
    ))
    if (good) {
      try {
        await api.takeGood({
          gameId,
          playerId,
          takeGoodPayload: {
            good,
          },
        })
        await mutate(`games/${gameId}/players/${playerId}`)
      } catch (e) {
        showError('Impossible de prendre une marchandise.')
      }
    }
  }

  async function handleTakeCamels() {
    const isTakingCamels = await createDialog<boolean>((onClose) => (
      <TakeCamelsDialog onClose={onClose} />
    ))
    if (isTakingCamels) {
      try {
        await api.takeCamels({ gameId, playerId })
        await mutate(`games/${gameId}/players/${playerId}`)
      } catch (e) {
        showError('Impossible de prendre les chameaux.')
      }
    }
  }
}

const CardStack = ({ children, ...props }: StackProps) => {
  if (React.Children.count(children) === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography>Aucune carte</Typography>
      </Paper>
    )
  }
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        {...props}
        sx={{
          '& > *': {
            mb: 1,
          },
        }}
      >
        {children}
      </Stack>
    </Paper>
  )
}

const CARD_IMG_HEIGHT = 516
const CARD_IMG_WIDTH = 372

export const Card = styled('div')<{ type: GoodOrCamel | Good; selected?: boolean }>(
  ({ type, selected, onClick }) => {
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
      cursor: onClick ? 'pointer' : 'default',
      filter: selected ? 'grayscale(0.7)' : 'initial',
    }
  },
)

const TokenStack = ({ children, ...props }: StackProps) => {
  if (React.Children.count(children) === 0) {
    return null
  }
  return (
    <Stack
      direction="row"
      spacing={1}
      flexWrap="wrap"
      {...props}
      sx={{
        pl: `${TOKEN_IMG_WIDTH / 3}px`,
        '& > *': {
          marginLeft: `-${TOKEN_IMG_WIDTH / 3}px !important`,
        },
      }}
    >
      {React.Children.toArray(children).reverse()}
    </Stack>
  )
}

const TOKEN_IMG_HEIGHT = 90
const TOKEN_IMG_WIDTH = 90

type TokenType = keyof Tokens | keyof BonusTokens
const Token = styled('div')<{ type: TokenType; value?: number }>(({ type, value }) => {
  let index
  switch (type) {
    case 'leather':
      switch (value) {
        case 1:
          index = 1
          break
        case 2:
          index = 2
          break
        case 3:
          index = 3
          break
        case 4:
          index = 4
          break
        default:
          index = 1
          break
      }
      break
    case 'spice':
      switch (value) {
        case 1:
          index = 5
          break
        case 2:
          index = 6
          break
        case 3:
          index = 7
          break
        case 5:
          index = 8
          break
        default:
          index = 5
          break
      }
      break
    case 'cloth':
      switch (value) {
        case 1:
          index = 9
          break
        case 2:
          index = 10
          break
        case 3:
          index = 11
          break
        case 5:
          index = 12
          break
        default:
          index = 9
          break
      }
      break
    case 'silver':
      index = 13
      break
    case 'gold':
      switch (value) {
        case 5:
          index = 14
          break
        case 6:
          index = 15
          break
        default:
          index = 14
          break
      }
      break
    case 'diamonds':
      switch (value) {
        case 5:
          index = 16
          break
        case 7:
          index = 17
          break
        default:
          index = 16
          break
      }
      break
    case '_3':
      index = 19
      break
    case '_4':
      index = 20
      break
    case '_5':
      index = 21
      break
    default:
      index = 0
  }
  return {
    borderRadius: '50%',
    position: 'relative',
    width: TOKEN_IMG_WIDTH,
    height: TOKEN_IMG_HEIGHT,
    backgroundImage: `url("${tokensImg}")`,
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundPosition: `-${TOKEN_IMG_WIDTH * index}px 0`,
  }
})
