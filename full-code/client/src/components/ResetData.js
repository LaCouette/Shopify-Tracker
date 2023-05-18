import * as React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Alert } from '@mui/material';
import { resetData } from '../api/ProductsAPI';

export default function ResetData() {

    // 0 = No alert, 1 = Success, 2 = Error
    const [alert, setAlert] = React.useState(0);

    async function handleClick() {
        let success = await resetData();
        if (success) {
            setAlert(1);
        }
        else {
            setAlert(2);
        }
    }

    return (
        <Box sx={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {alert === 1 && <Alert severity="success">Data has been reset successfully</Alert>}
            {alert === 2 && <Alert severity="error">Error resetting data</Alert>}
            <Typography variant="h4" sx={{ mb: 4 }}>Reset Current Data</Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>Use this button to reset current data. It will be exported to the all data page.</Typography>
            <Button variant="contained" color="primary" sx={{ width: '50%' }} onClick={handleClick}>Reset Data</Button>
        </Box>
    )
}