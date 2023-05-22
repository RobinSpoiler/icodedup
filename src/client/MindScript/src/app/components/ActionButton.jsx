import { Card, CardContent, CardActionArea, Grid } from '@mui/material'

export const ActionButton = ({ children }) => {
    return (
        <Grid>
            <Card sx={{
                width: 300,
                height: 207,
                backgroundColor: 'secondary.main',
                borderRadius: '12px',
                boxShadow: '5px 5px 0px 5px rgba(0, 0, 0, 0.1)',
                ':hover': { backgroundColor: 'secondary.main', opacity: 0.8 }
            }}>
                {children}
            </Card>
        </Grid>
    )
}