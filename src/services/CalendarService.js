import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

const APPOINTMENT_API_BASE_URL = "http://localhost:8081/api/v1/appointments";

class CalendarService {
    getAppointments() {
        return axios.get(APPOINTMENT_API_BASE_URL);
    }

    createAppointment(appointment) {
        return axios.post(APPOINTMENT_API_BASE_URL, appointment);
    }

    deleteAppointment(id) {
        return axios.delete(APPOINTMENT_API_BASE_URL + "/" + id);
    }

    updateAppointment(id, appointment) {
        console.log(appointment);
        return axios.put(APPOINTMENT_API_BASE_URL + "/" + id, appointment);
    }

    updateSmsSent(appointmentId) {
        return axios.put(APPOINTMENT_API_BASE_URL + '/' + appointmentId + '/sendSms');
    }
    
}

export default new CalendarService();
