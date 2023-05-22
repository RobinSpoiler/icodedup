import { Grid, Button, Menu, MenuItem } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import React from 'react'

const ITEM_HEIGHT = 48;

export const QuestionsDropdown = ({questions, qName}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                type="dropdown"
                variant="contained"
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<KeyboardArrowUp />}
                sx={{ backgroundColor: 'appDark.adminButton'}}
            >
            {qName}
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                
                PaperProps={{
                sx: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
                bgcolor: 'appDark.menuDropdown',
                color: 'appDark.text',
                // overflowY:'hidden'
                },
                }}

            >
                {questions.map((question) => (
                <MenuItem key={question} selected={question === `${qName}`} onClick={handleClose}>
                {question}
                </MenuItem>
                ))}
            </Menu>
        </>
    )
}