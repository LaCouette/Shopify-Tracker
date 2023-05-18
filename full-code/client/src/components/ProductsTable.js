import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRunProducts, getTotalProducts } from '../api/ProductsAPI';
import { Alert } from '@mui/material';

function cleanColumnName(str) {
    const noUnderscore = str.replace(/_/g, ' ');
    return noUnderscore.charAt(0).toUpperCase() + noUnderscore.slice(1);
}

function cleanDate(str) {
    const date = new Date(Date.parse(str));
    return date.toLocaleDateString();
}

async function getProducts(setRows, setColumns, isRunData) {
    const req = isRunData ? await getRunProducts() : await getTotalProducts();
    if (req.status !== 200) {
        console.log("Error fetching products");
        return false;
    }

    const products = req.data;

    if (products.length === 0) {
        return false;
    }
    const columns = Object.keys(products[0]).map(key => {
        return {
            field: key,
            headerName: cleanColumnName(key),
            editable: true,
            flex: 1,
        }
    });
    setColumns(columns);
    let i = 0;
    const rows = products.map(product => {
        let { started_tracking, ...rest } = product;
        return {
            id: i++,
            started_tracking: cleanDate(started_tracking),
            ...rest,
        }
    });
    setRows(rows);
}

export default function ProductsTable({ isRunData }) {

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        async function update() {
            let res = await getProducts(setRows, setColumns, isRunData);
            if (res === false) {
                setAlert(true);
                setRows([]);
                setColumns([]);
            }
            else {
                setAlert(false);
            }
        }

        update();
    }, [isRunData]);

    return (
        <Box sx={{ height: 800, width: '100%' }}>
            {alert && <Alert severity="error" sx={{ my: 2 }}>No data has been found</Alert>}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[25, 50, 100]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    );
}
