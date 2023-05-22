import { Card, CardContent, CardActionArea, Typography, Grid } from '@mui/material'
import * as React from 'react';

export const CoursesCard = ({ group, index, modules}) => {
    const colors = ["#C12C45", "#5EC1F3", "#55D16E", "#FACD34"]
    const color = index - (colors.length * parseInt(index / colors.length));

    return (
        <Grid>
            <Card sx={{
                width: 300,
                backgroundColor: 'secondary.main',
                borderRadius: '12px',
                boxShadow: '5px 5px 0px 5px rgba(0, 0, 0, 0.1)',
                ':hover': { backgroundColor: 'secondary.main', opacity: 0.8 } }}
            >
                <CardActionArea href={modules+"/"+group.id_group}>
                    <Grid sx={{ backgroundColor: `${colors[color]}`, height: 40 }} />
                    <CardContent sx={{ pt: 4, pb: 6 }}>
                        <Typography xs={6} sx={{ color: 'appDark.text', fontSize: 22, fontWeight: 405 }} >
                            {group.id_course}. {group.course_name}
                        </Typography>
                        <Typography xs={6} sx={{ color: 'appDark.text', fontSize: 15, fontWeight: 405 }} >
                            ({group.id_group})
                        </Typography>
                        <Typography sx={{ color: 'appDark.text', fontSize: 13, fontWeight: 405 }}>
                            {group.start_date.substring(0,10)} a {group.end_date.substring(0,10)}
                        </Typography>
                        <Typography sx={{ color: 'appDark.text', fontSize: 13, fontWeight: 405 }}>
                            {group.first_name} {group.flast_name} {group.slast_name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}