import { Grid, InputLabel, Modal, FormControlLabel, OutlinedInput, Button, Typography, MenuItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useState } from 'react';
import { GroupHomework } from './GroupHomework';
import { AddModuleHomework } from './AddModuleHomework';
import { CounterCell } from './CounterCell';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';


export const CreateHomework = ({ open, close, schoolID }) => {
    //Prueba
    const checked = true;

    //Nombre de la tarea
    const { hwname, onInputChange } = useForm({
        hwname: '',
    });

    //Selector de curso 
    const [course, setCourse] = useState('');
    const handleSelection = (event) => {
        setCourse(event.target.value);
        // console.log(course)
    };

    //State date pickers
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);



    /*API region */

    //GET course information
    const [coursesData, setCourseRequest] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        // let userID = "A01551955"
        // let term = "current"

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/courses`, options);
                const responseData = await response.json();
                setCourseRequest(responseData);
            } catch (error) {
                // console.error(error);
            }
        };
        fetchData();
    }, []);

    // console.log(coursesData)

    //GET group information
    const [groupsData, setGroup] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        let userID = "L00000001"
        let term = "current"

        const fetchData = async () => {
            if (course) {
                try {
                    const response = await fetch(`http://34.16.137.250:8002/groups?id=${userID}&term=${term}`, options);
                    const responseData = await response.json();
                    setGroup(responseData);
                } catch (error) {
                    // console.error(error);
                }
            }
        };
        fetchData();
    }, [course]);

    let groups = [];
    groupsData.map((group) => (
        groups.push({
            id_group: group.id_group,
            id_course: group.id_course,
            // course_name: group.course_name,
            checked: true
        })
    ))

    // console.log("groupsData",groupsData)
    // console.log("cursos", course)

    //GET modules information
    const [modulesData, setModule] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        // let userID = "A01551955"
        // let term = "current"

        const fetchData = async () => {
            if (course) {
                try {
                    const response = await fetch(`http://34.16.137.250:8002/coursemodules/${course}`, options);
                    const responseData = await response.json();
                    setModule(responseData);
                } catch (error) {
                    // console.error(error); .push({id:, n_questions: })
                }
            }
        };
        fetchData();
    }, [course]);

    let modules = [];
    modulesData.map((module) => (
        modules.push({
            id: module.id,
            name: module.name,
            n_questions: 0,
            checked: true
        })
    ))

    // //POST Create Homework

    const createHomework = {
        hw_name: hwname,
        startDate: startDate,
        endDate: endDate,
    }

    // console.log("POST Register Homework", createHomework)

    const createHomeworkRequest = async () => {
        let requestModules = [];
        let requestGroups = [];

        modules.map((module) => (
            module.checked
                ? requestModules.push({
                    module: module.id,
                    n_questions: module.n_questions,
                })
                : null
        ))
        console.log("Request modules", requestModules)
        groups.map((group) => (
            (group.checked && (group.id_course === course))
                ? requestGroups.push(
                    group.id_group)
                : null
        ))
        console.log("Request groups", requestGroups)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            mode: 'no-cors',
            body: JSON.stringify({

                "groups": requestGroups,
                "hw_name": createHomework.hw_name,
                "open_date": createHomework.startDate,
                "close_date": createHomework.endDate,
                "modules_questions": requestModules
            })
        }
        console.log(options)
        fetch('http://34.16.137.250:8002/createhw', options)
            .then(response => {
                // console.log("createHomeworkRequest", response)
                if (response.status === 201) {
                    // console.log(respose)
                    throw new Error('Grupo creado');
                }

                console.log(respose)
            })
            .catch(error => {
                console.log(error)
            })
    };



    /*end API region */


    return (
        <Modal
            id="Modal prrona Crear Tarea"
            open={open}
            onClose={close}
            aria-labelledby="Nueva Tarea"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid container
                id="Grid container Crear Tarea"
                justifyContent='space-between'
                sx={{
                    bgcolor: 'secondary.main',
                    borderRadius: 2,
                    boxShadow: 24,
                    width: '80vw',
                    height: '80vh',
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

                <Grid item xs={12} id="PrimeraSección">
                    <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                        Crear Tarea
                    </Typography>
                </Grid>

                <Grid item xs={12} lg={6} md={6} sx={{ mt: 2 }}>
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

                        {/* Homework name */}
                        <Grid item xs={10} >
                            <Grid container>
                                <FormControl sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, width: '100%' }}>
                                    <InputLabel sx={{
                                        color: 'appDark.text',
                                        '&.Mui-focused': {
                                            color: 'appDark.text' //change label color
                                        }
                                    }}>Nombre de la tarea</InputLabel>
                                    <OutlinedInput
                                        type="input"
                                        label="Nombre de la Tarea"
                                        placeholder="Tarea 1"
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

                        {/* Course Selector */}
                        <Grid item xs={10}>
                            <FormControl variant="filled" sx={{ mt: 3, width: '100%' }}>
                                <InputLabel id="courseSelectorInputLabel"
                                    sx={{
                                        color: 'appDark.text',
                                        '&:hover': {
                                            color: 'appDark.text' //change label color
                                        },
                                        '&.Mui-focused': {
                                            color: 'appDark.text' //change label color
                                        }
                                    }}
                                >Matrícula del curso</InputLabel>

                                <Select
                                    id="courseSelector"
                                    value={course}
                                    onChange={handleSelection}
                                    sx={{ borderRadius: 2, bgcolor: 'appDark.bgBox', color: 'appDark.text', svg: { color: 'appDark.text' } }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                bgcolor: 'appDark.bgBox',
                                            },
                                        },
                                    }}
                                >
                                    {coursesData.map((course) => (
                                        <MenuItem
                                            sx={{
                                                color: "appDark.text",
                                                bgcolor: 'appDark.bgBox',
                                                '&:hover': {
                                                    bgcolor: 'appDark.selectHover' //change label color
                                                },
                                            }}
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.id} {course.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
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

                        {/* SelectorY - Grupos en donde se despliega la tarea */}
                        <Grid item xs={10}
                            id="Grupo"
                            sx={{
                                color: "appDark.text",
                                top: 0,
                                bgcolor: "appDark.bgBox",
                                mt: 3,
                                borderRadius: 2,
                            }}>
                            <Typography sx={{ ml: 2, mt: 2 }}>Grupos</Typography>
                            {groups.map((group) => (
                                group.id_course != course 
                                    ? <GroupHomework key={group.id_group} group={group} />
                                    : null
                            ))}

                        </Grid>

                    </Grid>
                </Grid>

                {/* Segunda Seccion */}
                <Grid item xs={12} lg={6} md={6} sx={{ mt: 2 }}>
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
                                height: "49vh", //to do no me pegues
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
                                        {modules.map((module) => (
                                            <>
                                                <AddModuleHomework key={module.id} module={module} />
                                            </>
                                        ))}
                                    </TableBody>

                                </Table>
                            </TableContainer>


                        </Grid>

                        {/* end container segunda seccion */}
                    </Grid>

                </Grid>

                <Grid container justifyContent='center' sx={{ mx: 5.5, mb: 2 }}>
                    <Grid item xs={6} id="cancelar" >

                        <Button onClick={close} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.button', borderRadius: 2 }}>
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={6} id="crear tarea" align="right">

                        <Button onClick={createHomeworkRequest} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.adminButton', borderRadius: 2 }}>
                            Crear tarea
                        </Button>
                    </Grid>

                </Grid>
            </Grid>

        </Modal>
    )
}