import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowModes, GridActionsCellItem } from '@mui/x-data-grid';
import HarcamaService from '../services/HarcamaService';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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

const showSuccessToast = (message) => {
    toast.success(message, toastSettings);
};

// Call this function to show error message
const showErrorToast = (message) => {
    toast.error(message, toastSettings);
};

const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

function HarcamaComponent() {
    const [harcamalar, setHarcamalar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newHarcama, setNewHarcama] = useState({ description: '', miktar: '', tarih: '' });
    const [selectionModel, setSelectionModel] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentHarcama, setCurrentHarcama] = useState({ id: null, description: '', miktar: '', tarih: '' });

    const columns = [
        { field: 'description', headerName: 'Açıklama', width: 200, editable: true },
        { field: 'miktar', headerName: 'Miktar', width: 110, editable: true },
        { field: 'tarih', headerName: 'Tarih', width: 160, editable: true , type: 'date',
        valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Kaydet"
                            onClick={() => handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="İptal"
                            onClick={() => handleCancelClick(id)}
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => handleEditClick(id)}
                    />,
                ];
            },
        },
    ];

    const handleEditClick = (id) => {
        const harcamaToEdit = harcamalar.find(h => h.id === id);
        if (harcamaToEdit) {
            // Ensure the date is formatted as YYYY-MM-DD
            const formattedDate = harcamaToEdit.tarih ? new Date(harcamaToEdit.tarih).toISOString().split('T')[0] : '';
    
            setCurrentHarcama({ ...harcamaToEdit, tarih: formattedDate });
            setIsEditMode(true);
            setDialogOpen(true);
        }
    };
    

    const handleAddNewClick = () => {
        setCurrentHarcama({ id: null, description: '', miktar: '', tarih: '' });
        setIsEditMode(false);
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setIsEditMode(false);
    };

    const handleSaveClick = async (id) => {
        const updatedHarcama = harcamalar.find((p) => p.id === id);
        await HarcamaService.updateHarcama(id, updatedHarcama);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };
    

    const processRowUpdate = async (newRow) => {
        try {
            await HarcamaService.updateHarcama(newRow.id, newRow);
            const updatedHarcamalar = harcamalar.map((p) => (p.id === newRow.id ? newRow : p));
            setHarcamalar(updatedHarcamalar);
            return newRow;
        } catch (error) {
            console.error('Error updating harcama: ', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await HarcamaService.getHarcamaList();
                setHarcamalar(response.data);
            } catch (error) {
                console.error('Error fetching harcamalar: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentHarcama({ ...currentHarcama, [name]: value });
    };


    const handleSubmit = async () => {
        if (isEditMode) {
            // Update logic
            try {
                await HarcamaService.updateHarcama(currentHarcama.id, currentHarcama);
                const updatedHarcamalar = harcamalar.map((h) => h.id === currentHarcama.id ? currentHarcama : h);
                setHarcamalar(updatedHarcamalar);
                showSuccessToast('Harcama başarıyla güncellendi');
            } catch (error) {
                console.error('Error updating harcama: ', error);
                showErrorToast('Harcama güncellenirken bir hata oluştu');

            }
        } else {
            // Add new logic
            try {
                const response = await HarcamaService.createHarcama(currentHarcama);
                setHarcamalar([...harcamalar, response.data]);
                showSuccessToast('Harcama başarıyla eklendi');
            } catch (error) {
                console.error('Error adding harcama: ', error);
                showErrorToast('Harcama eklenirken bir hata oluştu');
            }
        }
        handleDialogClose();
    };

    const handleDelete = async () => {
        try {
            await Promise.all(selectionModel.map(id => HarcamaService.deleteHarcama(id)));
            setHarcamalar(harcamalar.filter(p => !selectionModel.includes(p.id)));
            setSelectionModel([]);
            showSuccessToast('Harcama başarıyla silindi.');
        } catch (error) {
            console.error('Error deleting harcama: ', error);
        }
    };

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    };

    return (
        <div className='container'>
             <br></br>
             <div className='row'>
            <div className='col'>
                <h1> Harcama Yönetimi </h1>
                <br></br>
            </div>    
            
            </div>
            <br/>
            <Button startIcon={<AddIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} onClick={handleAddNewClick}>
                Harcama Ekle
            </Button>   
            <Button startIcon={<DeleteIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#f3da89',border: '1px solid black' , color: 'white'}} onClick={handleDelete} disabled={selectionModel.length === 0}>
                Seçilenleri Sil
            </Button>
            <Box sx={{ height: 400, width: '100%',backgroundColor: 'white'  }}>
                <DataGrid
                    rows={harcamalar}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionModelChange}
                    rowSelectionModel={selectionModel}
                    rowModesModel={rowModesModel}
                    onRowEditStop={processRowUpdate}
                    processRowUpdate={processRowUpdate}
                />
            </Box>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{isEditMode ? 'Harcama Düzenle' : 'Yeni Harcama Ekle'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Açıklama"
                        type="text"
                        fullWidth
                        value={currentHarcama.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="miktar"
                        label="Miktar"
                        type="number"
                        fullWidth
                        value={currentHarcama.miktar}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="tarih"
                        label="Tarih"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={currentHarcama.tarih}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>İptal</Button>
                    <Button onClick={handleSubmit}>{isEditMode ? 'Güncelle' : 'Ekle'}</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Yeni Harcama Ekle</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Açıklama"
                        type="text"
                        fullWidth
                        value={newHarcama.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="miktar"
                        label="Miktar"
                        type="number"
                        fullWidth
                        value={newHarcama.miktar}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="tarih"
                        label="Tarih"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newHarcama.tarih}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal</Button>
                    <Button onClick={handleSubmit}>Ekle</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HarcamaComponent;
