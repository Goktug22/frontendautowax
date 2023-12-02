
import axios from 'axios';

const ARACISLEM_API_BASE_URL = "http://localhost:8081/api/v1/aracislem";
const ARACISLEM_API_SMS_URL = "http://localhost:8081/api/v1/sendsmsaracislembyid";
const ARACISLEM_API_ARCHIVE_URL = "http://localhost:8081/api/v1/archivearacislembyid";
const ARACISLEM_API_BASE_AKTIF_URL = "http://localhost:8081/api/v1/aracislemaktif";


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
    archiveAracislem(id,aracislem){
        console.log(aracislem);

        return axios.patch(ARACISLEM_API_ARCHIVE_URL+"/"+id,aracislem);
          
    }


    smsAracislem(id){

        return axios.patch(ARACISLEM_API_SMS_URL + "/" +id);
    }
}


export default new AracislemService();

