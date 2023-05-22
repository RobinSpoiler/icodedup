import { Grid, useTheme, useMediaQuery, Button, Typography, CardActionArea, CardContent, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { NavBar, SearchBar, ActionButton, EditCourse } from '../../components';
import { AddCircleOutline, Delete, Edit, NoteAddOutlined } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid';
import { getAuth } from "firebase/auth";
import { CreateCourse } from '../../components/CreateCourse';

export const ASyllabus = () => {
    // Api region
    const [syllabusData, setSyllabus] = useState([]);
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
                const response = await fetch(`http://34.16.137.250:8002/courses`, options);
                const responseData = await response.json();
                setSyllabus(responseData);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);
    // console.log(syllabusData)

    const handleDelete = async (id) => {
        // console.log(id);
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ "id": id })
                mode: 'cors',

            };

            const response = await fetch(`http://34.16.137.250:8002/course/${id}`, options);
            const data = await response.json();
            return data

        } catch (error) {
            console.error(error);
        }
    };

    //Funciones para abrir la modal de Crear Curso
    const [openCreateCourse, setOpenCreateCourse] = useState(false);
    const showModalCreateCourse = () => { setOpenCreateCourse(true); }
    const closeModalCreateCourse = () => {
        setOpenCreateCourse(false);
    }

    //Funciones para abrir la modal de Editar Curso
    const [rowParams, setRowParams] = useState([]);
    const [openEditCourse, setOpenEditCourse] = useState(false);
    const closeModalEditCourse = () => {
        setOpenEditCourse(false);
    }


    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const containerHeight = isLargeScreen ? 60 : isMediumScreen ? 60 : 120;

    const [nameQuery, setNameQuery] = useState("");
    const [idQuery, setIdQuery] = useState("");
    const [dataFiltered, setFilter] = useState([]);

    useEffect(() => {
        const filteredData = filterData(nameQuery, idQuery, syllabusData);
        setFilter(filteredData);
    }, [nameQuery, idQuery, syllabusData]);


    const columns = [
        { field: 'id', headerName: 'Id', flex: 2, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Materia', flex: 2, align: 'center', headerAlign: 'center' },
        { field: 'n_modules', headerName: 'Modulos', flex: 2, align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            mx: 10,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => {
                        setRowParams(params.row);
                        setOpenEditCourse(true);
                    }}
                        aria-label="delete"
                        sx={{ color: 'appDark.icon', mx: 2 }}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)} aria-label="delete" sx={{ color: 'appDark.icon', mx: 2 }}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    //Current user info
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
        // console.log("Admin syllabus user info", user)
        //Desestructuración de user
        const { email, displayName, emailVerified, uid } = user
        //Nómina L00000000
        const schoolID = (user.email).substring(0, 8);
        // console.log("Nómina ", schoolID)
    }
    const pages = [
        { name: 'Gestion de Usuarios', route: '/admin/management' },
        { name: 'Solicitudes', route: '/admin/request' },
        { name: 'Plan de Estudios', route: '/admin/syllabus' }
    ]


    return (
        <Grid container alignItems='center' justifyContent='center' padding={3} spacing={0} sx={{ minHeight: '100vh', bgcolor: 'primary.main' }}>
            <NavBar pages={pages} />
            <CreateCourse open={openCreateCourse} close={closeModalCreateCourse} />
            <EditCourse open={openEditCourse} close={closeModalEditCourse} params={rowParams} />

            <Grid item xs={12} md={12} lg={9}>
                <Grid container columnSpacing={1} alignItems='center' justifyContent='space-around' sx={{ bgcolor: 'secondary.main', mt: 5, borderRadius: 2, height: containerHeight }}>
                    <Grid item xs={12} sm={6} lg={6}>
                        <SearchBar searchQuery={nameQuery} name={'Materia'} placeholder={'Introducción a Python'} setSearchQuery={setNameQuery} />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                        <SearchBar searchQuery={idQuery} name={'Id'} placeholder={'TC0000'} setSearchQuery={setIdQuery} />
                    </Grid>

                </Grid>
                <Grid item xs={12} sx={{ color: 'appDark.text', bgcolor: 'appDark.bgBox', height: '70vh', mt: 2, borderRadius: 2 }}>
                    <DataGrid disableColumnMenu disableHeader hideFooterPagination rows={dataFiltered} columns={columns} theme={theme} sx={{ color: 'appDark.text', border: 0 }} />
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={3}>
                <Grid container rowSpacing={1} justifyContent='center' align='center' alignItems='center'>
                    <Grid item xs={12} >
                        <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 500 }} >Acciones</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <ActionButton >
                            <CardActionArea onClick={showModalCreateCourse} sx={{ height: 207, textAlign: "center" }}>
                                <CardContent sx={{ pt: 4, pb: 6 }}>
                                    <AddCircleOutline sx={{ color: 'appDark.icon', fontSize: 60, fontWeight: 100 }} />

                                    <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                        Crear Materia
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </ActionButton>

                    </Grid>

                    <Grid item xs={12}>
                        <ActionButton >
                            <CardActionArea sx={{ height: 207, textAlign: "center" }}>
                                <CardContent sx={{ pt: 4, pb: 6 }}>
                                    <NoteAddOutlined sx={{ color: 'appDark.icon', fontSize: 60, fontWeight: 100 }} />
                                    <Typography sx={{ color: 'appDark.text', fontSize: 20, fontWeight: 405 }} >
                                        Añadir Modulo
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </ActionButton>
                    </Grid>

                </Grid>

            </Grid>

        </Grid>
    )
}


const filterData = (nameQuery, idQuery, usersData) => {
    if (!nameQuery && !idQuery) {
        return usersData;
    } else {
        return usersData.filter((d) =>
            (nameQuery && d.name.toLowerCase().includes(nameQuery.toLowerCase())) ||
            (idQuery && d.id.toLowerCase().includes(idQuery.toLowerCase()))
        );
    }
};
