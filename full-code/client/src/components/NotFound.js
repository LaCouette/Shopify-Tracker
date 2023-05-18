import * as React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function NotFound() {
    return (
        <Box sx={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Error 404</Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>This page does not exist. Click the button below to return to home page.</Typography>
            <Button variant="contained" color="primary" sx={{ width: '50%' }} component={Link} to="/">Return to Home Page</Button>
        </Box>
    )
}