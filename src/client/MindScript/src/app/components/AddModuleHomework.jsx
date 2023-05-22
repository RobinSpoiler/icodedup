import React, { useState } from "react";
import {
    TableCell,
    TableRow,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import FormControl from '@mui/material/FormControl';
import {useEffect} from 'react'


export function AddModuleHomework({ module }) {
    const [counts, setCounts] = useState({});

    const handleToggle = (module, value) => {
        setCounts((prevCounts) => {
            const currentCount = prevCounts[module.name] || 0;
            if (value === "up") {
                return {
                    ...prevCounts,
                    [module.name]: currentCount + 1,
                    [module.n_questions]: counts[module.name]
                };
            } else if (value === "down" && currentCount > 0) {
                return {
                    ...prevCounts,
                    [module.name]: currentCount - 1,
                    [module.n_questions]: counts[module.name]
                };
            } else {
                return prevCounts;
            }
        });
    };
    
    useEffect(() => {
        // Update object here
        module.n_questions = counts[module.name] || 0
    }, [counts]);
 
    //Selectors por módulo
    const [course, setCourse] = useState('');
    const handleSelection = (event) => {
        setCourse(event.target.value);
    };

    //Datos que son necesarios para la checklist (en el futuro)
    const [checked, setChecked] = React.useState(module.checked);

    const handleChange = () => {
        setChecked(!checked);
        module.checked = !checked;
    };

  


    return (
        <>
            {/* Desde aqui queremos que se repita */}
            <TableRow >
                <TableCell
                    id="tableCellModuleSelect"
                    align="left" //??
                    sx={{ color: "appDark.text", padding: 0 }}
                    component="th"
                    scope="row"
                >
                    <Grid item xs={10} >
                        <FormControl fullwidth="true" variant="filled">
                            {/* CheckBox */}
                            <FormControlLabel
                                value="end"
                                control={<Checkbox
                                    checked={checked}
                                    onClick={handleChange}
                                    sx={{
                                        ml: 1.5,
                                        color: 'appDark.icon',
                                        '&.Mui-checked': {
                                            color: 'appDark.adminButton',
                                        },
                                    }}
                                />}
                                label={module.name}
                                labelPlacement="end"
                                />
                                
                        </FormControl>
                    </Grid>

                </TableCell>

                <TableCell sx={{ color: "appDark.text" }}>
                    <ToggleButtonGroup
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: 'center',
                            svg: { color: "appDark.text", width: "12px", height: "10px" },
                            "& .MuiToggleButton-root": { padding: "3px" },
                            columnGap: 1,

                        }}
                        value={counts[module.name] || 0}
                        exclusive
                        onChange={(event, value) => handleToggle(module, value)}
                    >

                        <Typography sx={{ mb: "2px" }}>
                            {counts[module.name] || 0}
                        </Typography>

                        <ToggleButtonGroup
                            orientation="vertical"
                            disabled={checked ? false : true}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: 'center',

                                svg: { color: "appDark.text", width: "12px", height: "10px" },
                                "& .MuiToggleButton-root": { padding: "3px" },
                                flexDirection: 'column',

                            }}
                            value={counts[module.name] || 0}
                            exclusive
                            onChange={(event, value) => handleToggle(module, value)}
                        >
                            <ToggleButton sx={{ bgcolor: "#404655" }} value="up">
                                <ArrowUpwardIcon />
                            </ToggleButton>
                            <ToggleButton sx={{ bgcolor: "#404655" }} value="down">
                                <ArrowDownwardIcon />
                            </ToggleButton>

                        </ToggleButtonGroup>


                    </ToggleButtonGroup>

                </TableCell>

            </TableRow>
            {/* Hasta aca se tiene que repetir */}
        </>
    );
}
