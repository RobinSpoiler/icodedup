import { Card, CardContent, CardActionArea, Typography, Grid } from '@mui/material'
import React, { useState } from 'react';

export const RequestCard = ({ request, setSelected, selected }) => {
    const handleCardClick = () => {
        setSelected(request.id);
    };

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12}>
                <Card sx={{
                    bgcolor: selected ? 'appDark.adminButton' : 'secondary.main',
                    borderRadius: 2,
                    ':hover': { bgcolor: 'appDark.adminButton', opacity: 0.8 },
                }}
                    onClick={handleCardClick}
                >
                    <CardActionArea>
                        <CardContent sx={{ pt: 2, pb: 2 }}>
                            <Typography sx={{ color: 'appDark.text', fontSize: 15 }} >
                                Solicitud por: {request.requesters_name}
                            </Typography>
                            <Typography sx={{ color: 'appDark.text', fontSize: 15 }}>
                                Clase: {request.course}
                            </Typography>
                            <Typography sx={{ color: 'appDark.text', fontSize: 15 }}>
                                Módulo: {request.module}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    )
}