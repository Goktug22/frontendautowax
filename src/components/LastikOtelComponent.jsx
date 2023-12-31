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
import IconButton from '@mui/material/IconButton';
import ArchiveIcon from '@mui/icons-material/Archive'; // import the icon you want to use for the button
import FilterListIcon from '@mui/icons-material/FilterList';
import { jsPDF } from 'jspdf';
import PictureAsPdfIcon  from '@mui/icons-material/PictureAsPdf';
import AracislemService from '../services/AracislemService';
import { darken, lighten,styled } from '@mui/material/styles';
import { toast } from 'react-toastify';




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

const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
const renderScrollableCell = (params) => {
    return (
      <div className="myScrollableCell" style={{ maxHeight: '50px', overflow: 'auto',whiteSpace: 'pre-line',paddingRight: '8px',textAlign: 'left' }}>
        {params.value}
      </div>
    );
  };

const getBackgroundColor = (color, mode) => 
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .row-old': {
    backgroundColor: getBackgroundColor('rgb(173, 55, 55)', theme.palette.mode),
    '&:hover': {
      backgroundColor: getBackgroundColor('rgb(300, 2, 2)', theme.palette.mode),
    },
    '&.Mui-selected': {
      backgroundColor: getBackgroundColor('rgb(1, 1, 100)', theme.palette.mode),
      '&:hover': {
        backgroundColor: getBackgroundColor('rgb(1, 1, 100)', theme.palette.mode),
      },
    },
  },
  // ... add other row styles if needed
}));
  

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
        valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },

        { field: 'cikisTarih', headerName: 'Cikis Tarih', type: 'date', width: 130,
        valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },

        {
            field: 'actions',
            headerName: 'Arşivle',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                // Only render the button if the row is active
                if (params.row.aktif) {
                    return (
                        <IconButton onClick={() => handleArchive(params.row.id)} style={{ 
                                color: 'white', // White icon
                                backgroundColor: 'grey', // Grey background
                                margin: '4px', // Optional: for spacing
                            }}>
                            <ArchiveIcon />
                        </IconButton>
                    );
                }
        
                // Return null or an empty element if the row is not active
                return null;
            },
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


    const isOlderThanSixMonths = (girisTarih, cikisTarih) => {
        if (!girisTarih) return false;
    
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
        const girisDate = new Date(girisTarih);
        return girisDate < sixMonthsAgo && !cikisTarih;
    };

    useEffect(() => {
        const applyFilter = () => {
            const filteredData = filterAktif ? allRows.filter(item => item.aktif) : allRows;
            setRows(filteredData);
        };
        applyFilter();
    }, [filterAktif, allRows]);
   

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
            setNewLastikOtel({ description: '', plaka: '', isim: '', numara: '', fiyat: 0 }); // Reset form
            handleClose();
            toast.success('Kayıt başarıyla eklendi.', toastSettings);
        } catch (error) {
            console.error('Error adding new data: ', error);
            toast.error('Kayıt eklerken bir hata oluştu.', toastSettings);
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


    const requestData = event => {
        if (newLastikOtel.plaka === "") {
            return;
        }
    
        AracislemService.getLast3AracIslemByPlaka(newLastikOtel.plaka).then((res) => {
            if (res.data.length > 0) {
                setNewLastikOtel(prevState => ({
                    ...prevState,  // Keep the existing state
                    isim: res.data[0].name || '',  // Set isim, default to empty string
                    numara: res.data[0].numara || ''  // Set numara, default to empty string
                }));
            }
        });
    }
    
    

    const handleArchive = async (id) => {
        try {
            // Call the PATCH endpoint
            await LastikOtelService.archiveLastikOtel(id);
            fetchData(); // Refresh the data
            toast.success('Kayıt Başarıyla Arşivlendi.', toastSettings);
        } catch (error) {
            console.error('Error archiving data: ', error);
            toast.error('Kayıt Arşivlenirken Bir Hata Oluştu.', toastSettings);
        }
    };

    const generatePdf = (rowData) => {
        const doc = new jsPDF();
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        // Define the positions for the four sections
        const positions = [
            { x: pageWidth / 2, y: pageHeight / 4-30 },
            { x: pageWidth / 2, y: pageHeight / 2-30 },
            { x: pageWidth / 2, y: (pageHeight * 3) / 4 -30 },
            { x: pageWidth / 2, y: pageHeight-30 }
        ];
    
        // Set a smaller font size for better fit
        doc.setFontSize(48);
        doc.setFont('helvetica', 'bold');
        // Loop through each position and print the text
        positions.forEach((pos) => {
            doc.text(`${rowData.plaka}`, pos.x, pos.y - 20, { align: 'center' });
            doc.text(`-${rowData.otelNo}-`, pos.x, pos.y, { align: 'center' });
        });
    
        // Open PDF in new tab
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    };
    


    const getRowClassName = (params) => {
        if (isOlderThanSixMonths(params.row.girisTarih, params.row.cikisTarih)) {
            return 'row-old';
        }
        // Add more conditions as needed
        return '';
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
                setFilterAktif(!filterAktif);

            }}
        >
            {filterAktif ? 'Hepsini Göster' : 'Aktifleri Göster'}
        </Button>

        
            <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>

           
            <StyledDataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                loading={loading}                
                disableSelectionOnClick
                getRowClassName={getRowClassName}
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
                        onBlur={requestData}
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
                        value={newLastikOtel.isim}
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
                        value={newLastikOtel.numara}
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
                    <Button onClick={handleClose}>İptal</Button>
                    <Button onClick={handleAdd}>Ekle</Button>
                </DialogActions>
            </Dialog>
        

          </Box>

          </div>
    );
};

export default LastikOtelComponent;
