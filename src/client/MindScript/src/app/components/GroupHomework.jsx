import { Grid, InputLabel,Checkbox, Modal, FormControlLabel, OutlinedInput, Button, Typography, MenuItem } from '@mui/material'

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useState } from 'react';
import { AddModuleHomework } from '../components/AddModuleHomework';

export const GroupHomework = ({ group }) => {

    //Datos que son necesarios para la checklist
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <Grid container justifyContent="space-between" alignItems='center' >
            <Grid item xs={8} fullwidth="true" >
                <FormControl fullwidth="true" variant="filled">
                    {/* CheckBox */}
                    <FormControlLabel
                        value="end"
                        control={<Checkbox
                            checked={checked}
                            onClick={handleChange}
                            sx={{
                                ml: 2,
                                color: 'appDark.icon',
                                '&.Mui-checked': {
                                    color: 'appDark.adminButton',
                                },
                            }}
                        />}
                        label={group.id_group + " - " + group.id_course}
                        labelPlacement="end"
                    />
                </FormControl>
            </Grid>

        </Grid>
    )
}