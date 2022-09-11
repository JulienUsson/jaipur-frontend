import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'

import { Card } from '..'

import { Good, SellPayload } from '../../../api'

interface SellDialogProps {
  hand: Good[]
  onClose: (returnValue?: SellPayload) => void
}

export default function SellDialog({ hand, onClose }: SellDialogProps) {
  const [selectedGood, setSelectedGood] = useState<Good>()
  const [selectedGoodCount, setSelectedGoodCount] = useState(1)
  return (
    <Dialog open onClose={() => onClose()} maxWidth="xl">
      <DialogTitle>Vendre</DialogTitle>
      <CardContent>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {hand.map((good) => (
            <Card
              key={good}
              type={good}
              selected={good === selectedGood}
              onClick={() => setSelectedGood(good)}
            />
          ))}
        </Stack>
        <TextField
          sx={{ mt: 2 }}
          type="number"
          label="Nombre"
          value={selectedGoodCount}
          onChange={(e) => setSelectedGoodCount(parseInt(e.target.value))}
          fullWidth
        />
      </CardContent>
      <DialogActions>
        <Button color="inherit" onClick={() => onClose()}>
          Annuler
        </Button>
        <Button
          color="inherit"
          disabled={!selectedGood || !selectedGoodCount}
          onClick={() => onClose({ count: selectedGoodCount, good: selectedGood! })}
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
