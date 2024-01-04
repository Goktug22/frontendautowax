import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/sales`; // Adjust the port and path as needed

class SaleService {
    getSales() {
        return axios.get(API_BASE_URL);
    }

    createSale(sale) {
        return axios.post(API_BASE_URL, sale);
    }

    updateSale(id, sale) {
        return axios.put(`${API_BASE_URL}/${id}`, sale);
    }

    deleteSale(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
}

export default new SaleService();
