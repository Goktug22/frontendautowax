import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarService from '../services/CalendarService';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { toast } from "react-toastify";
import 'moment/locale/tr';
moment.locale('tr'); // Set moment to use the Turkish locale

const localizer = momentLocalizer(moment);
const toastSettings = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
};
const messages = {
    allDay: "Tüm gün",
    previous: "Önceki",
    next: "Sonraki",
    today: "Bugün",
    month: "Ay",
    week: "Hafta",
    day: "Gün",
    agenda: "Ajanda",
    date: "Tarih",
    time: "Saat",
    event: "Randevu Açıklama",
};

const showSuccessToast = (message) => {
    toast.success(message, toastSettings);
};

// Call this function to show error message
const showErrorToast = (message) => {
    toast.error(message, toastSettings);
};

const CalendarComponent = () => {
    const [appointments, setAppointments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newAppointment, setNewAppointment] = useState({ dateTime: '', customerName: '', notes: '',numara: '' });
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const handleEventClick = (event) => {
        setSelectedAppointment(event);
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
        
    };

    const handleSendSms = (appointmentId) => {
        CalendarService.updateSmsSent(appointmentId)
            .then(response => {
                // Update the local state to reflect the change
                const updatedAppointments = appointments.map(appointment => 
                    appointment.id === appointmentId ? { ...appointment, smsSent: true } : appointment
                );
                setAppointments(updatedAppointments);
                // Update the selected appointment as well
                if (selectedAppointment && selectedAppointment.id === appointmentId) {
                    setSelectedAppointment({ ...selectedAppointment, smsSent: true });
                }
            })
            .catch(error => console.error("Error sending SMS:", error));
    };
    

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };
    const fetchAppointments = () => {
        CalendarService.getAppointments()
            .then(response => {
                // You might need to adapt this based on the actual structure of your response
                console.log(response.data);
                const events = response.data.map(appointment => {
                    // Assuming the duration of each appointment is fixed (e.g., 1 hour)
                    // Adjust this as per your requirements
                    const start = new Date(appointment.dateTime);
                    const end = new Date(appointment.dateTime);
                    end.setHours(end.getHours() + 1);
    
                    return {
                        ...appointment,
                        title: appointment.customerName, // Optional: Set the title of the event
                        start: start,
                        end: end
                    };
                });
                setAppointments(events);
            })
            .catch(error => console.error("Error fetching appointments:", error));
    };
    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleInputChange = (e) => {
        setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        //e.preventDefault();
        // Adjust this to match the format your backend expects
        const appointmentToCreate = {
            ...newAppointment,
            dateTime: moment(newAppointment.dateTime).utcOffset('+03:00').format()

        };

        CalendarService.createAppointment(appointmentToCreate)
            .then(() => {
                fetchAppointments(); // Fetch updated list
                setNewAppointment({ dateTime: '', customerName: '', notes: '' , numara: ''}); // Reset form
                showSuccessToast( "Randevu Başarıyla Eklendi." )
            })
            .catch(error => console.error("Error creating appointment:", error));
    };

    return (
        <div>

        <br></br>
            <div className='row'>
                <div className='col'>
                    <h1> Randevular </h1>
                    <br></br>
                </div>    
                
            </div>

<Button  onClick={handleDialogOpen} style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black', color: 'white'}}  >
                Randevu Ekle
            </Button>

            <Calendar
                eventPropGetter={(event) => {
                    return {
                        style: {
                            
                            borderRadius: '8px',
                            minHeight: '20px',
                        },
                    };
                }}
                messages={messages}
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600,backgroundColor: 'white', }}
                onSelectEvent={handleEventClick}

                
            />



            <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}  TransitionProps={{ onExited: () => setSelectedAppointment(null) }} >
                <DialogTitle>Randevu Detayları</DialogTitle>
                <DialogContent>
                    {selectedAppointment && (
                        <div>
                            <p>Tarih: {moment(selectedAppointment.start).format('LLLL')}</p>
                            <p>Müşteri İsmi: {selectedAppointment.customerName}</p>
                            <p>Numara: {selectedAppointment.numara}</p>
                            <p>Notlar: {selectedAppointment.notes}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>

                <Button onClick={() => handleSendSms(selectedAppointment.id)} disabled={selectedAppointment && selectedAppointment.smsSent}>
                <i className="fa fa-envelope-o" aria-hidden="true"></i> SMS Gönder    
                </Button>
                    <Button onClick={handleCloseDetailsDialog}>Kapat</Button>
                </DialogActions>

                
            </Dialog>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Yeni Randevu Ekle</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            type="datetime-local"
                            name="dateTime"
                            value={newAppointment.dateTime}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            name="customerName"
                            placeholder="Müşteri İsmi"
                            value={newAppointment.customerName}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="numara"
                            placeholder="Numara"
                            value={newAppointment.numara}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                        />
                        <TextField
                            name="notes"
                            placeholder="Açıklama"
                            value={newAppointment.notes}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>İptal</Button>
                        <Button type="submit" color="primary">Ekle</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CalendarComponent;
