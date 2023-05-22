import { Card, CardContent, CardActionArea, Typography, Grid, IconButton, LinearProgress } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { LockOutlined } from '@mui/icons-material'
import * as React from 'react';

export const SModuleCard = ({ module, index }) => {
    const colors = ["#C12C45", "#5EC1F3", "#55D16E", "#FACD34"]
    const color = index - (colors.length * parseInt(index / colors.length));

    return (
        <>
            <Card sx={{
                width: 260,
                height: 190,
                backgroundColor: 'secondary.main',
                borderRadius: '12px',
                boxShadow: '5px 5px 0px 5px rgba(0, 0, 0, 0.1)',
                ':hover': !module.locked&& { backgroundColor: 'secondary.main', opacity: 0.8 } }}
            >
                <CardActionArea
                    onClick={() => console.log("CardActionArea clicked")}
                    disabled={module.locked ? true : false }
                >
                    <Grid container 
                        justifyContent="flex-end" 
                        alignContent="flex-end"
                        sx={[
                            { 
                                backgroundColor: `${colors[color]}`, height: 35
                            },
                            module.locked && {
                                backgroundColor: "#6D7483", height: 35 
                            }
                        ]}
                    >
                        <Grid item sx={{ mr: 1 }}>
                            {/* <Typography fontSize={ 12 } sx={{ color: 'appDark.text' }} >Bloqueado el: { module.closeDate }</Typography> */}
                        </Grid>
                    </Grid>


                    <CardContent sx={{ textAlign: "center" }}>

                        
                        {/* Si el usuario es estudiante, se muestra lo sigiente */}
                        <Grid container justifyContent='flex-end'>
                            <LockOutlined sx={[
                                { color: 'secondary.main' },
                                module.locked && {color: 'appDark.icon'}
                                ]} />
                        </Grid>

                        <Typography sx={{ color: 'appDark.text', fontSize: 26, fontWeight: 405, mt: 2 }} >
                            {module.name}      
                        </Typography>

                        {/* Aqui va la barra con el progreso en caso de se un usuario alumno */}
                        <Grid container
                            sx={{mt: 3}}
                        >
                            <Grid item xs={10}>
                                <LinearProgress
                                    variant="determinate" 
                                    value={module.progress}
                                    sx={{
                                        mt: 1,
                                        height: 10,
                                        borderRadius: 5,
                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                            backgroundColor: 'appDark.progressBg',
                                        },
                                        [`& .${linearProgressClasses.bar}`]: {
                                            borderRadius: 5,
                                            backgroundColor: 'appDark.progressBar',
                                        }
                                    }}
                                />  
                            </Grid>

                            <Grid item xs={2}>
                                <Typography sx={{color: 'appDark.text'}}>
                                    {module.progress}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}