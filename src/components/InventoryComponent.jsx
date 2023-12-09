import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import InventoryService from '../services/InventoryService';

const InventoryGrid = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
  

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
      
          fetchInventory();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'itemName', headerName: 'Item Name', width: 150 },
        { field: 'itemDescription', headerName: 'Description', width: 200 },
        { field: 'amount', headerName: 'Amount', type: 'number', width: 110 },
        // Add other columns if needed
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={inventory}
                columns={columns}
                pageSize={100}
                loading={loading}
                pageSizeOptions={ [ 100 ]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default InventoryGrid;
