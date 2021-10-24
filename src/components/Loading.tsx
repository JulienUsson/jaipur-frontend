import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}
