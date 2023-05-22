import { FormHelperText, Grid, Tab, Tabs, Typography } from '@mui/material'
import * as React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleOutlineRounded, HighlightOffRounded } from '@mui/icons-material'

//Datos necesarios para los tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Grid>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

//Fin de cosos para los tabs

export const TestsTabs = ({ tests }) => {
    //Datos para tabs
    const [value, setValue] = React.useState(0);
    const shownTests = tests.shownTests
    const hiddenTests = tests.hiddenTests

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid sx={{ color: 'appDark.text' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    textColor="inherit"
                    sx={{
                        borderBottom: '0',
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#1890ff',
                        },
                    }}
                >
                    {shownTests.map((test, index) => (
                        <Tab
                            key={index}
                            icon={test.passed ? <CheckCircleOutlineRounded color='success' /> : <HighlightOffRounded color='error' />}
                            iconPosition="start"
                            label={"Test " + (index + 1)}
                            {...a11yProps({ index })}
                            sx={{
                                minHeight: '7vh',
                                '&.Mui-selected': {
                                    bgcolor: 'appDark.bgBox',
                                    borderRadius: 1
                                },
                            }}
                        />
                    ))}

                    {tests.error == "" && (
                        <Tab label="Hidden Tests">
                            Hidden Tests
                        </Tab>
                    )}
                </Tabs>

            </Grid>

            <Grid sx={{ height: '25vh', bgcolor: 'appDark.bgBox', borderRadius: 1, color: 'appDark.text' }}>
                {tests.error.length > 0 && (
                    <FormHelperText sx={{ padding: 3, color: 'error.main' }}>{tests.error}</FormHelperText>
                )}
                {shownTests.map((test, index) => (
                    <TabPanel key={index} value={value} index={index}>
                        This tests was expecting "{test.expected}" and got "{test.got}"
                    </TabPanel>
                ))}

                {/* If there's an error don't show hidden tests */}
                {tests.error == "" && (
                    <TabPanel value={value} index={shownTests.length}>
                        <Typography>
                            Failed Tests: {hiddenTests.failed}
                        </Typography>
                        <Typography>
                            Passed Tests: {hiddenTests.passed}
                        </Typography>
                    </TabPanel>
                )}


            </Grid>
        </>
    )
}