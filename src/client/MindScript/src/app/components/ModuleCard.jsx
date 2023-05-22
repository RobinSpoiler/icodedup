import { Card, CardContent, CardActionArea, Typography, Grid, IconButton, LinearProgress } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { Edit, LockOutlined } from '@mui/icons-material'
import PropTypes from 'prop-types';

//Variables de pueba. Borrar al final
const user = 'student';
const block = false;


export const ModuleCard = () => {

    return (
        <Card sx={{
            width: 300,
            height: 207,
            backgroundColor: 'secondary.main',
            borderRadius: '12px',
            boxShadow: '5px 5px 0px 5px rgba(0, 0, 0, 0.1)',
            ':hover': { backgroundColor: 'secondary.main', opacity: 0.8 } }}
        >
            <CardActionArea disable='true'
                onClick={() => console.log("CardActionArea clicked")}
            >
                <Grid sx={[
                    { 
                        backgroundColor: "#C12C45", height: 40
                    },
                    block && {
                        backgroundColor: "#6D7483", height: 40 
                    }
                    ]} />

                <CardContent sx={{ height: 207, textAlign: "center" }}>

                       
                    {user == 'student' ?
                        // Si el usuario es estudiante, se muestra lo sigiente
                            <Grid container justifyContent='flex-end'>
                                <LockOutlined sx={[
                                    { color: 'secondary.main' },
                                    block && {color: 'appDark.icon'}
                                    ]} />
                            </Grid>
                    : 
                        // Si el usuario es un profesor se muesta los siguiente
                        <Grid container >
                            {/* Este es el boton para edita */}
                            <IconButton
                                sx={{padding: 0}}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                console.log("Button clicked");
                                }}
                            >
                                <Edit sx={{ color: 'appDark.icon'}} />
                            </IconButton>
                            {/* Este boton es para bloquear el modulo */}
                            <IconButton
                                sx={{ ml: 27, padding: 0 }}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                console.log("Button clicked");
                                }}
                            >
                                <LockOutlined sx={{ color: 'appDark.icon'}} />
                            </IconButton>         
                        </Grid>
                            
                    }

                    <Typography sx={{ color: 'appDark.text', fontSize: 26, fontWeight: 405, mt: 2 }} >
                        Nombre de Modulo      
                    </Typography>

                    {/* Aqui va la barra con el progreso en caso de se un usuario alumno */}
                    {user == 'student' && !block ?
                        <LinearProgress
                            color='success'
                            variant='determinate'
                            value={55}
                            sx={{
                                bgcolor: '#6D7483',
                                height: 10,
                                // color: '#21AE2F'
                                mt: 6,
                                borderRadius: 5
                            }}
                            
                        >
                            <Typography variant="caption" sx={{ color: 'appDark.text', fontSize: 16, fontWeight: 405 }} >
                                50%     
                            </Typography>
                        </LinearProgress>
                    :null}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}