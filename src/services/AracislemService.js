
import axios from 'axios';

const ARACISLEM_API_BASE_URL = "http://192.168.1.113:8081/api/v1/aracislem";
const ARACISLEM_API_SMS_URL = "http://192.168.1.113:8081/api/v1/sendsmsaracislembyid";
const ARACISLEM_API_ARCHIVE_URL = "http://192.168.1.113:8081/api/v1/archivearacislembyid";
const ARACISLEM_API_BASE_AKTIF_URL = "http://192.168.1.113:8081/api/v1/aracislemaktif";


class AracislemService {
    getAracislemler(){

        return axios.get( ARACISLEM_API_BASE_AKTIF_URL );
    }

    createAracislem(aracislem){
        return axios.post(ARACISLEM_API_BASE_URL,aracislem);
    }

    getAracislemByPlaka(plaka){

        return axios.get(ARACISLEM_API_BASE_URL + "/" +plaka);
    }
    archiveAracislem(id,odemeYontemi,alinanOdeme){

        const url = `${ARACISLEM_API_ARCHIVE_URL}/${id}?odemeYontemi=${odemeYontemi}&alinanOdeme=${alinanOdeme}`;
        return axios.patch(url);
          
    }


    smsAracislem(id){

        return axios.patch(ARACISLEM_API_SMS_URL + "/" +id);
    }
}


export default new AracislemService();

