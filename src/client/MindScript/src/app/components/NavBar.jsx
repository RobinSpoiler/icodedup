import { Brightness6, LogoutOutlined } from '@mui/icons-material'
import { AppBar, Button, Toolbar, IconButton, Grid, Typography, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';
import { GridMenuIcon } from '@mui/x-data-grid';

export const NavBar = ({ drawerWidth = 240, pages }) => {
    const dispatch = useDispatch();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const onLogout = () => {
        dispatch(startLogout());
    }

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuAnchor(null);
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                // ml: { sm: `${ drawerWidth }px` },
                boxShadow: 'none'
            }}
        >
            <Toolbar>
                <Grid container
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    spacing={2}
                >

                    <Grid item sx={{ mt: 1 }}>
                        <img src="/MindScript.svg" />
                    </Grid>

                    {isSmallScreen ?
                        <>
                            <Grid item>
                                <IconButton onClick={handleMenuOpen} sx={{ color: 'appDark.icon', ml: 1 }}>
                                    <GridMenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={menuAnchor}
                                    open={Boolean(menuAnchor)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            bgcolor: 'secondary.main',
                                        },
                                    }}
                                >
                                    {pages.map((page) =>
                                        <MenuItem key={page.name} onClick={handleMenuClose}>
                                            <Button fullWidth component={Link} to={page.route} sx={{ color: 'appDark.text' }}>
                                                {page.name}
                                            </Button>
                                        </MenuItem>
                                    )}
                                </Menu>
                            </Grid>
                        </>
                        :
                        <Grid item>
                            <Grid container justifyContent='flex-end'>
                                {pages.map((page) =>
                                    <Grid item key={page.name} sx={{ ml: 1 }}>
                                        <Button component={Link} to={page.route} sx={{ color: 'appDark.text' }}>
                                            {page.name}
                                        </Button>
                                    </Grid>
                                )}

                                <IconButton sx={{ color: 'appDark.icon', ml: 1 }}>
                                    <Brightness6 />
                                </IconButton>

                                <IconButton onClick={onLogout} sx={{ color: 'appDark.icon', ml: 1 }}>
                                    <LogoutOutlined />
                                </IconButton>

                            </Grid>
                        </Grid>
                    }
                </Grid>

            </Toolbar>
        </AppBar>
    )
} 