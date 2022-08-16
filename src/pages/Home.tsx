import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Alert,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'

import { Configuration } from '../api'

import { useApiConfig, useGameApi } from '../contexts/ApiConfigContext'
import useGames from '../hooks/useGames'
import createDialog from '../utils/createDialog'

export default function Home() {
  const api = useGameApi()
  const [config, setConfig] = useApiConfig()
  const { data: games } = useGames()
  const navigate = useNavigate()

  const handleClick = (gameId: number) => async () => {
    const playerIndex = await createDialog<number | undefined>((onClose) => (
      <SelectPlayerDialog onClose={onClose} />
    ))
    if (playerIndex !== undefined) {
      navigate(`/games/${gameId}/player/${playerIndex}`)
    }
  }

  const handleDelete = (gameId: number) => async () => {
    try {
      await api.deleteGameById({ gameId })
      mutate('games')
    } catch (e) {
      await createDialog(() => <Alert severity="error">Impossible de supprimer la partie.</Alert>)
      console.error(e)
    }
  }

  const handleAddClick = async () => {
    const name = await createDialog<string | undefined>((onClose) => (
      <CreateGameDialog onClose={onClose} />
    ))
    if (!name) return

    try {
      await api.createGame({ createGame: { name } })
      mutate('games')
    } catch (e) {
      createDialog(() => <Alert severity="error">Impossible de créer la partie.</Alert>)
      console.error(e)
    }
  }

  const handleSettingsClick = async () => {
    const basePath = await createDialog<string | undefined>((onClose) => (
      <SettingsDialog defaultBasePath={config.basePath} onClose={onClose} />
    ))
    if (!basePath) return

    setConfig(new Configuration({ basePath }))
    mutate('games')
  }

  return (
    <Container maxWidth="md">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" gutterBottom>
          Jaipur
        </Typography>
        <IconButton onClick={handleSettingsClick} size="large">
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Card>
        <List subheader={<ListSubheader>Liste des parties</ListSubheader>}>
          {games && games.length > 0 ? (
            games.map((game) => (
              <ListItem
                key={game.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={handleDelete(game.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton onClick={handleClick(game.id)}>
                  <ListItemText primary={game.name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="Pas de parties trouvés..."
                primaryTypographyProps={{ color: 'textSecondary' }}
              />
            </ListItem>
          )}
        </List>
      </Card>
      <Fab
        onClick={handleAddClick}
        sx={{ position: 'absolute', right: 8, bottom: 8 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Container>
  )
}

interface SettingsDialogProps {
  defaultBasePath: string
  onClose: (url: string | undefined) => void
}

function SettingsDialog({ defaultBasePath, onClose }: SettingsDialogProps) {
  const [basePath, setBasePath] = useState(defaultBasePath)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onClose(basePath)
  }

  return (
    <Dialog open onClose={() => onClose(undefined)} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Créer une partie</DialogTitle>
        <DialogContent>
          <TextField
            id="basePath"
            value={basePath}
            onChange={(e) => setBasePath(e.target.value)}
            margin="dense"
            label="Base Path"
            fullWidth
            required
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(undefined)}>Annuler</Button>
          <Button type="submit">Sauvegarder</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

interface CreateGameDialogProps {
  onClose: (name: string | undefined) => void
}

function CreateGameDialog({ onClose }: CreateGameDialogProps) {
  const [name, setName] = useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onClose(name)
  }

  return (
    <Dialog open onClose={() => onClose(undefined)} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Créer une partie</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            label="Name"
            fullWidth
            required
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(undefined)}>Annuler</Button>
          <Button type="submit">Créer</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

interface SelectPlayerDialogProps {
  onClose: (playerIndex: number | undefined) => void
}

function SelectPlayerDialog({ onClose }: SelectPlayerDialogProps) {
  return (
    <Dialog open onClose={() => onClose(undefined)}>
      <DialogTitle>Quel joueur êtes-vous?</DialogTitle>
      <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
        <Button variant="contained" onClick={() => onClose(0)}>
          Joueur 1
        </Button>
        <Button variant="contained" onClick={() => onClose(1)}>
          Joueur 2
        </Button>
      </Stack>
    </Dialog>
  )
}
