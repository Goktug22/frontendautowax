
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;  


const LO_API_BASE_URL = "http://localhost:8081/api/v1/lastikotel";
const LOAKTIF_API_BASE_URL = "http://localhost:8081/api/v1/lastikotelaktif";


class LastikOtelService {
    getLastikOtel(){
        return axios.get(LO_API_BASE_URL);
    }
    getLastikOtelAktif(){
        return axios.get(LOAKTIF_API_BASE_URL);
    }

    createLastikOtel(lo){
        return axios.post(LO_API_BASE_URL,lo);
    }
    deleteLastikOtel(id){
        return axios.delete(LO_API_BASE_URL + "/" +id);
    }
    archiveLastikOtel(id ){
        return axios.patch(LO_API_BASE_URL + "/" +id);
    }


  
}


export default new LastikOtelService();

