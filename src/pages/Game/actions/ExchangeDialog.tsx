import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { Card } from '..'

import { ExchangePayload, Good, GoodOrCamel } from '../../../api'

interface ExchangeDialogProps {
  market: Good[]
  hand: GoodOrCamel[]
  onClose: (returnValue?: ExchangePayload) => void
}

export default function ExchangeDialog({ market, hand, onClose }: ExchangeDialogProps) {
  const [takeIndexes, setTakeIndexes] = useState<number[]>([])
  const [giveIndexes, setGiveIndexes] = useState<number[]>([])

  const toggleTakeIndex = (index: number) => {
    return () =>
      setTakeIndexes((old) =>
        old.includes(index) ? old.filter((n) => n !== index) : [...old, index],
      )
  }

  const toggleGiveIndex = (index: number) => {
    return () =>
      setGiveIndexes((old) =>
        old.includes(index) ? old.filter((n) => n !== index) : [...old, index],
      )
  }

  return (
    <Dialog open onClose={() => onClose()} maxWidth="xl">
      <DialogTitle>Vendre</DialogTitle>
      <CardContent>
        <Typography variant="subtitle1">Prendre</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {market.map((good, index) => (
            <Card
              key={good}
              type={good}
              selected={takeIndexes.includes(index)}
              onClick={toggleTakeIndex(index)}
            />
          ))}
        </Stack>
        <Typography variant="subtitle1">Donner</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {hand.map((goodOrCamel, index) => (
            <Card
              key={goodOrCamel}
              type={goodOrCamel}
              selected={giveIndexes.includes(index)}
              onClick={toggleGiveIndex(index)}
            />
          ))}
        </Stack>
      </CardContent>
      <DialogActions>
        <Button color="inherit" onClick={() => onClose()}>
          Annuler
        </Button>
        <Button
          color="inherit"
          disabled={takeIndexes.length === 0 && giveIndexes.length === 0}
          onClick={() =>
            onClose({
              take: takeIndexes.map((index) => market[index]),
              give: giveIndexes.map((index) => hand[index]),
            })
          }
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
