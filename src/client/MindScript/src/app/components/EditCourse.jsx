import { Grid, InputLabel, Modal, OutlinedInput, Button, Typography, MenuItem, useTheme, useMediaQuery } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';

export const EditCourse = ({ open, close, params }) => {

    const [modulesData, setModule] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/coursemodules/${params.id}`, options);
                const responseData = await response.json();
                setModule(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.id]);

    const moduleControls = Array.isArray(modulesData) && modulesData.length > 0 ?
        modulesData.map((module) => (
            <FormControl key={module.id} sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%', mt: 2 }}>
                <InputLabel
                    sx={{
                        color: 'appDark.text',
                        '&.Mui-focused': {
                            color: 'appDark.text'
                        }
                    }}
                >
                    Nombre del Módulo
                </InputLabel>
                <OutlinedInput
                    type="input"
                    label="Nombre del Módulo"
                    placeholder="Módulo 1"
                    value={module.name}
                    sx={{
                        color: 'appDark.text',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'appDark.box',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'appDark.box',
                        },
                        '&.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                        }
                    }}
                />
            </FormControl>
        )) : null;


    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const containerWidth = isLargeScreen ? 40 : isMediumScreen ? 70 : 90;

    return (
        <Modal
            id="Modal prrona Crear Tarea"
            open={open}
            onClose={close}
            aria-labelledby="editarCurso"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid container
                id="Grid container Editar Materia"
                justifyContent='space-between'
                sx={{
                    bgcolor: 'secondary.main',
                    borderRadius: 2,
                    boxShadow: 24,
                    width: `${containerWidth}vw`,
                }}>

                <Grid item xs={12} id="PrimeraSección">
                    <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                        Editar Curso
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{
                        py: 2,
                        overflowY: 'scroll',
                        height: '60vh',
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

                        <Grid item xs={10} >
                            <FormControl sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%' }}>
                                <InputLabel sx={{
                                    color: 'appDark.text',
                                    '&.Mui-focused': {
                                        color: 'appDark.text' //change label color
                                    }
                                }}>ID del Curso</InputLabel>
                                <OutlinedInput
                                    type="input"
                                    label="ID del Curso"
                                    placeholder="TC1028"
                                    value={params.id}
                                    sx={{
                                        color: 'appDark.text',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'appDark.box', //change border color on hover
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'appDark.box', //change border color when focused
                                        },
                                        '&.MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        }
                                    }}


                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={10} >
                            <FormControl sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%' }}>
                                <InputLabel sx={{
                                    color: 'appDark.text',
                                    '&.Mui-focused': {
                                        color: 'appDark.text' //change label color
                                    }
                                }}>Nombre del Curso</InputLabel>
                                <OutlinedInput
                                    type="input"
                                    label="Nombre del Curso"
                                    placeholder="Pensamiento Computacional"
                                    value={params.name}
                                    sx={{
                                        color: 'appDark.text',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'appDark.box', //change border color on hover
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'appDark.box', //change border color when focused
                                        },
                                        '&.MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        }
                                    }}

                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={10}>
                            {moduleControls}
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12}>
                    <Grid container justifyContent='space-around' align='center' sx={{ mb: 2 }}>
                        <Grid item xs={6} id="cancelar" >
                            <Button onClick={close} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.button', borderRadius: 2 }}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={6} id="crear tarea">
                            <Button onClick={close} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.adminButton', borderRadius: 2 }}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )
}