
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const ISLEM_API_BASE_URL = "http://localhost:8081/api/v1/islem";


class IslemService {
    getIslemler(){
        
        let token =  `Bearer ${localStorage.getItem('jwt')}`;
        console.log(token);
        return axios.get(ISLEM_API_BASE_URL,  {
            headers: {
              'Authorization': token 
            }
          } );
        
        
        
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

