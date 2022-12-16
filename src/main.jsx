import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Provider as SupabaseProvider } from 'react-supabase'
import supabase from './utils/supabase'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider value={supabase}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        <App />
      </MantineProvider>
    </SupabaseProvider>
  </React.StrictMode>
)
