
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;  


const INVENTORY_API_BASE_URL = "http://localhost:8081/api/v1/inventory";


class IslemService {
    getInventory(){
        return axios.get(INVENTORY_API_BASE_URL);
    }
    createItem(item){
        return axios.post(INVENTORY_API_BASE_URL,item);
    }
/*
    createIslem(islem){
        return axios.post(ISLEM_API_BASE_URL,islem);
    }
    deleteIslem(id){
        return axios.delete(ISLEM_API_BASE_URL + "/" +id);
    }
    */
    updateItem(id, amount, description ){
        return axios.put   (  (INVENTORY_API_BASE_URL + "/" +id) , null, {

            params: {
                amount: amount,
                description: description
            }
        } );
    }




  
}


export default new IslemService();

