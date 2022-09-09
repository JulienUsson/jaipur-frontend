import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface TakeCamelsDialogProps {
  onClose: (returnValue: boolean) => void
}

export default function TakeCamelsDialog({ onClose }: TakeCamelsDialogProps) {
  return (
    <Dialog open onClose={() => onClose(false)} maxWidth="xs" fullWidth>
      <DialogTitle>Prendre les chameaux</DialogTitle>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Annuler</Button>
        <Button onClick={() => onClose(true)}>Valider</Button>
      </DialogActions>
    </Dialog>
  )
}
