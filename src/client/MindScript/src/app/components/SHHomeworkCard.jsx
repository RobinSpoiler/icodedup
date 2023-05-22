import { Card, Collapse, List, ListItem, ListItemButton, ListItemText, Typography, Grid, IconButton } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import * as React from 'react';

export const SHHomeworkCard = ({ data, index }) => {

    //Array de los dias de la semana
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

    //Variables para sacar el dia de la entrega
    const d = new Date();
    let day = d.getDay();
    var today = day + index;

    if (today > 6) {
        today = today - 7;
    }

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
                    backgroundColor: 'secondary.main' ,
                    ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 }
                    },
                    open && {
                        backgroundColor: '#62569D',
                        ':hover': { backgroundColor: '#62569D', opacity: 0.9 }
                    }
                ]}
            >
                {open ? <ExpandLess sx={{ color: 'appDark.icon' }} /> : <ExpandMore sx={{ color: 'appDark.icon' }} />}
                <ListItemText sx={{ color: 'appDark.text' }} primary={ days[today] } />
                <Grid sx={{ borderRadius: '20px', border: 2, borderColor: 'appDark.icon' }}>
                    <Typography sx={{ color: 'appDark.icon', fontWeight: 'bold', my:.1, mx:1.1 }}>{ data.length }</Typography>
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

                    {data.map((homework, indexH) => (
                        <Grid container key={ indexH }>
                            <ListItem disablePadding>
                                <ListItemButton>

                                    <Grid sx={{ borderRadius: '12px', backgroundColor: '#6D7483', mr: 2 }} >
                                        <Typography sx={{ color: 'appDark.text', mx: 2 }}>{ homework.group_id }</Typography>
                                    </Grid>

                                    <ListItemText sx={{ pl: 4 }} primary={ homework.hw_name } />

                                </ListItemButton>
                            </ListItem>
                        </Grid>

                    ))}

                </List>
            </Collapse>
        </Card>
    )
}