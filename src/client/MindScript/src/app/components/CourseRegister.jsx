import { Grid, InputLabel, Modal, OutlinedInput, Button, FormHelperText, FormControl, Typography } from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useState, useEffect, React } from 'react';
import { useForm } from '../../hooks/useForm';


export const CourseRegister = ({ open, close, setCount, count }) => {
    const [requestVal, setValue] = useState('')

    const [error, setError] = useState(null);
    const enrollData = {
        group: requestVal,
        student: "A07136662"
    }
    const handleInputChange = (event) => {
        setValue(event.target.value);
    };



    const enrollButton = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify({
                "group": enrollData.group,
                "student": enrollData.student
            })
        }

        fetch('http://34.16.137.250:8002/enrollstudent', options)
            .then((response) => {
                if (response.status === 409) {
                    throw new Error('Ya estás enrolado prro');
                }
                if (response.status === 400) {
                    throw new Error('El curso ingresado no existe');
                }
                if (response.status === 201) {
                    // throw new Error('Network response was not ok');
                    setCount(1)
                }
                return response.json();
            })
            .then((data) => {
                // handle successful response
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    console.log(requestVal)

    //Course Key input state and validations
    // const formData = {
    //     courseKey: requestVal,
    // }
    // console.log("ayuda")
    // const formValidations = { //Aqui value lo buscamos en la DB si viene vacío regresamos false y sale el error todo
    //     courseKey: [(value) => value.includes(200), 'Ya existe'],
    // }
    // const { courseKey, courseKeyValid, isFormValid, formState, onInputChange } = useForm(formData, formValidations, requestVal);
    // // console.log(courseKey)
    // const [formSubmitted, setFormSubmitted] = useState(false);
    // //courseKeyValid solo contiene el mensaje de error 
    // // console.log(courseKeyValid);
    // console.log(formData.courseKey)

    const onSubmit = (event) => {
        event.preventDefault();
        // setFormSubmitted(true);
        // console.log(formState);
        // if (!isFormValid) return;

        // setCount(1)
    }
    // console.log(count);



    return (
        <Modal
            id="Modal prrona Unirse a Curso"
            open={open}
            onClose={close}
            aria-labelledby="Unirse a un curso"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid container
                xs={8} md={6} lg={5}
                id="Grid container Unirse curso"
                justifyContent='center'
                sx={{
                    bgcolor: 'secondary.main',
                    borderRadius: 2,
                    boxShadow: 10,
                    width: '30vw',

                }}>

                {/* Primera vista */}

                {count === 0 && (
                    //Este parent solo es para no tener containers por cada cambio de vista */}
                    <>
                        <form onSubmit={onSubmit} id="form">
                            <Grid container justifyContent="center">

                                <Grid item xs={12} >
                                    <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                                        Unirse a un curso
                                    </Typography>
                                </Grid>

                                <Grid item id="item" xs={10} align="center">
                                    <FormControl fullWidth sx={{ backgroundColor: 'appDark.bgBox', borderRadius: 2, mt: 4 }}>
                                        <InputLabel sx={{
                                            color: 'appDark.text',
                                            '&.Mui-focused': {
                                                color: 'appDark.text' //change label color
                                            }
                                        }}>Clave del curso</InputLabel>
                                        <OutlinedInput
                                            type="input"
                                            label="Nombre de la Tarea"
                                            placeholder="XXXX-XXXX-XXXX"
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
                                            // name='courseKey'
                                            value={requestVal}
                                            onChange={handleInputChange}
                                        // error={!!courseKeyValid && formSubmitted}

                                        />
                                    </FormControl>
                                    {error && (<FormHelperText sx={{color:'error.main', padding:1}}>{error}</FormHelperText>)}

                                    <Grid item sx={{ bgcolor: 'transparent', ml: 1 }}>
                                        {/* {formSubmitted && <FormHelperText error>{courseKeyValid}</FormHelperText>} */}
                                    </Grid>
                                </Grid>


                                <Grid item id="cancelar" xs={10} align="center">
                                    <Button
                                        onClick={enrollButton}
                                        type="submit" variant="contained" sx={{ backgroundColor: 'appDark.button', borderRadius: 2, my: 4 }}>
                                        Unirse
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </>
                )}
                {count === 1 && (
                    <>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                {/* To do: quiza aquí poner el nombre de la materia */}
                                <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ color: 'appDark.text', fontSize: 25, fontWeight: 700, mt: 4 }}>
                                    ¡Te has unido con éxito al curso!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} align='center' sx={{ color: "success.main", mt: 2 }}>
                                <CheckCircleOutlineRoundedIcon sx={{ width: 90, height: 90 }} />
                            </Grid>
                            <Grid item id="cancelar" xs={10} align="center">
                                <Button type="submit" onClick={close} variant="contained" sx={{ backgroundColor: 'appDark.button', borderRadius: 2, my: 4 }}>
                                    Regresar a cursos
                                </Button>
                            </Grid>

                        </Grid>
                    </>
                )}

            </Grid>

        </Modal >
    )
}