import { Card, CardContent, CardActionArea, Grid, Typography } from '@mui/material'
import { PersonSearchOutlined } from '@mui/icons-material'
import { ModulesLayout } from "../../layout"
import { PModuleCard } from '../../components'
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useParams, useNavigate } from 'react-router-dom';

export const PModulesPage = (props) => {
    const home = '/professor/home'
    const groupName = 'TC1028 (Gpo. 404)' //El nombren se debe de sacar desde la pagina home
    let params = useParams()

    //Current user info
    const auth = getAuth();
    const user = auth.currentUser;
    var schoolID;
    if (user !== null) {
        // console.log("Professor modules user info", user)
        //Desestructuración de user
        const { email, displayName, emailVerified, uid } = user
        //Nómina L00000000
        schoolID = (user.email).substring(0, 9).toUpperCase();
        // console.log("Nómina ", schoolID)
    }

    const pages = [
        { name: 'Home', route: '/professor/home' },
        { name: 'Profile', route: '/professor/profile' },
    ]
    const navigate = useNavigate()
    const gestion = () => {
        navigate('/professor/management')
        // this.props.history.push({pathname: "/professor/management",
        // state: { group:"G0000000001" }})
        // console.log("click gestión")
        
    }


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

         const group = "G000000001";
        // const group = params.group;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/groupmodules/${group}`, options);
                const responseData = await response.json();
                setModule(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);

    // console.log("modulos" + modulesData)

    //API para obtener los datos de las tareas
    const [homeworkData, setHomework] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        }

        //  const group = "G000000001";
        const group = params.group;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.16.137.250:8002/homework?id=${schoolID}&time=future&group=${group}&group_by=group`, options);
                const responseData = await response.json();
                setHomework(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);



    const homework = Object.values(homeworkData)



    return (
        <ModulesLayout home={home} homeworkData={homework} student={false} hwBTitle={'Asignaciones'} groupName={groupName} pages={pages} modules={modulesData}>
            <Grid container columnSpacing={40} rowSpacing={5}>
                <Grid item xs={12} md={4}>

                    <Card sx={{
                        width: 260,
                        height: 190,
                        backgroundColor: 'secondary.main',
                        borderRadius: '12px',
                        boxShadow: '5px 5px 0px 5px rgba(0, 0, 0, 0.1)',
                        ':hover': { backgroundColor: 'secondary.main', opacity: 0.8 }
                    }}
                    >
                        <CardActionArea onClick={gestion} sx={{ height: 207, textAlign: "center", alignItems: "center" }}>
                            <CardContent sx={{ pt: 4, pb: 6 }}>

                                <PersonSearchOutlined sx={{ color: 'appDark.icon', fontSize: 60, mt: 2 }} />
                                <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                    Gestión de Alumnos
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {modulesData != null && modulesData != undefined ?
                    modulesData.map((module, index) => (
                        <Grid item key={index} xs={12} md={4}>
                            <PModuleCard module={module} index={index} group={params.group} />
                        </Grid>
                    ))
                    : null}
            </Grid>
        </ModulesLayout>
    )
}

