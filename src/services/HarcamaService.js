import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const HARCAMA_API_BASE_URL = "http://localhost:8081/api/v1/harcama"; // Adjust as necessary

class HarcamaService {
    getHarcamaList() {
        return axios.get(HARCAMA_API_BASE_URL);
    }

    createHarcama(harcama) {
        return axios.post(HARCAMA_API_BASE_URL, harcama);
    }

    getHarcamaById(id) {
        return axios.get(`${HARCAMA_API_BASE_URL}/${id}`);
    }

    updateHarcama(id, harcama) {
        return axios.put(`${HARCAMA_API_BASE_URL}/${id}`, harcama);
    }

    deleteHarcama(id) {
        return axios.delete(`${HARCAMA_API_BASE_URL}/${id}`);
    }
    getBetweenDates(startDate, endDate) {
        return axios.get(`${HARCAMA_API_BASE_URL}/byDateRange`,
        {
            params: { startDate, endDate }
        }
        );
    }
}

export default new HarcamaService();
