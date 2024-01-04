
import axios from 'axios';
if ( `${localStorage.getItem('jwt')}`  == null ||  `${localStorage.getItem('jwt')}`  == 'null' ){
    delete axios.defaults.headers.common["Authorization"];
    console.log("GLOBAL SET null");    
}
else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;    
    console.log("GLOBAL SET");
}

const EMPLOYEE_API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/employees`;


class EmployeeService {
    getEmployees(){

        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }
}


export default new EmployeeService();

