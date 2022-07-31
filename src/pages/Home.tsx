import {
  Card,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import useGames from '../hooks/useGames'

export default function Home() {
  const { data: games } = useGames()

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Jaipur
      </Typography>
      <Card>
        <List subheader={<ListSubheader>Liste des parties</ListSubheader>}>
          {games && games.length > 0 ? (
            games.map((game) => (
              <ListItem
                key={game.id}
                secondaryAction={
                  <>
                    <Link to={`/games/${game.id}/player/1`}>
                      <IconButton edge="end">1</IconButton>
                    </Link>
                    <Link to={`/games/${game.id}/player/2`}>
                      <IconButton edge="end">2</IconButton>
                    </Link>
                  </>
                }
              >
                <ListItemButton>
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
    </Container>
  )
}
