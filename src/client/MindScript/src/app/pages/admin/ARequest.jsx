import { Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { NavBar, RequestCard } from '../../components'
import { getAuth } from "firebase/auth";

export const ARequest = () => {
    //Current user info
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
        // console.log("AdminRequest user info", user)
        //Desestructuración de user
        const { email, displayName, emailVerified, uid } = user
        //Nómina L00000000
        const schoolID = (user.email).substring(0, 8);
        // console.log("Nómina ", schoolID)
    }
    const pages = [
        {name: 'Gestion de Usuarios', route: '/admin/management'}, 
        {name: 'Solicitudes', route: '/admin/request'}, 
        {name: 'Plan de Estudios', route: '/admin/syllabus'}
    ]


    // Api region
    const [requestsData, setRequest] = useState([]);
    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        // let userID = "A01551955"
        // let term = "current"

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/questionrequests?question_type=all&requested_by=all&course=all&status=all`, options);
                const responseData = await response.json();
                setRequest(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);
    // console.log(requestsData)

    const [selected, setSelected] = useState(null);
    const handleCardSelection = (id) => {
        if (id === selected) {
            setSelected(null);
        } else {
            setSelected(id);
        }
    };
    const selectedRequest = selected !== null ? requestsData.find((r) => r.id === selected) : null;
    // console.log(selectedRequest)
    var js, hinputs, sinputs;
    const formattedHInputs = {};
    const formattedSInputs = {};

    if (selectedRequest != null) {
        js = JSON.parse(selectedRequest.info)
        hinputs = js.hinputs
        sinputs = js.sinputs
        for (const [key, value] of Object.entries(hinputs)) {
            if (Array.isArray(value)) {
                const formattedValue = value.map(arr => arr[0]).join(',');
                formattedHInputs[key] = formattedValue;
            } else {
                formattedHInputs[key] = value;
            }
        }
        for (const [key, value] of Object.entries(sinputs)) {
            if (Array.isArray(value)) {
                const formattedValue = value.map(arr => arr[0]).join(',');
                formattedSInputs[key] = formattedValue;
            } else {
                formattedSInputs[key] = value;
            }
        }
    }
    // console.log(js)
    return (
        <Grid container padding={3} spacing={0} columnSpacing={1} sx={{ height: '100vh', bgcolor: 'primary.main' }}>
            <NavBar pages={pages} />
            <Grid item xs={4} sx={{
                mt: 5,
                height: '90vh',
                overflowY: 'scroll',
                "&::-webkit-scrollbar": {
                    width: 5,
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                    borderRadius: 2,
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "appDark.scrollBar",
                    borderRadius: 2,
                },
            }}>
                <Grid container rowSpacing={1}>
                    {requestsData.map((r) => (
                        <Grid key={r.id} item xs={12}>
                            <RequestCard request={r} setSelected={handleCardSelection} selected={selected === r.id} />
                        </Grid>
                    ))}
                </Grid>

            </Grid>

            <Grid item xs={8} sx={{ mt: 5 }}>
                {selectedRequest != null && (
                    <Grid container sx={{
                        bgcolor: 'secondary.main',
                    }}>
                        <Grid item xs={12} paddingX={5} sx={{ mt: '5vh' }}>
                            <Typography sx={{ color: 'appDark.text', fontSize: 25 }} >
                                Detalles del Problema
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{
                            height: '65vh',
                            overflowY: 'scroll',
                            "&::-webkit-scrollbar": {
                                width: 5,
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "secondary.main",
                                borderRadius: 2,
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "appDark.scrollBar",
                                borderRadius: 2,
                            },
                        }}>
                            <Grid container spacing={0} paddingX={8}>
                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Descripción</li>
                                    </Typography>
                                    <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                        {js.description}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Lenguaje</li>
                                    </Typography>
                                    <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                        {js.language}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Funciones Prohibidas</li>
                                    </Typography>
                                    {js.forbiddenFunctions.length > 0 ?
                                        <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                            {js.forbiddenFunctions}
                                        </Typography>
                                        :
                                        <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                            No hay funciones prohibidas
                                        </Typography>
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Código Inicial</li>
                                    </Typography>
                                    {js.initialCode.length > 0 ?
                                        <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                            {js.initialCode}
                                        </Typography>
                                        :
                                        <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                            No hay código inicial
                                        </Typography>
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Inputs Privados</li>
                                    </Typography>
                                    {Object.entries(formattedHInputs).map(([key, value]) => (
                                        <div key={key}>
                                            <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                                {'{'}{value}{'}'}
                                            </Typography>
                                        </div>
                                    ))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Outputs Privados</li>
                                    </Typography>
                                    {Object.entries(js.houtputs).map(([key, value]) => (
                                        <div key={key}>
                                            <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                                {'{'}{value}{'}'}
                                            </Typography>
                                        </div>
                                    ))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Inputs Públicos</li>
                                    </Typography>
                                    {Object.entries(formattedSInputs).map(([key, value]) => (
                                        <div key={key}>
                                            <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                                {'{'}{value}{'}'}
                                            </Typography>
                                        </div>
                                    ))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Outputs Públicos</li>
                                    </Typography>
                                    {Object.entries(js.soutputs).map(([key, value]) => (
                                        <div key={key}>
                                            <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                                {'{'}{value}{'}'}
                                            </Typography>
                                        </div>
                                    ))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'appDark.text', fontSize: 18, mt: '2vh' }}>
                                        <li>Tiempos Máximo de Ejecución</li>
                                    </Typography>
                                    <Typography paddingX={3} sx={{ color: 'appDark.text', fontSize: 15 }}>
                                        {js.timeoutSec} seg
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item xs={12}>
                            <Grid container justifyContent='flex-end' columnSpacing={5} padding='5vh'>
                                <Grid item>
                                    <Button type="submit"
                                        sx={{
                                            color: 'appDark.text',
                                            bgcolor: 'transparent',
                                            border: 0.5,
                                            borderColor: 'appDark.box',
                                            '&:hover': { bgcolor: 'appDark.adminButton', borderColor: 'transparent' },
                                            borderRadius: 5,
                                        }}>
                                        Aceptar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit"
                                        sx={{
                                            color: 'appDark.text',
                                            bgcolor: 'transparent',
                                            border: 0.5,
                                            borderColor: 'appDark.box',
                                            '&:hover': { bgcolor: 'appDark.adminButton', borderColor: 'transparent' },
                                            borderRadius: 5,
                                        }}>
                                        Rechazar
                                    </Button>
                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>

                )}
            </Grid>
        </Grid >

    )
}
