import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface TakeCamelsDialogProps {
  onClose: (returnValue: boolean) => void
}

export default function TakeCamelsDialog({ onClose }: TakeCamelsDialogProps) {
  return (
    <Dialog open onClose={() => onClose(false)}>
      <DialogTitle>Prendre les chameaux</DialogTitle>

      <DialogActions>
        <Button color="inherit" onClick={() => onClose(false)}>
          Annuler
        </Button>
        <Button color="inherit" onClick={() => onClose(true)}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
