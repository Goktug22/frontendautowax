
import axios from 'axios';
//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/v1/employees";


class EmployeeService {
    getEmployees(){

        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }
}


export default new EmployeeService();

