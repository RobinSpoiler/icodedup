import { Grid, Typography, CardContent, CardActionArea } from '@mui/material'
import { HomeLayout } from '../../layout/HomeLayout';
import { CoursesCard, ActionButton, CourseRegister } from '../../components'
import { AddCircleOutline } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";

export const SHomePage = () => {

    //Current user info
    const auth = getAuth();
    const user = auth.currentUser;
    var schoolID;
    if (user !== null) {
        // console.log("Student modules user info", user)
        //Desestructuración de user
        const { email, displayName, emailVerified, uid } = user
        //Matrícula A00000000
        schoolID = (user.email).substring(0, 9).toUpperCase();
        // console.log("Matrícula ", schoolID)
    }

    const pages = [
        { name: 'Home', route: '/student/home' },
        { name: 'Profile', route: '/student/profile' },
    ]
    



//API region
const handlerHelp = async () => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body: JSON.stringify({
                id: "L01922384",
                term: "current"
            })
        };

        const request = await fetch('http://34.16.137.250:8002/courses', options);
        // if (!request.ok) {
        //   throw new Error(`HTTP error! status: ${request.status}`);
        // }
        // console.log(request);
        const incomingdata = await request.json();
        console.log(data);

    }
    catch (error) {
        console.log("aaaa", error)
    }
}

//end API region

//Modal course registration
const [count, setCount] = useState(0);
const [openModalRegister, setOpenRegister] = useState(false);
const showModalRegister = () => { setOpenRegister(true); }
const closeModalRegister = () => {
    setOpenRegister(false);
    setCount(0);
}

//Navigate to
const modules = "/student/modules"
const home = "/student/home"

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
            const response = await fetch(`http://34.16.137.250:8002/homework?id=${schoolID}&time=week&group=all&group_by=week`, options);
            const responseData = await response.json();
            setHomework(responseData);
        } catch (error) {
            // console.error(error);
        }
    };

    fetchData();
}, []);

// const homeworkData = [
//     {
//         title: 'Lunes',
//         homework: [ //Tareas que se entregen el lunes de esa semana
//             {
//                 group: 'Curso A', //nombre del grupo que tiene la tarea
//                 work: 'Tarea 1' //nombre de la tarea
//             },
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 2'
//             },
//             {
//                 group: 'Curso C',
//                 work: 'Quiz 1'
//             },
//         ]
//     },
//     {
//         title: 'Martes',
//         homework: [
//             {
//                 group: 'Curso B',
//                 work: 'Tarea 1'
//             },
//             {
//                 group: 'Curso B',
//                 work: 'Quiz 2'
//             },
//         ]
//     },
//     {
//         title: 'Miercoles',
//         homework: [
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 1'
//             },
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 2'
//             },
//             {
//                 group: 'Curso C',
//                 work: 'Quiz 1'
//             },
//         ]
//     },
//     {
//         title: 'Jueves',
//         homework: [
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 1'
//             },
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 2'
//             },
//             {
//                 group: 'Curso C',
//                 work: 'Quiz 1'
//             },
//         ]
//     },
//     {
//         title: 'Viernes',
//         homework: [
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 1'
//             },
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 2'
//             },
//             {
//                 group: 'Curso C',
//                 work: 'Quiz 1'
//             },
//         ]
//     },
//     {
//         title: 'Sabado',
//         homework: [
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 1'
//             },
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 2'
//             },
//             {
//                 group: 'Curso C',
//                 work: 'Quiz 1'
//             },
//         ]
//     },
//     {
//         title: 'Domingo',
//         homework: [
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 1'
//             },
//             {
//                 group: 'Curso A',
//                 work: 'Tarea 2'
//             },
//             {
//                 group: 'Curso C',
//                 work: 'Quiz 1'
//             },
//         ]
//     }
// ]

return (
    <HomeLayout homeworkData={homeworkData} student={true} hwBTitle={'Asignaciones Faltantes'} home={home} pages={pages} >
        {/* Modales */}
        <CourseRegister open={openModalRegister} close={closeModalRegister} setCount={setCount} count={count} />

        <Grid container columnSpacing={40} rowSpacing={5}>
            <Grid item xs={12} md={4}>
                <ActionButton >
                    <CardActionArea onClick={showModalRegister} sx={{ height: 207, textAlign: "center" }}>
                        <CardContent sx={{ pt: 4, pb: 6 }}>
                            <AddCircleOutline sx={{ color: 'appDark.icon', fontSize: 60, fontWeight: 100, mt: 2 }} />
                            <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                Enrolar Curso
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </ActionButton>
            </Grid>

            {groupsData.map((group, index) => (
                <Grid key={index} item xs={12} md={4}>
                    <CoursesCard group={group} index={index} modules={modules} />
                </Grid>
            ))}

        </Grid>

    </HomeLayout>
)
}