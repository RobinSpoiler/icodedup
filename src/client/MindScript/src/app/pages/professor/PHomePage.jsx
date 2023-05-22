import { Grid, useTheme, Typography, CardContent, CardActionArea } from '@mui/material'
import { HomeLayout } from '../../layout/HomeLayout';
import { CoursesCard, ActionButton, CreateGroup, CreateHomework, CreateQuestion } from '../../components'
import { AddCircleOutline, NoteAddOutlined, UploadFile } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";

export const PHomePage = () => {
    const theme = useTheme();

    //Current user info
    const auth = getAuth();
    const user = auth.currentUser;
    var schoolID;
    if (user !== null) {
        // console.log("Professor home user info", user)
        //Desestructuración de user
        const { email, displayName, emailVerified, uid } = user
        //Nómina L00000000
        schoolID = (user.email).substring(0, 9).toUpperCase();
        // console.log("Nómina ", schoolID)
    }
    console.log("Nómina ", schoolID)

    const pages = [
        { name: 'Home', route: '/professor/home' },
        { name: 'Profile', route: '/professor/profile' },
    ]

    //API para obtener la info de los grupos
    const [groupsData, setGroup] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        // let userID = "L00000001"
        let term = "all"

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/groups?id=${schoolID}&term=${term}`, options);
                const responseData = await response.json();
                setGroup(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);


    //Funciones para abrir la modal de Crear Curso
    const [open, setOpen] = useState(false);
    const showModal = () => { setOpen(true); }
    const closeModal = () => {
        setOpen(false);
    }

    //Funciones para abrir la modal de Crear Curso
    const [openCreateHomework, setOpenCreateHomework] = useState(false);
    const showModalCreateHomework = () => { setOpenCreateHomework(true); }
    const closeModalCreateHomework = () => {
        setOpenCreateHomework(false);
    }

    //Funciones para abrir la modal de Crear Curso
    const [openCreateQuestion, setOpenCreateQuestion] = useState(false);
    const showModalCreateQuestion= () => { setOpenCreateQuestion(true); }
    const closeModalCreateQuestion = () => {
        setOpenCreateQuestion(false);
    }

    //Dynamic modal view
    const home = '/professor/home'
    const modules = '/professor/modules' //El nombren se debe de sacar desde la pagina home

    //API para obtener los datos de las tareas de la semana
    const [homeworkData, setHomework] = useState([]);
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
                const response = await fetch(`http://34.16.137.250:8002/homework?id=${schoolID}&time=future&group=all&group_by=group`, options);
                const responseData = await response.json();
                setHomework(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);
    console.log("this is homework data", homeworkData)

    const homework = Object.entries(homeworkData)

    const request = handleEditorDidMount()

    return (
        <Grid container justifyContent='center' alignItems='center'>

            <HomeLayout groupsData={groupsData} homeworkData={homework} hwBTitle={'Asignaciones en Curso'} home={home} pages={pages}>

                {/* Modales */}
                <CreateGroup open={open} close={closeModal} />
                <CreateHomework open={openCreateHomework} close={closeModalCreateHomework} />
                <CreateQuestion open={openCreateQuestion} close={closeModalCreateQuestion} />

                <Grid container columnSpacing={40} rowSpacing={5}>

                    <Grid item md={12} xs={12} >
                        <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 500 }} >Acciones</Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ActionButton >
                            <CardActionArea onClick={showModal} sx={{ height: 207, textAlign: "center" }}>
                                <CardContent sx={{ pt: 4, pb: 6 }}>
                                    <AddCircleOutline sx={{ color: 'appDark.icon', fontSize: 60, fontWeight: 100, mt: 2 }} />
                                    <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                        Crear Grupo
                                    </Typography>


                                </CardContent>
                            </CardActionArea>
                        </ActionButton>
                    </Grid>

                    <Grid item xs={12} md={4}>

                        <ActionButton >
                            <CardActionArea onClick={showModalCreateHomework} sx={{ height: 207, textAlign: "center" }}>
                                <CardContent sx={{ pt: 4, pb: 6 }}>
                                    <NoteAddOutlined sx={{ color: 'appDark.icon', fontSize: 60, fontWeight: 100, mt: 2 }} />
                                    <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                        Crear Tarea
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </ActionButton>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ActionButton >
                            <CardActionArea onClick={showModalCreateQuestion} sx={{ height: 207, textAlign: "center" }}>
                                <CardContent sx={{ pt: 4, pb: 6 }}>
                                    <UploadFile sx={{ color: 'appDark.icon', fontSize: 60, fontWeight: 100, mt: 2 }} />
                                    <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                        Solicitudes
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </ActionButton>
                    </Grid>

                    <Grid item md={12} xs={12} >
                        <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 500 }} >Grupos Existentes</Typography>
                    </Grid>

                    {groupsData.map((group, index) => (
                        <Grid key={index} item xs={12} md={4} sx={{ pb: 5, pl: 5 }}>
                            <CoursesCard group={group} index={index} modules={modules} />
                        </Grid>
                    ))}
                </Grid>

            </HomeLayout >
        </Grid>
    )
}


const handleEditorDidMount = async () => {

    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',

    //   },
    //   mode: 'cors',
    // }

    // let userID = "A01551955"
    // let term = "current"

    // fetch(`http://34.16.137.250:8002/groups?id=${userID}&term=${term}`, options)
    // .then(response => response.json())
    // // .then(data => console.log("aqui\n", data))
    // .then(data => setGroup(data))
    // .catch(error => console.error(error));



};