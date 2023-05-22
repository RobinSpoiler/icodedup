import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { Theme } from "./"

export const AppTheme = ({ children }) => {
    
  return (
    <ThemeProvider theme={ Theme }>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
