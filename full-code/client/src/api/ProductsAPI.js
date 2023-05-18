import axios from 'axios';

export const getRunProducts = async () => {
    const response = await axios.get('/api/v1/products/run');
    return response.data;
}

export const getTotalProducts = async () => {
    const response = await axios.get('/api/v1/products/total');
    return response.data;
}

export const addProduct = async (productUrl) => {
    const response = await axios.post('/api/v1/products/add', {
        url: productUrl
    });
    if (response.status !== 200) {
        console.log("Error adding product");
        return false;
    }
    return true;
}

export const resetData = async () => {
    const response = await axios.get('/api/v1/products/reset');
    if (response.status !== 200) {
        console.log("Error resetting data");
        return false;
    }
    return true;
}