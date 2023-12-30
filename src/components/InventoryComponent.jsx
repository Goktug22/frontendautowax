import React, { useState, useEffect } from 'react';
import { DataGrid,GridRow } from '@mui/x-data-grid';
import InventoryService from '../services/InventoryService';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import InventoryChangeLogService from '../services/InventoryChangeLogService';
import DeleteIcon from '@mui/icons-material/Delete';


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
  

const InventoryComponent = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ itemName: '', itemDescription: '', amount: 0 });
    const [updateItem, setUpdateItem] = useState({ id: '', amount: 0, description: '' });
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [openLogs, setOpenLogs] = useState(false);
    const [currentInventoryLogs, setCurrentInventoryLogs] = useState([]);
    const [selectedInventoryId, setSelectedInventoryId] = useState(null);
    const [selectionModel, setSelectionModel] = useState([]);



    useEffect(() => {
          fetchInventory();
    }, []);

    const handleDelete = async () => {
        try {
            // Call your service to delete the selected rows
            await Promise.all(selectionModel.map(id => InventoryService.deleteItem(id)));

            // Update local data state
            setInventory(inventory.filter(item => !selectionModel.includes(item.id)));
            setSelectionModel([]);
        } catch (error) {
            console.error('Error deleting entries: ', error);
        }
    };

    const handleSelectionModelChange = (newSelectionModel) => {
        
        console.log("Selected rows:", newSelectionModel);
        
        setSelectionModel(newSelectionModel);
    };



    const handleOpenLogs = async (id,name) => {
        setSelectedInventoryId(name);
        // Fetch logs for the selected inventory item
        try {
            const response = await InventoryChangeLogService.getInventoryChangeLog(id);
            setCurrentInventoryLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
        setOpenLogs(true);
    };

    const handleCloseLogs = () => {
        setOpenLogs(false);
    };

    const fetchInventory = async () => {
        try {
          setLoading(true);
          const response = await InventoryService.getInventory();
          setInventory(response.data); 
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setLoading(false);
        }
      };

      const handleAddItem = async () => {
        try {
            await InventoryService.createItem( newItem );
            fetchInventory();
            setNewItem({ itemName: '',  amount: 0 }); // Reset form
        } catch (error) {
            console.error('Error adding item:', error);
        }
        handleClose(); // Close the dialog after adding an item
    };

    const handleClickOpenUpdate = (item) =>{ 
        
        setUpdateItem({ id: item.id, amount: item.amount, description: '' }); // Pre-populate data here
        setOpenUpdate(true);
    
    }
    const handleCloseUpdate = () => setOpenUpdate(false);

    const handleUpdateItem = async () => {
        console.log(updateItem);
        try {
            await InventoryService.updateItem( updateItem.id, updateItem.amount, updateItem.description );
            fetchInventory();
            setNewItem({ itemName: '',  amount: 0 }); // Reset form
        } catch (error) {
            console.error('Error adding item:', error);
        }
        handleCloseUpdate(); // Close the dialog after updating an item
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    
    const logColumns = [

        { field: 'changeDate', headerName: 'Değişim Tarihi', type: 'date', width: 200,
        valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : ''    },
        



        { field: 'previousAmount', headerName: 'Önceki Adet', width: 150 },
        { field: 'currentAmount', headerName: 'Sonraki Adet', width: 150 },

        {
            field: 'changeDescription',
            headerName: 'Açıklama',
            width: 250,
            renderCell: (params) => renderScrollableCell(params), 
            
        },
        // Add other fields as needed
    ];

    const columns = [
        { field: 'itemName', headerName: 'İsim', width: 120 },
        { field: 'amount', headerName: 'Adet', type: 'number', width: 100 },
        {
            field: 'actions',
            headerName: '',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"

                        style={{textTransform: 'none',backgroundColor:'#c2ab2b', border: '1px solid black',marginLeft: 16}}
                        onClick={() => handleClickOpenUpdate(params.row)}
                    >
                        Düzenle
                    </Button> 
                );
            },
            width: 120,
        },
        {
            field: 'logs',
            headerName: '',
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleOpenLogs(params.row.id,params.row.itemName)}
                    style={{textTransform: 'none',backgroundColor:'#706b4c', border: '1px solid black'}}
                >
                    Değişimler
                </Button>
            ),

            
            width: 150,

            
        },

       
        
        // Add other columns if needed
    ];

    const CustomRowComponent = (props) => {
        const { id, expanded, ...otherProps } = props;
    
        return (
            <div>
                <GridRow {...otherProps} /> {/* Render the normal row */}
                {expanded && (
                    <Box sx={{ height: 150, backgroundColor: 'lightgrey', padding: 2 }}>
                        {/* Place your expanded content here */}
                        Expanded content for row {id}
                    </Box>
                )}
            </div>
        );
    };
    

    return (
        <div> 

<br></br>
        <div className='row'>
            <div className='col'>
                <h1> Envanter </h1>
                <br></br>
            </div>    
            
        </div>


        <Button startIcon={<AddIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} onClick={handleClickOpen}>
            Ekle 
        </Button>

        <Button startIcon={<DeleteIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#f3da89',border: '1px solid black' , color: 'white'}}  onClick={handleDelete} disabled={selectionModel.length === 0}>
                Seçilenleri Sil
        </Button>
        
        <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
                rows={inventory}
                columns={columns}
                pageSize={100}
                loading={loading}
                pageSizeOptions={ [ 100 ]}
                checkboxSelection
                disableSelectionOnClick
                onRowSelectionModelChange={handleSelectionModelChange}
                rowSelectionModel={selectionModel}
            />
        </Box>
       
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Yeni Kayıt Yarat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="İsim"
                        type="text"
                        fullWidth
                        value={newItem.itemName}
                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                    />
                   
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Adet"
                        type="number"
                        fullWidth
                        value={newItem.amount}
                        onChange={(e) => setNewItem({ ...newItem, amount: parseInt(e.target.value, 10) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        İptal
                    </Button>
                    <Button onClick={handleAddItem} color="primary">
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openUpdate} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Kayıt Düzenle</DialogTitle>
                <DialogContent>
                 
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Yeni Adet"
                        type="number"
                        fullWidth
                        value={updateItem.amount}
                        onChange={(e) => setUpdateItem({ ...updateItem, amount: parseInt(e.target.value, 10) })}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Açıklama"
                        type="text"
                        fullWidth
                        value={updateItem.description}
                        onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate} color="primary">
                        İptal
                    </Button>
                    <Button onClick={handleUpdateItem} color="primary">
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openLogs} onClose={handleCloseLogs} aria-labelledby="logs-dialog-title" fullWidth maxWidth="md">
                <DialogTitle id="logs-dialog-title">Değişimler ({selectedInventoryId})</DialogTitle>
                <DialogContent>
                    <DataGrid

                        rows={currentInventoryLogs}
                        
                        


                        columns={logColumns} 
                        pageSize={5}

                        disableSelectionOnClick
                        disableMultipleRowSelection={true}
                    />
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default InventoryComponent;
