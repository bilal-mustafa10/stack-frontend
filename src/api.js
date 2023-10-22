// create an api call using axios to http://127.0.0.1:5000

// Path: src/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
});

export const generateSmartContract = async (data) => {
    return await api.post('/generate_smart_contract', data);
}
