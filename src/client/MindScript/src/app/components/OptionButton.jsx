import {  Button, Grid } from '@mui/material'

export const OptionButton = ({option}) => {
    return (
        <Grid item align='center' xs={12} sm={6} mt={4} >
            <Button 
            sx={{ 
                color: 'appDark.text',
                bgcolor: 'appDark.bgBox',
                fontWeight: 900,
                textTransform: 'none',
                minWidth: '30vh',
                minHeight: '7vh',
                ':hover': { backgroundColor: 'appDark.bgBox', opacity: 0.7 }
            }}>
                {option}
            </Button>
        </Grid>
    )
}