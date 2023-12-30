import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import UcretliOtoparkService from '../services/UcretliOtoparkService';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AracislemService from '../services/AracislemService';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from "react-toastify";
import { darken, lighten,styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';


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

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

  
  
const UcretliOtoparkComponent = () => {
    const [filterAktif, setFilterAktif] = useState(false);
    const [allRows, setAllRows] = useState([]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [currentUcretliOtopark, setCurrentUcretliOtopark] = useState({
        id: null,
        description: '',
        plaka: '',
        fiyat: 0,
        aktif: true,
        isim: '',
        numara: '',
        girisTarih: '',
        cikisTarih: '',
        paid: false
    });

    const columns = [

        { field: 'description', headerName: 'Açıklama', width: 200 },
        { field: 'plaka', headerName: 'Plaka', width: 130 },
        { field: 'fiyat', headerName: 'Fiyat', type: 'number', width: 90 },
       
        { field: 'isim', headerName: 'İsim', width: 130 },
        { field: 'numara', headerName: 'Numara', width: 130 },
        { field: 'girisTarih', headerName: 'Giriş Tarihi', type: 'date', width: 130 ,valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },
        { field: 'cikisTarih', headerName: 'Çıkış Tarihi', type: 'date', width: 130,valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },
        
        { field: 'paid', headerName: 'Ödendi', type: 'boolean', width: 90 },
        {
            field: 'actions',
            headerName: '',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleEditClick(params.row)}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon color="secondary" />
                    </IconButton>
                </div>
            ),
        },
    ];

    const fetchData = async () => {
        try {
            const response = await UcretliOtoparkService.getUcretliOtopark();
            setRows(response.data);
            setAllRows(response.data);
            
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddClick = () => {
        setCurrentUcretliOtopark({
            id: null,
            description: '',
            plaka: '',
            fiyat: 0,
            aktif: true,
            isim: '',
            numara: '',
            girisTarih: '',
            cikisTarih: '',
            paid: false
        });
        setOpen(true);
    };

    const handleEditClick = (ucretliOtopark) => {
        const formattedData = {
            ...ucretliOtopark,
            girisTarih: ucretliOtopark.girisTarih ? formatDateString(ucretliOtopark.girisTarih) : '',
            cikisTarih: ucretliOtopark.cikisTarih ? formatDateString(ucretliOtopark.cikisTarih) : ''
        };
        setCurrentUcretliOtopark(formattedData);
        setOpen(true);
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (currentUcretliOtopark.id) {
            await UcretliOtoparkService.updateUcretliOtopark(currentUcretliOtopark.id, currentUcretliOtopark);
            toast.success('Kayıt Güncellendi', {   position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored", });
        } else {
            await UcretliOtoparkService.createUcretliOtopark(currentUcretliOtopark);
            toast.success('Kayıt Eklendi', {   position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored", });
        }
        fetchData();
        handleClose();
    };

    const handleDelete = async (id) => {
        await UcretliOtoparkService.deleteUcretliOtopark(id);
        fetchData();
        toast.success('Kayıt Silindi', {   position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored", });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUcretliOtopark({ ...currentUcretliOtopark, [name]: value });
    };

    const requestData = () => {
        if (!currentUcretliOtopark.plaka) {
            return;
        }
    
        // Assuming UcretliOtoparkService has a method to get data by plaka
        AracislemService.getLast3AracIslemByPlaka(currentUcretliOtopark.plaka).then((res) => {
            if (res.data.length > 0) {
                setCurrentUcretliOtopark(prevState => ({
                    ...prevState,
                    isim: res.data[0].name || '',  // Set isim, default to empty string
                    numara: res.data[0].numara || ''  // Set numara, default to empty string
                }));
            }
        }).catch(error => {
            console.error('Error fetching data by plaka: ', error);
            // Optionally handle the error
        });
    };

    const isCikisTarihBeforeCurrentDateAndAktif = (cikisTarih, paid) => {
        console.log(cikisTarih);
        console.log(paid);
        if (paid || !cikisTarih) return false;
    
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part to start of the day
    
        const cikisDate = new Date(cikisTarih);
        return cikisDate < today;
    };
    
   const getRowClassName = (params) => {
        if (isCikisTarihBeforeCurrentDateAndAktif(params.row.cikisTarih, params.row.paid)) {
            return 'row-old'; // The CSS class that applies the red background
        }
        return '';
    };
    const applyFilter = (filter) => {
        const filteredData = filter ? allRows.filter(item => !item.paid) : allRows;
        setRows(filteredData);
    };
    


    
    

    return (
        <div>
            <br></br>
            <div className='row'>
                <div className='col'>
                    <h1> Ücretli Otopark </h1>
                    <br></br>
                </div>    
                
            </div>
              <Button startIcon={<AddIcon />}  style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} variant="contained" onClick={handleAddClick}>
                    Ekle
                </Button>

                <Button
                startIcon={<FilterListIcon />}
                variant="contained"
                style={{ marginLeft: '10px', textTransform: 'none', backgroundColor:'#0a0a09', border: '1px solid black' }}
                onClick={() => {
                    const newFilterState = !filterAktif;
                    setFilterAktif(newFilterState);
                    applyFilter(newFilterState);
                }}
                >
                    {filterAktif ? 'Hepsini Göster' : 'Ödenmeyenleri Göster'}
                </Button>

            <Box sx={{ height: 400, width: '100%',backgroundColor: 'white' }}>
              
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                    getRowClassName={getRowClassName}
                />


            </Box>
            <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{currentUcretliOtopark.id ? 'ÜcretliOtopark Düzenle' : 'ÜcretliOtopark Ekle'}</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Açıklama"
            type="text"
            fullWidth
            value={currentUcretliOtopark.description}
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            name="plaka"
            label="Plaka"
            type="text"
            fullWidth
            value={currentUcretliOtopark.plaka}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.value.toUpperCase(), name: e.target.name } })}
            inputProps={{ style: { textTransform: 'uppercase' } }}
            onBlur={requestData}
        />
        <TextField
            margin="dense"
            name="fiyat"
            label="Fiyat"
            type="number"
            fullWidth
            value={currentUcretliOtopark.fiyat}
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            name="isim"
            label="Isim"
            type="text"
            fullWidth
            value={currentUcretliOtopark.isim}
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            name="numara"
            label="Numara"
            type="text"
            fullWidth
            value={currentUcretliOtopark.numara}
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            name="girisTarih"
            label="Giris Tarih"
            type="date"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            value={currentUcretliOtopark.girisTarih}
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            name="cikisTarih"
            label="Cikis Tarih"
            type="date"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            value={currentUcretliOtopark.cikisTarih}
            onChange={handleChange}
        />

        <FormControlLabel
            control={
                <Checkbox
                    checked={currentUcretliOtopark.paid}
                    onChange={(e) => setCurrentUcretliOtopark({ ...currentUcretliOtopark, paid: e.target.checked })}
                    name="paid"
                />
            }
            label="Ödendi"
        />


        {currentUcretliOtopark.id && (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={currentUcretliOtopark.aktif}
                        onChange={(e) => setCurrentUcretliOtopark({ ...currentUcretliOtopark, aktif: e.target.checked })}
                        name="aktif"
                    />
                }
                label="Aktif"
            />
        )}

    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button onClick={handleSave}>Kaydet</Button>
    </DialogActions>
</Dialog>
        </div>
    );
};

export default UcretliOtoparkComponent;
