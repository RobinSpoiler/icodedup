import { Grid, InputLabel, Modal, Button, Typography, MenuItem, useTheme, useMediaQuery } from '@mui/material'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useState, useEffect } from 'react';

import { CounterCell } from './CounterCell';

export const CreateGroup = ({ open, close }) => {
    const theme = useTheme();
    const isXLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const containerWidth = isXLargeScreen ? '35vw' : isLargeScreen ? '50vw' : isMediumScreen ? '60vw' : '95vw';
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [rows, setRows] = useState([]);
    // callback function to update rows variable
    const handleUpdateRows = (updatedRows) => {
        setRows(updatedRows);
    };
    // console.log(rows)
    /*API region */

    //GET term information
    const [termsData, setTerm] = useState([]);
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
                const response = await fetch(`http://34.16.137.250:8002/terms`, options);
                const responseData = await response.json();
                setTerm(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);

    //GET course information
    const [coursesData, setCourse] = useState([]);
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
                setCourse(responseData);
            } catch (error) {
                // console.error(error);
            }
        };
        fetchData();
    }, []);

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
            if (selectedCourse) {
                try {
                    const response = await fetch(`http://34.16.137.250:8002/coursemodules/${selectedCourse}`, options);
                    const responseData = await response.json();
                    setModule(responseData);
                } catch (error) {
                    // console.error(error);
                }
            }
        };
        fetchData();
    }, [selectedCourse]);

    //POST Create Group

    const registerGroup = {
        course_id: selectedCourse,
        term_id: selectedTerm,
        professor_id: "L00000001",
        modules_confs: rows,
    }
    // console.log(registerGroup)
    const createGroupRequest = async () => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            mode: 'no-cors',
            body: JSON.stringify({
                // "id": "test/test/2",
                // "code": "def smallest(a, b):\n\treturn a if a < b else b"

                "course_id": registerGroup.course_id,
                "term_id": registerGroup.term_id,
                "professor_id": registerGroup.professor_id,
                "modules_confs": registerGroup.modules_confs

            })
        }

        fetch('http://34.16.137.250:8002/registergroup', options)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    close()
                    throw new Error('Grupo creado');
                }

            })
            .catch(error => {
                console.log(error)
            })

    };



    /*end API region */

    //Estados
    const handleCourseSelection = (event) => {
        setSelectedCourse(event.target.value);
        // console.log(event.target.value)
    };

    const handleTermSelection = (event) => {
        setSelectedTerm(event.target.value);
    };

    const handleCountChange = (index, newCount) => {
        setModule(prevData => {
            const newData = [...prevData];
            newData[index].exNum = newCount;
            return newData;
        });
    };

    //State date picker
    const [date, setDate] = useState(null);
    // console.log(selectedCourse)
    // console.log(selectedTerm)

    return (
        <Modal
            id="Modal prrona"
            open={open}
            onClose={close}
            aria-labelledby="Nuevo Grupo"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid container
                // id="Grid container de la modal"
                justifyContent='center'
                sx={{
                    bgcolor: 'secondary.main',
                    borderRadius: '6px',
                    boxShadow: 24,
                    // width: 512,
                    width: containerWidth,
                    // height: 613,
                }}>

                {/* Primera vista */}

                {/* {count === 0 && ( */}
                {/* //Este parent solo es para no tener containers por cada cambio de vista */}
                {/* <> */}
                <Grid item xs={12}>
                    <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                        Nuevo Grupo
                    </Typography>
                </Grid>

                {/* Course Selector */}
                <Grid item xs={10}>
                    <FormControl fullWidth variant="filled" sx={{ mt: 3 }}>
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
                        >ID del curso</InputLabel>

                        <Select
                            id="courseSelector"
                            // value={coursesData.id}
                            value={selectedCourse || ''}
                            onChange={handleCourseSelection}
                            sx={{ borderRadius: "10px", bgcolor: 'appDark.bgBox', color: 'appDark.text', svg: { color: 'appDark.text' } }}
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
                                    key={course.name}
                                    value={course.id}
                                >
                                    {course.id} {course.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={10}>
                    {modulesData != null && (
                        <CounterCell data={modulesData} onUpdateRows={handleUpdateRows} />
                    )}


                </Grid>


                {/* Term Selector */}
                <Grid item xs={10}>
                    <FormControl fullWidth variant="filled" sx={{ mt: 3 }}>
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
                        >Periodo Académico</InputLabel>

                        <Select
                            id="termSelector"
                            value={selectedTerm || ''}
                            onChange={handleTermSelection}
                            sx={{ borderRadius: "10px", bgcolor: 'appDark.bgBox', color: 'appDark.text', svg: { color: 'appDark.text' } }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: 'appDark.bgBox',
                                    },
                                },
                            }}
                        >
                            {termsData.map((term) => (
                                <MenuItem
                                    sx={{
                                        color: "appDark.text",
                                        bgcolor: 'appDark.bgBox',
                                        '&:hover': {
                                            bgcolor: 'appDark.selectHover' //change label color
                                        },
                                    }}
                                    key={term.name}
                                    value={term.id}
                                >
                                    {term.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={10}>
                    <Grid container justifyContent='space-between' sx={{ my: 3 }}>
                        <Grid item id="cancelar">
                            <Button onClick={close} type="submit" variant="contained" sx={{ backgroundColor: 'appDark.button', borderRadius: 2 }}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item id="crearGrupo" >
                            <Button
                                // Lo de abajo estaba en onclick pero no se para que era
                                // () => {setCount(count + 1)}
                                onClick={createGroupRequest}
                                type="submit" variant="contained" sx={{ backgroundColor: 'appDark.adminButton', borderRadius: 2 }}>
                                Crear Grupo
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* end first view */}


            </Grid>
            {/* <HomeworkCard key={ 1 }  data={ data } student={ student }></HomeworkCard> */}

        </Modal >
    )
}