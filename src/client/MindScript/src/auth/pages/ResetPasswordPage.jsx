import React from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { Link as RouterLink} from "react-router-dom"
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title='Restablecer contraseña'>
      
      <Typography align="center" sx = {{color:'appDark.link'}}>Crear una nueva contraseña</Typography>
      
      <form>
        <Grid container>
          {/* Correo*/}
          <Grid item xs= { 12 } sx= { { mt: 2 } }>
            <FormControl fullWidth sx={{backgroundColor: 'appDark.bgBox', borderRadius: 1}}>
            <InputLabel sx={{
                color: 'appDark.text', 
                '&.Mui-focused': {
                  color: 'appDark.text' //change label color
                  } 
                }}>Correo</InputLabel>
              <OutlinedInput
                type= "email"
                label= "Correo"
                placeholder= "A00000000@tec.mx"
                sx={{
                  color: 'appDark.text',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'appDark.box', //change border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'appDark.box', //change border color when focused
                  },
                }}
              />
            </FormControl> 
          </Grid>

          {/* Ingresar nueva contraseña */}
          <Grid item xs= { 12 } sx= { { mt:2} }>
            <FormControl fullWidth sx={{backgroundColor: 'appDark.bgBox', borderRadius: 1}} >
              <InputLabel sx={{
                color: 'appDark.text', 
                '&.Mui-focused': {
                  color: 'appDark.text' //change label color
                  } 
                }}>Nueva contraseña</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{color: 'appDark.icon'}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar contraseña"
                placeholder="********"
                sx={{
                  color: 'appDark.text',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'appDark.box', //change border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'appDark.box', //change border color when focused
                  },
                }}
              />
            </FormControl>
          </Grid>

    

        </Grid>
          

        <Grid container direction= "column" spacing= { 1 } alignContent="center"  sx= { { mt: 1 } }>
            <Grid item>
              <Button variant="contained" sx={{backgroundColor: 'appDark.button'}}>
                Cambiar contraseña
              </Button>
            </Grid>
        </Grid>

      </form>
    </AuthLayout>
  )
}
