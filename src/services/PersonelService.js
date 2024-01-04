import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const PERSONEL_API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/personel`; // Adjust the port and endpoint as necessary

class PersonelService {
    getPersonelList() {
        return axios.get(PERSONEL_API_BASE_URL);
    }

    createPersonel(personel) {
        return axios.post(PERSONEL_API_BASE_URL, personel);
    }

    getPersonelById(id) {
        return axios.get(`${PERSONEL_API_BASE_URL}/${id}`);
    }

    updatePersonel(id, personel) {
        return axios.put(`${PERSONEL_API_BASE_URL}/${id}`, personel);
    }

    deletePersonel(id) {
        return axios.delete(`${PERSONEL_API_BASE_URL}/${id}`);
    }
}

export default new PersonelService();
