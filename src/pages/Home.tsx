import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'

import { Game } from '../api'

import useGames from '../hooks/useGames'

export default function Home() {
  const history = useHistory()
  const games = useGames()

  function handleGameClick(game: Game) {
    return () => {
      const playerIndex = 1
      history.push(`/games/${game.id}/player/${playerIndex}`)
    }
  }

  return (
    <>
      <Typography variant="h2">Jaipur</Typography>
      <List>
        {games.map((game) => (
          <ListItem key={game.id}>
            <ListItemButton onClick={handleGameClick(game)}>
              <ListItemText primary={game.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}
