import { Container, Typography } from '@mui/material'
import { FallbackProps } from 'react-error-boundary'

export default function Error({ error }: FallbackProps) {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h3" gutterBottom>
        Oups... Une erreur est survenue !
      </Typography>
      <Typography color="error">{error.message}</Typography>
    </Container>
  )
}
