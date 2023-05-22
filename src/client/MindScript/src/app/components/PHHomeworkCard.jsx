import { Card, Collapse, List, ListItem, ListItemButton, ListItemText, Typography, Grid, IconButton } from '@mui/material'
import { DeleteOutline, Edit, ExpandLess, ExpandMore, HomeWork } from '@mui/icons-material'
import { EditHomework, RemoveButton } from '../components';
import { useState, useEffect } from 'react';
import * as React from 'react';

export const PHHomeworkCard = ({ data }) => {
    //Importante para EditHomework
    const [editData, setData] = useState(null);

    //Funciones para abrir la modal de Crear TAREA
    const [openEditHomework, setOpenEditHomework] = useState(false);
    const showModalEditHomework = () => {
        setOpenEditHomework(true);
    }
    const closeModalEditHomework = () => {
        setOpenEditHomework(false);
    }

    //Funciones para abrir la modal de Eliminar tarea
    const [openDeleteHomework, setOpenDeleteHomework] = useState(false);
    const showModalDeleteHomework = () => { setOpenDeleteHomework(true); }
    const closeModalDeleteHomework = () => {
        setOpenDeleteHomework(false);
    }

    const modules = []

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (

        <Card
            sx={[
                { borderRadius: '0px', boxShadow: 'none', mb: 2, width: 350 },
                open && {
                    borderRadius: '12px',
                }
            ]}
        >
            <ListItemButton
                onClick={handleClick}
                sx={[
                    {
                        backgroundColor: 'secondary.main',
                        ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 }
                    },
                    open && {
                        backgroundColor: '#62569D',
                        ':hover': { backgroundColor: '#62569D', opacity: 0.9 }
                    }
                ]}
            >
                {open ? <ExpandLess sx={{ color: 'appDark.icon' }} /> : <ExpandMore sx={{ color: 'appDark.icon' }} />}
                <ListItemText sx={{ color: 'appDark.text' }} primary={data[0]} />
                <Grid sx={{ borderRadius: '20px', border: 2, borderColor: 'appDark.icon' }}>
                    <Typography sx={{ color: 'appDark.icon', fontWeight: 'bold', my: .1, mx: 1.1 }}>{data[1].length}</Typography>
                </Grid>

            </ListItemButton>

            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <List
                    component="div"
                    disablePadding
                >

                    {(data[1]).map((homework, indexH) => (
                        <Grid container key={indexH}>
                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText sx={{ pl: 4 }} primary={homework.hw_name} />

                                </ListItemButton>


                                <Grid>
                                    <IconButton
                                        onClick={() => {
                                            setData(homework)
                                            showModalEditHomework()
                                        }}
                                        sx={{ borderRadius: 0 }}>
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            setData(homework)
                                            showModalDeleteHomework()
                                        }} sx={{ borderRadius: 0 }}>
                                        <DeleteOutline />
                                    </IconButton>
                                </Grid>
                            </ListItem>
                        </Grid>

                    ))}
                    < EditHomework open={openEditHomework} close={closeModalEditHomework} editData={editData} modules={modules} />
                    < RemoveButton open={openDeleteHomework} close={closeModalDeleteHomework} editData={editData} confirmationText="¿Esta seguro que desea eliminar esta tarea?" />


                </List>
            </Collapse>
        </Card>
    )
}