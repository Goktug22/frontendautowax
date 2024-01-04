
import axios from 'axios';
/*

if ( `${localStorage.getItem('jwt')}`  == null ||  `${localStorage.getItem('jwt')}`  == 'null' ){
    delete axios.defaults.headers.common["Authorization"];
    console.log("GLOBAL SET null");    
}
else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;    
    console.log("GLOBAL SET");
}
*/






const ARACISLEM_API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/aracislem`;
const ARACISLEM_API_SMS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/sendsmsaracislembyid`;
const ARACISLEM_API_ARCHIVE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/archivearacislembyid`;
const ARACISLEM_API_BASE_AKTIF_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/aracislemaktif`;
const ARACISLEM_API_LAST_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/aracislemlast3`;




class AracislemService {
    getAracislemler(){

        return axios.get( ARACISLEM_API_BASE_AKTIF_URL );
    }
    getAracislemlerAll(){

        return axios.get( ARACISLEM_API_BASE_URL );
    }

    createAracislem(aracislem){
        return axios.post(ARACISLEM_API_BASE_URL,aracislem);
    }

    getAracislemByPlaka(plaka){

        return axios.get(ARACISLEM_API_BASE_URL + "/" +plaka);
    }
    getLast3AracIslemByPlaka(plaka){
        return axios.get(ARACISLEM_API_LAST_URL + "/" +plaka);
    }
    archiveAracislem(id,aracislem){
        console.log(aracislem);

        return axios.patch(ARACISLEM_API_ARCHIVE_URL+"/"+id,aracislem);
          
    }


    smsAracislem(id){

        return axios.patch(ARACISLEM_API_SMS_URL + "/" +id);
    }
}


export default new AracislemService();

