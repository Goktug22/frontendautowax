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
import IconButton from '@mui/material/IconButton';
import ArchiveIcon from '@mui/icons-material/Archive'; // import the icon you want to use for the button
import FilterListIcon from '@mui/icons-material/FilterList';
import { jsPDF } from 'jspdf';
import PictureAsPdfIcon  from '@mui/icons-material/PictureAsPdf'




const renderScrollableCell = (params) => {
    return (
      <div className="myScrollableCell" style={{ maxHeight: '50px', overflow: 'auto',whiteSpace: 'pre-line',paddingRight: '8px',textAlign: 'left' }}>
        {params.value}
      </div>
    );
  };
  

const LastikOtelComponent = () => {
    const [allRows, setAllRows] = useState([]);
    const [filterAktif, setFilterAktif] = useState(false);
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
        { field: 'otelNo', headerName: 'Otel No', width: 90 },
        { field: 'description', headerName: 'Açıklama', width: 250, renderCell: (params) => renderScrollableCell(params),  },
        { field: 'plaka', headerName: 'Plaka', width: 130 },
        { field: 'fiyat', headerName: 'Fiyat', type: 'number', width: 90 },
        { field: 'aktif', headerName: 'Aktif', type: 'boolean', width: 90 },
        { field: 'isim', headerName: 'Isim', width: 130 },
        { field: 'numara', headerName: 'Numara', width: 130 },
        { field: 'girisTarih', headerName: 'Giris Tarih', type: 'date', width: 130,
        valueGetter: (params) => params.value ? new Date(params.value) : null},

        { field: 'cikisTarih', headerName: 'Cikis Tarih', type: 'date', width: 130,
        valueGetter: (params) => params.value ? new Date(params.value) : null},

        {
            field: 'actions',
            headerName: 'Arşivle',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <IconButton disabled={ !(params.row.aktif) }   onClick={() => handleArchive(params.row.id)}    style={{ 
                    color: 'white', // White icon
                    backgroundColor: 'grey', // Red background
                    margin: '4px', // Optional: for spacing
                }}>
                    <ArchiveIcon />
                    
                </IconButton>
            ),
        },

        {
            field: 'pdf',
            headerName: 'PDF',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => generatePdf(params.row)} className="pdfIconButton" style={{ 
                    color: 'white', // White icon
                    backgroundColor: 'red', // Red background
                    margin: '4px', // Optional: for spacing
                }} >
                    <PictureAsPdfIcon />
                </IconButton>
            ),
        },


    ];
    const applyFilter = (filter) => {
        const filteredData = filter ? allRows.filter(item => item.aktif) : allRows;
        setRows(filteredData);
    };

    const fetchData = async () => {
        try {
            const response = await LastikOtelService.getLastikOtel();
            setAllRows(response.data); // Save the full dataset
            setRows(response.data); // Initially display the full dataset
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleArchive = async (id) => {
        try {
            // Call the PATCH endpoint
            await LastikOtelService.archiveLastikOtel(id);
            fetchData(); // Refresh the data
        } catch (error) {
            console.error('Error archiving data: ', error);
            // Optionally, display an error message to the user
        }
    };

    const generatePdf = (rowData) => {
        const doc = new jsPDF();
    
        // Set a large font size
        doc.setFontSize(72);
    
        // Assuming 'PLAKA' and 'otelNo' are the keys in your rowData
        const plaka = rowData.plaka;
        const otelNo = rowData.otelNo;
    
        // Adjust these values as needed for your layout
        const plakaPositionY = 30; // Y position for PLAKA
        const otelNoPositionY = 60; // Y position for otelNo
    
        // Add PLAKA and otelNo to the PDF
        doc.text(` ${plaka}`, 10, plakaPositionY);
        doc.text(` Otel No: ${otelNo}`, 10, otelNoPositionY);
    
        // Open PDF in new tab
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
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

        <Button 
            startIcon={<FilterListIcon />} 
            variant="contained" 
            style={{ marginLeft: '10px', textTransform: 'none',backgroundColor:'#0a0a09', border: '1px solid black' }} 
            onClick={() => {
                const newFilterState = !filterAktif;
                setFilterAktif(newFilterState);
                applyFilter(newFilterState);
            }}
        >
            {filterAktif ? 'Hepsini Göster' : 'Aktifleri Göster'}
        </Button>

        
            <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>

           
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                loading={loading}                
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
