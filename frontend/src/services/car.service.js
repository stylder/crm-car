import config from 'config';
import axios from 'axios';

const baseUrl = `${config.apiUrl}/api`;

export const carService = {
    getAll,
    getById,
    create,
    update,
    remove
};

function getAll() {
    return axios.get(`${baseUrl}/get-cars`)
}

function getById(id) {
    return axios.get(`${baseUrl}/get-car`,  { params: {id} })
}

function create(params) {

    const formData = new FormData();
    const getFormData =  Object.keys(params)
    
    for (let index = 0; index < getFormData.length; index++) {
        const key = getFormData[index];
        if(key == 'image') {
            formData.append(key, params.image[0])
        }else{
            formData.append(key, params[key])
        }
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    return axios.post(`${baseUrl}/add-car`, formData, config)
}

function update(id, params) {

    const formData = new FormData();
    const getFormData =  Object.keys(params)
    formData.append('id', id)

    for (let index = 0; index < getFormData.length; index++) {
        const key = getFormData[index];
        if(key == 'image') {
            const image = params.image[0]
            if(image){
                formData.append(key, image)
            }            
        }else{
            formData.append(key, params[key])
        }
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    return axios.post(`${baseUrl}/edit-car`, formData, config)
}

// prefixed with underscored because delete is a reserved word in javascript
function remove(id) {
    return axios.get(`${baseUrl}/delete-car`,  { params: {id} })
}
