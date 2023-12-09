
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;  


const INVENTORYCHANGELOG_API_BASE_URL = "http://localhost:8081/api/v1/inventorychangelog";


class IslemService {


    getInventoryChangeLog(id){
        return axios.get(INVENTORYCHANGELOG_API_BASE_URL + "/" +id);
    }




  
}


export default new IslemService();

