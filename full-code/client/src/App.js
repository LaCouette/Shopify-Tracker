// Import react
import React from 'react';
import ProductsTable from './components/ProductsTable';
import NavBar from './components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { CssBaseline } from '@mui/material';
import ProductForm from './components/AddProduct';
import { Outlet } from 'react-router';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});


const App = () => {
    return (
        <ThemeProvider theme={darkTheme} >
            <CssBaseline />
            <Container maxWidth="lg">
                <NavBar />
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}

export default App;