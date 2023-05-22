import { Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink} from "react-router-dom";

import React from "react";

export const AuthLayout = ({ children, title = "" }) => {

  return (
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"        
        sx={{ minHeight: '90vh', backgroundColor: 'primary.main'}}>
        
          <Grid item>
            <img src="/MindScript.svg" width= "480" />
          </Grid>

          <Grid
            item
            className="box-shadow"
            xs={12}
            sx={{ width: '50vw' ,backgroundColor: 'secondary.main', padding: 3, borderRadius: 2 }}>
            {children}

          </Grid>

          <Grid 
            container 
            position="absolute"
            bottom= "0"
            justifyContent="center"
            columnSpacing={10}
            sx={{minHeight: '10vh', backgroundColor: 'secondary.main', padding: 4}}>

              <Grid item sx={{mb:1}}>
                <Link component={RouterLink} sx={{color: 'appDark.link'}}>IsrealesSolutions</Link>
              </Grid>
              <Grid item sx={{mb:1}}>
                <Link component={RouterLink} sx={{color: 'appDark.link'}}>Acerca de</Link>
              </Grid>
              <Grid item sx={{mb:1}}>
                <Link component={RouterLink} sx={{color: 'appDark.link'}}>Ayuda</Link>
              </Grid>

              <Grid item position="absolute" bottom="0">
                <Typography sx={{ color: 'appDark.text'}}>© 2023 Isreales Solutions. All rights reserved.</Typography>
              </Grid>
            </Grid>
        
      </Grid> 
  )
}