import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import PersonelService from '../services/PersonelService';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function PersonelComponent() {
    const [personel, setPersonel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newPersonel, setNewPersonel] = useState({ name: '' });
    const [selectionModel, setSelectionModel] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
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
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => {
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
            await PersonelService.updatePersonel(newRow.id, newRow);
            const updatedPersonel = personel.map((p) => (p.id === newRow.id ? newRow : p));
            setPersonel(updatedPersonel);
            return newRow;
        } catch (error) {
            console.error('Error updating personel: ', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await PersonelService.getPersonelList();
                setPersonel(response.data);
            } catch (error) {
                console.error('Error fetching personel: ', error);
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
        setNewPersonel({ ...newPersonel, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await PersonelService.createPersonel(newPersonel);
            setPersonel([...personel, response.data]);
            setNewPersonel({ name: '' });
            handleClose();
        } catch (error) {
            console.error('Error adding personel: ', error);
        }
    };

    const handleDelete = async () => {
        try {
            await Promise.all(selectionModel.map(id => PersonelService.deletePersonel(id)));
            setPersonel(personel.filter(p => !selectionModel.includes(p.id)));
            setSelectionModel([]);
        } catch (error) {
            console.error('Error deleting personel: ', error);
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
                <h1> Personel Yönetimi </h1>
                <br></br>
            </div>    
            
        </div>
           
            <Button startIcon={<AddIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} onClick={handleClickOpen}>
                Personel Ekle
            </Button>
            <Button startIcon={<DeleteIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#f3da89',border: '1px solid black' , color: 'white'}} onClick={handleDelete} disabled={selectionModel.length === 0}>
                Seçilenleri Sil
            </Button>
            <Box sx={{ height: 400, width: '100%',backgroundColor: 'white'  }}>
                <DataGrid
                    rows={personel}
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Yeni Personel Ekle</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="İsim"
                        type="text"
                        fullWidth
                        value={newPersonel.name}
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

export default PersonelComponent;
