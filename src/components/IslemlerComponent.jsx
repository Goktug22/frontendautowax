import Box from '@mui/material/Box';
import { DataGrid, GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons } from '@mui/x-data-grid';
import IslemService from '../services/IslemService';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
  } from '@mui/x-data-grid-generator';


  const roles = ['Market', 'Finance', 'Development'];
  const randomRole = () => {
    return randomArrayItem(roles);
  };
  
  const initialRows = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
  ];

 function IslemlerComponent() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'İşlem',
          width: 150,
          editable: true,
          
        },
        {
          field: 'fiyat',
          headerName: 'Fiyat',
          width: 150,
          editable: true,

          renderEditCell: (params) => (
            <TextField
              type="number"
              fullWidth
              value={params.value || ''}
              onChange={(event) => {
                const value = event.target.value;
                // Update the value only if it's a number or empty (to allow backspace)
                if (!value || /^\d*\.?\d*$/.test(value)) {
                  params.api.setEditCellValue({ id: params.id, field: params.field, value: value }, event);
                }
              }}
              inputProps={{ min: 0 }} // Optional: if you want to allow only non-negative numbers
            />
          ),
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Düzenle',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }
      
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />
            
            ];
          },
        },
       
      ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false); // For controlling the modal
    const [newEntry, setNewEntry] = useState({ name: '', fiyat: '' });
    const [selectionModel, setSelectionModel] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows, setRows] = React.useState(initialRows);
    


    /*
    Gok2
    */


    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      };
    
      const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
    
      const handleSaveClick = (id) => () => {
        
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
      };
    
      const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
      };
    
      const handleCancelClick = (id) => () => {
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = data.find((row) => row.id === id);
        
      };

      const processRowUpdate = async (newRow) => {
        try {

            console.log(newRow);
            // Update the backend
            await IslemService.updateIslem(newRow.id, newRow);
    
            // Update the local state
            const updatedData = data.map((row) => row.id === newRow.id ? newRow : row);
            setData(updatedData);
            
            setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } });
    
            return newRow;
        } catch (error) {
            console.error('Error updating entry: ', error);
            // Handle the error appropriately
            throw error;
        }
    };


       /*
        Gok2
    */



    useEffect(() => {
    
        const fetchData = async () => {
            try {
              setLoading(true);
              const response = await IslemService.getIslemler();
              setData(response.data); 
            } catch (error) {
              console.error('Error fetching data: ', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
      }, []);



      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
      };
    
      const handleSubmit = async () => {
        try {
          const response = await IslemService.createIslem(newEntry);
          setData([...data, response.data]);
          setNewEntry({ name: '', fiyat: '' });
          handleClose();
        } catch (error) {
          console.error('Error adding entry: ', error);
        }
      };

      const handleDelete = async () => {
        try {
            // Call your service to delete the selected rows
            await Promise.all(selectionModel.map(id => IslemService.deleteIslem(id)));

            // Update local data state
            setData(data.filter(item => !selectionModel.includes(item.id)));
            setSelectionModel([]);
        } catch (error) {
            console.error('Error deleting entries: ', error);
        }
    };

    const handleSelectionModelChange = (newSelectionModel) => {
        
        console.log("Selected rows:", newSelectionModel);
        
        setSelectionModel(newSelectionModel);
    };

    const handleEditCellCommit = async (params) => {
        try {

            alert();


            
            const updatedRow = { ...params.row, [params.field]: params.value };
            console.log(updatedRow);
            return;
            await IslemService.updateIslem(updatedRow.id, updatedRow); // Assuming this is your PUT API call
    
            const updatedData = data.map((row) => {
                if (row.id === params.id) {
                    return { ...row, [params.field]: params.value };
                }
                return row;
            });
    
            setData(updatedData);
        } catch (error) {
            console.error('Error updating entry: ', error);
            // Optionally, handle error state here (e.g., show a notification)
        }
    };

    /*
    const processRowUpdate = async (newRow) => {
        try {
            // Send the update to the backend
            const response = await IslemService.updateIslem(newRow.id, newRow);
    
            // Update the local state
            const updatedData = data.map((row) => {
                if (row.id === newRow.id) {
                    // This assumes the response contains the updated row
                    return { ...response.data };
                }
                return row;
            });
    
            setData(updatedData);
            return newRow;
        } catch (error) {
            console.error('Error updating entry: ', error);
            // Handle the error appropriately
            // Optionally, you could throw an error here to prevent the grid from updating
            throw error;
        }
    };
    */
    
     


    return (

    <div className='container'> 
        <br></br>
        <div className='row'>
            <div className='col'>
                <h1> İşlemler </h1>
                <br></br>
            </div>    
            
        </div>
        <div className='row'> 
            <div className='col'>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Yeni İşlem Ekle 
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} disabled={selectionModel.length === 0}>
                Seçilenleri Sil
        </Button>
        <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
            rows={data}
            columns={columns}
            pageSize={100}
            loading={loading}
            pageSizeOptions={ [ 100 ]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionModelChange}
            rowSelectionModel={selectionModel}
            rowModesModel={rowModesModel}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
         
          
      
            
            />
        </Box>

            </div>
        </div>



       

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> <b>Yeni İşlem Ekle </b> </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="İşlem"
            type="text"
            fullWidth
            variant="standard"
            value={newEntry.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="fiyat"
            label="Fiyat"
            type="number"
            fullWidth
            variant="standard"
            value={newEntry.fiyat}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>



    </div>

    );

  
}


export default IslemlerComponent;
