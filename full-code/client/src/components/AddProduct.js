import * as React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { addProduct } from '../api/ProductsAPI';
import { Alert } from '@mui/material';

export default function AddProduct() {

    const [url, setUrl] = React.useState('');

    // 0 = No alert, 1 = Success, 2 = Error
    const [alert, setAlert] = React.useState(0);

    function handleChange(event) {
        setUrl(event.target.value);
    }

    async function handleClick() {
        let success = await addProduct(url);
        if (success) {
            setAlert(1);
        }
        else {
            setAlert(2);
        }
    }

    return (
        <Box sx={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {alert === 1 && <Alert severity="success">Product added successfully</Alert>}
            {alert === 2 && <Alert severity="error">Error adding product</Alert>}
            <Typography variant="h4" sx={{ mb: 4 }}>Add A Product</Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>Add a Shopify product page URL to add the product to the tracking.</Typography>
            <TextField label="Product Url" variant='outlined' sx={{ width: '100%', mb: 4 }} onChange={handleChange} value={url} />
            <Button variant="contained" color="primary" sx={{ width: '50%' }} onClick={handleClick}>Add Product</Button>
        </Box>
    )
}