import { Button, CardContent, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material'
import { useState } from 'react'

import { Card } from '..'

import { Good } from '../../../api'

interface TakeGoodDialogProps {
  market: Good[]
  onClose: (returnValue?: Good) => void
}

export default function TakeGoodDialog({ market, onClose }: TakeGoodDialogProps) {
  const [selectedGood, setSelectedGood] = useState<Good>()
  return (
    <Dialog open onClose={() => onClose()} maxWidth="xl">
      <DialogTitle>Prendre une marchandise</DialogTitle>
      <CardContent>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {market.map((good) => (
            <Card
              key={good}
              type={good}
              selected={good === selectedGood}
              onClick={() => setSelectedGood(good)}
            />
          ))}
        </Stack>
      </CardContent>
      <DialogActions>
        <Button color="inherit" onClick={() => onClose()}>
          Annuler
        </Button>
        <Button color="inherit" disabled={!selectedGood} onClick={() => onClose(selectedGood)}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
