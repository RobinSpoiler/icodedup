import { Grid } from '@mui/material'
import { ModulesLayout } from "../../layout"
import { SModuleCard } from '../../components'
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useParams } from 'react-router-dom';

export const SModulesPage = () => {
    const home = '/student/home'
    const groupName = 'TC1028 (Gpo. 404)' //El nombren se debe de sacar desde la pagina home
    let params = useParams()

    // console.log(useParams().group)

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

    //API para obtener los datos de las tarjeras de modulos
    const [modulesData, setModule] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        // const group = "G000000001";
        const group = params.group;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/groupmodules/${group}?user_id=${schoolID}`, options);
                const responseData = await response.json();
                setModule(responseData);
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

        // const group = "G000000001";
        const group = params.group;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/homework?id=${schoolID}&time=week&group=${group}&group_by=week`, options);
                const responseData = await response.json();
                setHomework(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <ModulesLayout home={home} homeworkData={homeworkData} student={true} hwBTitle={'Asignaciones Faltantes'} groupName={groupName} pages={pages}>
            <Grid container columnSpacing={40} rowSpacing={5}>
                {modulesData != null && modulesData != undefined ?
                    modulesData.map((module, index) => (
                        <Grid item key={index} xs={12} md={4}>
                            {module.progress === 100? modulesData[index+1].locked=false : null}
                            <SModuleCard module={module} index={index} />
                        </Grid>
                    ))
                :null}
            </Grid>
        </ModulesLayout>
    )
}

