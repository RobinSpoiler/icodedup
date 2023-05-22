import { Add, Delete } from '@mui/icons-material';
import { Grid, InputLabel, Modal, OutlinedInput, Button, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';

export const CreateCourse = ({ open, close }) => {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const containerWidth = isLargeScreen ? 40 : isMediumScreen ? 65 : 90;

    const [modules, setModule] = useState([]);

    useEffect(() => {
        if (open) {
            addModuleControl();
        } else {
            setModule([]);
        }
    }, [open]);

    const addModuleControl = () => {
        const id = Date.now();
        const newModule = {
            key: id,
            jsx: (
                <Grid item xs={12} key={id}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={9}>
                            <FormControl
                                sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%', mt: 2 }}
                            >
                                <InputLabel
                                    sx={{
                                        color: 'appDark.text',
                                        '&.Mui-focused': {
                                            color: 'appDark.text',
                                        },
                                    }}
                                >
                                    Añadir Módulo
                                </InputLabel>
                                <OutlinedInput
                                    type="input"
                                    label="Nombre del Curso"
                                    placeholder="For loop"
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
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} sx={{ mt: 2 }}>
                            <Grid container align="center" justifyContent="space-around">
                                <Grid item xs={5} sx={{ bgcolor: 'appDark.button' }}>
                                    <IconButton sx={{ color: 'appDark.icon' }} onClick={addModuleControl}>
                                        <Add />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={5} sx={{ bgcolor: 'error.main' }}>
                                    <IconButton
                                        sx={{ color: 'appDark.icon' }}
                                        onClick={() => deleteModuleControl(id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ),
        };

        setModule((prevModules) => [...prevModules, newModule]);
    };

    const deleteModuleControl = (moduleId) => {
        setModule((prevModules) => {
            if (prevModules.length === 1 && prevModules[0].key === moduleId) {
                return prevModules; 
            }

            const updatedModules = prevModules.filter((module) => module.key !== moduleId);
            return updatedModules;
        });
    };


    return (
        <Modal
            id="Modal prrona Crear Tarea"
            open={open}
            onClose={close}
            aria-labelledby="crearCurso"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid container
                id="Grid container Crear Materia"
                justifyContent='space-between'
                sx={{
                    bgcolor: 'secondary.main',
                    borderRadius: 2,
                    boxShadow: 24,
                    width: `${containerWidth}vw`,
                }}>

                <Grid item xs={12} id="PrimeraSección">
                    <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                        Crear Materia
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{
                        py: 3,
                        overflowY: 'scroll',
                        height: '45vh',
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
                            <FormControl sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%', mt: 2 }}>
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
                            {modules.map((module) => module.jsx)}
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
                                Crear Materia
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )
}