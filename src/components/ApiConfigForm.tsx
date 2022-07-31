import { Button, TextField } from '@mui/material'
import { FormEventHandler, useState } from 'react'

import { Configuration } from '../api'

import { useApiConfig } from '../contexts/ApiConfigContext'

interface Props {
  onChange?: (basePath: string) => void
}

export default function ApiConfigForm({ onChange }: Props) {
  const [config, setConfig] = useApiConfig()

  const [basePath, setBasePath] = useState(config.basePath)
  const handleSubmit: FormEventHandler = (e) => {
    setConfig(new Configuration({ basePath }))
    onChange?.(basePath)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="URL du backend"
        value={basePath}
        onChange={(e) => setBasePath(e.target.value as string)}
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained">
        Appliquer
      </Button>
    </form>
  )
}
