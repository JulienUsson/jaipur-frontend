import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { upperFirst } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'

import { Configuration } from '../api'
import TitleImg from '../assets/title.png'

import { useApiConfig, useGameApi } from '../contexts/ApiConfigContext'
import useGames from '../hooks/useGames'
import createDialog, { showError } from '../utils/createDialog'

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
      navigate(`/games/${gameId}/players/${playerIndex}`)
    }
  }

  const handleDelete = (gameId: number) => async () => {
    try {
      await api.deleteGameById({ gameId })
      mutate('games')
    } catch (e) {
      showError('Impossible de supprimer la partie.')
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
      showError('Impossible de créer la partie.')
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
      <Stack alignItems="center">
        <Box component="img" mt={2} height="20vw" maxHeight={150} src={TitleImg} />
        <Stack direction="row" my={2} spacing={2}>
          <Button
            onClick={handleAddClick}
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            size="large"
          >
            Créer une partie
          </Button>
          <Button
            onClick={handleSettingsClick}
            variant="contained"
            startIcon={<SettingsIcon />}
            color="primary"
            size="large"
          >
            Paramètres
          </Button>
        </Stack>
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
                  <ListItemText primary={upperFirst(game.name)} />
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
        <DialogTitle>Paramètres</DialogTitle>
        <DialogContent>
          <TextField
            id="basePath"
            value={basePath}
            onChange={(e) => setBasePath(e.target.value)}
            margin="dense"
            label="URL du Backend"
            fullWidth
            required
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => onClose(undefined)}>
            Annuler
          </Button>
          <Button type="submit" color="inherit">
            Sauvegarder
          </Button>
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
          <Button color="inherit" onClick={() => onClose(undefined)}>
            Annuler
          </Button>
          <Button color="inherit" type="submit">
            Créer
          </Button>
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
