import * as React from 'react';
import { Collapse, Grid, List, ListItemButton, ListItemText, Typography, IconButton  } from '@mui/material'
import { ExpandLess, ExpandMore, DeleteOutline, Edit } from '@mui/icons-material' 

export const HomeworkBoard = ({children}) => {

    return (
        <Grid container
            direction='column'
            alignContent='center'
            alignItems='center'
            sx={{ backgroundColor: 'secondary.main', borderRadius: '12px', color: 'appDark.text', width: 400, mb: 1, minHeight: 430}}
        >
            { children }
            
        </Grid>
    )
}