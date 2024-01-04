
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;  

const ISLEM_API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/islem`;


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

