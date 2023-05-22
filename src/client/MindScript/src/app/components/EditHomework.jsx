import { Grid, InputLabel, useTheme, useMediaQuery, Modal, OutlinedInput, Button, FormHelperText, FormControl, Typography, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useState, useEffect, React } from 'react';
import { useForm } from '../../hooks/useForm';
import { getAuth } from "firebase/auth";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GroupHomework } from './GroupHomework';
import { AddModuleHomework } from './AddModuleHomework';


export const EditHomework = ({ open, close, editData, modules }) => {

    const theme = useTheme();
    const isXLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const containerWidth = isXLargeScreen ? '30vw' : isLargeScreen ? '50vw' : isMediumScreen ? '60vw' : '95vw';

    console.log("Edit data fuck", editData);
    //State date pickers
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const onSubmit = (event) => {
        event.preventDefault();
    }
    // console.log(data)
    //Nombre de la tarea
    const { hwname, onInputChange } = useForm({
        hwname: '',
    });

    console.log("Data rara", modules)


    const updateHomework = {
        hw_name: hwname,
        startDate: startDate,
        endDate: endDate,
    }

    console.log("updateRequest", updateHomework)

    const updateHomeworkRequest = async () => {
        let requestModules = [];
        console.log(modules)

        modules.map((module) => (
            module.checked
                ? requestModules.push({
                    module: module.id,
                    // module_name: module.name,
                    n_questions: module.n_questions,
                })
                : null
        ))
        console.log("Request modules", requestModules)

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                "name": updateHomework.hw_name,
                "modules_questions": requestModules,
                "open_date": updateHomework.startDate,
                "close_date": updateHomework.endDate
            })
        }

        fetch(`http://34.16.137.250:8002/homework/${editData.hw_id}`, options)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                // console.log(error)
            })

    };


    return (
        <>
            {editData == null && editData == undefined
                ? <Modal
                    id="Modal prrona Editar tarea"
                    open={open}
                    onClose={close}
                    aria-labelledby="Editar tarea"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Grid container

                        id="Grid container Unirse curso"
                        justifyContent='center'
                        sx={{
                            bgcolor: 'secondary.main',
                            borderRadius: 2,
                            boxShadow: 10,
                            width: containerWidth,
                        }}>

                        <Grid item xs={12}>
                            <Typography id="modal-hw-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                                {editData.hw_name}

                            </Typography>
                        </Grid>
                        
                        <Grid item xs={10} >
                            <Grid container>
                                <FormControl sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%' }}>
                                    <InputLabel sx={{
                                        color: 'appDark.text',
                                        '&.Mui-focused': {
                                            color: 'appDark.text' //change label color
                                        }
                                    }}>Nuevo nombre de la tarea</InputLabel>
                                    <OutlinedInput
                                        type="input"
                                        label="Nombre de la Tarea"
                                        placeholder={editData.hw_name}
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
                                        name='hwname'
                                        value={hwname}
                                        onChange={onInputChange}

                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Module checklist */}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Grid container justifyContent="center" sx={{
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
                                    {/* Tabla de ejercicios de modulos */}
                                    <TableContainer sx={{
                                        height: "30vh", //to do no me pegues
                                        my: 2,
                                        borderRadius: 2,
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
                                    }}
                                    >
                                        <Table sx={{ width: 1 }} aria-label="simple table">
                                            <TableHead sx={{ overflowX: "initial" }}>
                                                <TableRow>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            color: "appDark.text",
                                                            position: "sticky",
                                                            top: 0,
                                                            bgcolor: "primary.main",
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        Módulos
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        sx={{
                                                            color: "appDark.text",
                                                            position: "sticky",
                                                            top: 0,
                                                            bgcolor: "primary.main",
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        Ejercicios
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>

                                                {modules != null && modules != undefined

                                                    ? modules.map((module) => (
                                                        <AddModuleHomework key={module.id} module={module} />
                                                    ))

                                                    : null
                                                }
                                            </TableBody>

                                        </Table>
                                    </TableContainer>

                                </Grid>

                                {/* Fecha Desbloqueo */}
                                <Grid item xs={10}>
                                    {/* Date picker */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha de Desbloqueo"
                                            sx={{
                                                mt: 3,
                                                width: '100%',
                                                bgcolor: "appDark.bgBox",
                                                borderRadius: 2,


                                                '& .MuiInputLabel-root': {
                                                    color: 'appDark.text',
                                                    '&.Mui-focused ': {
                                                        color: 'appDark.text'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'transparent',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'appDark.box',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'appDark.box',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    color: 'appDark.text',
                                                },


                                                svg: { color: 'appDark.text' },
                                            }}

                                            value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                                    </LocalizationProvider>

                                </Grid>

                                {/* Fecha de Bloqueo */}
                                <Grid item xs={10}>
                                    {/* Date picker */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha de Bloqueo"
                                            sx={{
                                                mt: 3,
                                                width: '100%',
                                                bgcolor: "appDark.bgBox",
                                                borderRadius: 2,


                                                '& .MuiInputLabel-root': {
                                                    color: 'appDark.text',
                                                    '&.Mui-focused ': {
                                                        color: 'appDark.text'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'transparent',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'appDark.box',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'appDark.box',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    color: 'appDark.text',
                                                },


                                                svg: { color: 'appDark.text' },
                                            }}

                                            value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                                    </LocalizationProvider>

                                </Grid>

                                {/* Botones */}
                                <Grid container justifyContent='center' sx={{ my: 3, mx: 5.5 }}>
                                    <Grid item xs={6} id="cancelar" >

                                        <Button onClick={close} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.button', borderRadius: 2 }}>
                                            Cancelar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} id="crear tarea" align="right">

                                        <Button onClick={updateHomeworkRequest} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.adminButton', borderRadius: 2 }}>
                                            Actualizar tarea
                                        </Button>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Modal >

                : null

            }
        </>




    )
}