import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SaleService from '../services/SaleService';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from "react-toastify";
import FilterListIcon from '@mui/icons-material/FilterList';


const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

const SaleComponent = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [currentSale, setCurrentSale] = useState({
        id: null,
        description: '',
        priceBought: 0,
        priceSold: 0,
        paid: false,
        name: '',
        number: '',
        createDate: ''
    });
    const [filterUnpaid, setFilterUnpaid] = useState(false);
    const [allSales, setAllSales] = useState([]);

    const columns = [
        { field: 'description', headerName: 'Açıklama', width: 200 },
        { field: 'priceBought', headerName: 'Alış Fiyatı', type: 'number', width: 130 },
        { field: 'priceSold', headerName: 'Satış Fiyatı', type: 'number', width: 130 },
        { field: 'paid', headerName: 'Ödendi', type: 'boolean', width: 90 },
        { field: 'name', headerName: 'Adı', width: 150 },
        { field: 'number', headerName: 'Numara', width: 150 },
        { field: 'createDate', headerName: 'Oluşturulma Tarihi', type: 'date', width: 180, valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : ''  },
        {
            field: 'actions',
            headerName: 'İşlemler',
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
    

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const applyUnpaidFilter = () => {
            const filteredData = filterUnpaid ?  allSales.filter(sale => !sale.paid) : allSales;
            setSales(filteredData);
        };
        applyUnpaidFilter();
    }, [filterUnpaid, allSales]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await SaleService.getSales();
            setSales(response.data);
            setAllSales(response.data); // Store all sales data
        } catch (error) {
            console.error('Error', error);
            toast.error('Veri Çekerken Hata');
        } finally {
            setLoading(false);
        }
    };

   

    const handleAddClick = () => {
        setCurrentSale({
            id: null,
            description: '',
            priceBought: 0,
            priceSold: 0,
            paid: false,
            name: '',
            number: '',
            createDate: ''
        });
        setOpen(true);
    };

    const handleEditClick = (sale) => {
        setCurrentSale({ ...sale });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (currentSale.id) {
                await SaleService.updateSale(currentSale.id, currentSale);
                toast.success('Satış başarıyla güncellendi', toastSettings);
            } else {
                const newSale = {
                    ...currentSale,
                    createDate: new Date() // Set the current date
                };
                await SaleService.createSale(newSale);
                toast.success('Satış başarıyla eklendi', toastSettings);
            }
            fetchData();
        } catch (error) {
            console.error('Error saving sale: ', error);
            toast.error('Satış kaydedilirken hata oluştu', toastSettings);
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await SaleService.deleteSale(id);
            toast.success('Satış başarıyla silindi', toastSettings);
            fetchData();
        } catch (error) {
            console.error('Error deleting sale: ', error);
            toast.error('Satış silinirken hata oluştu', toastSettings);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSale({ ...currentSale, [name]: value });
    };

    return (
        <div >

            <br></br>
            <div className='row'>
                <div className='col'>
                    <h1> Satışlar </h1>
                    <br></br>
                </div>    
                
            </div>
            <Button startIcon={<AddIcon />} onClick={handleAddClick} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} >
                Ekle
            </Button>

            <Button
                startIcon={<FilterListIcon />}
                variant="contained"
                onClick={() => setFilterUnpaid(!filterUnpaid)}
                style={{ marginLeft: '10px', textTransform: 'none', backgroundColor:'#0a0a09', border: '1px solid black' }}
            >
                {filterUnpaid ? 'Hepsini Göster' : 'Ödenmeyenleri Göster'}
            </Button>

            <Box sx={{ height: 400, width: '100%', mt: 2,backgroundColor: 'white'  }}>
                <DataGrid
                    rows={sales}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                />
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{currentSale.id ? 'Satış Düzenle' : 'Satış Ekle'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Açıklama"
                        type="text"
                        fullWidth
                        value={currentSale.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="priceBought"
                        label="Alınan Fiyat"
                        type="number"
                        fullWidth
                        value={currentSale.priceBought}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="priceSold"
                        label="Satılan Fiyat"
                        type="number"
                        fullWidth
                        value={currentSale.priceSold}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="name"
                        label="İsim"
                        type="text"
                        fullWidth
                        value={currentSale.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="number"
                        label="Numara"
                        type="text"
                        fullWidth
                        value={currentSale.number}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentSale.paid || false}
                                onChange={(e) => setCurrentSale({ ...currentSale, paid: e.target.checked })}
                                name="paid"
                            />
                        }
                        label="Ödendi"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">İptal</Button>
                    <Button onClick={handleSave} color="primary">Kaydet</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SaleComponent;
