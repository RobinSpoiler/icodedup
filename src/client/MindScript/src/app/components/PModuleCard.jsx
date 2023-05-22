import { Card, CardContent, CardActions, Typography, Grid, IconButton } from '@mui/material'
import { Edit, LockOutlined, LockOpenRounded } from '@mui/icons-material'
import * as React from 'react';

export const PModuleCard = ({ module, index, group }) => {
    const colors = ["#C12C45", "#5EC1F3", "#55D16E", "#FACD34"]
    const color = index - (colors.length * parseInt(index / colors.length));
    const [status, setBlock] = React.useState(module.locked)

    const changeStatus = () => {
        setBlock(!status);
        
        //API para modificar si un modulo esta bloqueado o no
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                "module": module.id,
                "group": group
            })
        }

        fetch('http://34.16.137.250:8002/togglemodulestate', options)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                // console.log(error)
            })

    };

    return(
        <Grid>
            <Card
                sx={{
                    width: 260,
                    height: 190,
                    backgroundColor: 'secondary.main',
                    borderRadius: '12px',
                    boxShadow: '5px 5px 0px 5px rgba(0, 0, 0, 0.1)'
                }}
            >

                <Grid sx={[
                        { 
                            backgroundColor: `${colors[color]}`, height: 35
                        },
                        status && {
                            backgroundColor: "#6D7483", height: 35 
                        }
                    ]}
                />

                <CardActions disableSpacing>
                    <IconButton
                    > 
                        <Edit sx={{ color: 'appDark.icon'}} />
                    </IconButton>

                    <IconButton
                        sx={{ ml: 20}}
                        onClick={changeStatus}
                    >
                        {status ?
                            <LockOutlined sx={{ color: 'appDark.icon'}} />
                        :
                            <LockOpenRounded sx={{ color: 'appDark.icon'}}/>
                        } 
                    </IconButton>      
                </CardActions>

                <CardContent
                    sx={{ pt: 0, textAlign: 'center' }}
                >

                    <Typography sx={{ color: 'appDark.text', fontSize: 26, fontWeight: 405 }} >
                        {module.name}      
                    </Typography>

                </CardContent>


            </Card>
        </Grid>
    )
}