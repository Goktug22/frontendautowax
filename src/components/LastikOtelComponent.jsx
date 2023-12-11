import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LastikOtelService from '../services/LastikOtelService';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const renderScrollableCell = (params) => {
    return (
      <div className="myScrollableCell" style={{ maxHeight: '50px', overflow: 'auto',whiteSpace: 'pre-line',paddingRight: '8px',textAlign: 'left' }}>
        {params.value}
      </div>
    );
  };
  

const LastikOtelComponent = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newLastikOtel, setNewLastikOtel] = useState({
        description: '',
        plaka: '',
        isim: '',
        numara: '',
        fiyat: 0

    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'description', headerName: 'Description', width: 250, renderCell: (params) => renderScrollableCell(params),  },
        { field: 'plaka', headerName: 'Plaka', width: 130 },
        { field: 'fiyat', headerName: 'Fiyat', type: 'number', width: 90 },
        { field: 'aktif', headerName: 'Aktif', type: 'boolean', width: 90 },
        { field: 'isim', headerName: 'Isim', width: 130 },
        { field: 'numara', headerName: 'Numara', width: 130 },
        { field: 'girisTarih', headerName: 'Giris Tarih', type: 'date', width: 130,
        valueGetter: (params) => params.value ? new Date(params.value) : null},

        { field: 'cikisTarih', headerName: 'Cikis Tarih', type: 'date', width: 130,
        valueGetter: (params) => params.value ? new Date(params.value) : null},

    ];

    const fetchData = async () => {
        try {

            const response = await LastikOtelService.getLastikOtel();
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        

        fetchData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async () => {
        try {
            await LastikOtelService.createLastikOtel(newLastikOtel);
            fetchData();
            setNewLastikOtel({ plaka: '',  fiyat: 0 }); // Reset form
            handleClose();
        } catch (error) {
            console.error('Error adding new data: ', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLastikOtel({ 
            ...newLastikOtel, 
            [name]: name === 'fiyat' ? parseInt(value) || 0 : 
                    name === 'plaka' ? value.toUpperCase() : value 
        });
    };

    return (
<div>
<br></br>
        <div className='row'>
            <div className='col'>
                <h1> Lastik Otel </h1>
                <br></br>
            </div>    
            
        </div>

       <Button startIcon={<AddIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} onClick={handleClickOpen}>
            Ekle 
        </Button>
        
            <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>

           
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                loading={loading}
                checkboxSelection
                disableSelectionOnClick
            />

<Dialog open={open} onClose={handleClose}>
                <DialogTitle>Lastik Otele Yeni Kayıt</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Açıklama"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="plaka"
                        name="plaka"
                        label="Plaka"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        inputProps={{ style: { textTransform: 'uppercase' } }}
                    />
                    <TextField
                        margin="dense"
                        id="isim"
                        name="isim"
                        label="Isim"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="numara"
                        name="numara"
                        label="Numara"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="fiyat"
                        name="fiyat"
                        label="Fiyat"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        

          </Box>

          </div>
    );
};

export default LastikOtelComponent;
