import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button,TextField } from '@mui/material';
import AracislemService from '../services/AracislemService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterAltIcon from '@mui/icons-material/FilterAlt';




function CustomToolbar({ onApplyFilter }) {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
  
    const handleApplyFilter = () => {
      onApplyFilter({ startDate, endDate });
    };
  
    return (
    
      <Box display="flex" alignItems="center" gap={2} sx={ {paddingTop: '15px', paddingBottom: '15px'}} >
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button startIcon={<FilterAltIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} onClick={handleApplyFilter}>
          Filitrele
        </Button>
      </Box>
    );
  }

function AracislemlerComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Adı', width: 200 },
        { field: 'plaka', headerName: 'Plaka', width: 130 },
        { field: 'numara', headerName: 'Numara', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'aktif', headerName: 'Aktif', width: 100, type: 'boolean' },
        { field: 'marka', headerName: 'Marka', width: 130 },
        { field: 'renk', headerName: 'Renk', width: 130 },
        { field: 'islemler', headerName: 'İşlemler', width: 100, type: 'number' },
        { field: 'fiyat', headerName: 'Fiyat', width: 120, type: 'number' },
        { field: 'alinanOdeme', headerName: 'Alınan Ödeme', width: 150, type: 'number' },
        { field: 'smsSent', headerName: 'SMS Gönderildi', width: 150, type: 'boolean' },
        { field: 'odemeYontemi', headerName: 'Ödeme Yöntemi', width: 150 },
        { field: 'girisTarih', headerName: 'Giriş Tarihi', width: 200 , type: 'date',
        valueGetter: (params) => params.value ? new Date(params.value) : null},
        { field: 'cikisTarih', headerName: 'Çıkış Tarihi', width: 200, type: 'date',
        valueGetter: (params) => params.value ? new Date(params.value) : null}
    ];

    useEffect(() => {
        const fetchAracislemler = async () => {
            try {
                setLoading(true);
                const response = await AracislemService.getAracislemlerAll();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAracislemler();
    }, []);


    const handleApplyFilter = (filterValues) => {
        setDateFilter(filterValues);
      };

    const filteredData = data.filter((row) => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
        return true;
    }
    const rowDate = new Date(row.girisTarih);
    return (
        (!dateFilter.startDate || rowDate >= new Date(dateFilter.startDate)) &&
        (!dateFilter.endDate || rowDate <= new Date(dateFilter.endDate))
    );
    });

    // Additional handlers for CRUD operations can be added here

    return (
        
        <div className='container' >
            <CustomToolbar onApplyFilter={handleApplyFilter}  />
            <Box sx={{ height: 600, width: '100%', backgroundColor: 'white' }}>
                <DataGrid
                
                    rows={filteredData}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    checkboxSelection
                    // Additional props as required for editing, selecting, etc.
                />
            </Box>
        </div>



    );
}

export default AracislemlerComponent;
