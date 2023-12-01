
import axios from 'axios';

const ISLEM_API_BASE_URL = "http://192.168.1.113:8081/api/v1/islem";


class IslemService {
    getIslemler(){

        return axios.get(ISLEM_API_BASE_URL);
    }

    createIslem(islem){
        return axios.post(ISLEM_API_BASE_URL,islem);
    }
    deleteIslem(id){
        return axios.delete(ISLEM_API_BASE_URL + "/" +id);
    }
    updateIslem(id, islem ){
        console.log(islem);
        return axios.put   (  (ISLEM_API_BASE_URL + "/" +id) , islem );
    }




  
}


export default new IslemService();

