import { Typography } from '@mui/material'

export default function Error({ error }: { error: Error }) {
  return <Typography color="error">{error.message}</Typography>
}
