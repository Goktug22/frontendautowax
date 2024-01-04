import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const UO_API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/ucretliotopark`;

class UcretliOtoparkService {
    getUcretliOtopark() {
        return axios.get(UO_API_BASE_URL);
    }

    createUcretliOtopark(uo) {
        return axios.post(UO_API_BASE_URL, uo);
    }

    updateUcretliOtopark(id, uo) {
        return axios.put(UO_API_BASE_URL + '/' + id, uo);
    }

    deleteUcretliOtopark(id) {
        return axios.delete(UO_API_BASE_URL + '/' + id);
    }
}

export default new UcretliOtoparkService();
