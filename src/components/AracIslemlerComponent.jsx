import React, { useState, useEffect , useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button,TextField } from '@mui/material';
import AracislemService from '../services/AracislemService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IslemService from '../services/IslemService';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


function getCarBrandLabel(value) {
  switch (value) {
    case 'acura':
      return 'Acura';
    case 'alfa-romeo':
      return 'Alfa Romeo';
    case 'aston-martin':
      return 'Aston Martin';
    case 'audi':
      return 'Audi';
    case 'bentley':
      return 'Bentley';
    case 'bmw':
      return 'BMW';
    case 'bugatti':
      return 'Bugatti';
    case 'buick':
      return 'Buick';
    case 'cadillac':
      return 'Cadillac';
    case 'chevrolet':
      return 'Chevrolet';
    case 'chrysler':
      return 'Chrysler';
    case 'citroen':
      return 'Citroën';
    case 'cupra':
      return 'Cupra';
    case 'dacia':
      return 'Dacia';
    case 'daewoo':
      return 'Daewoo';
    case 'daihatsu':
      return 'Daihatsu';
    case 'dodge':
      return 'Dodge';
    case 'ferrari':
      return 'Ferrari';
    case 'fiat':
      return 'Fiat';
    case 'ford':
      return 'Ford';
    case 'genesis':
      return 'Genesis';
    case 'gmc':
      return 'GMC';
    case 'honda':
      return 'Honda';
    case 'hummer':
      return 'Hummer';
    case 'hyundai':
      return 'Hyundai';
    case 'infiniti':
      return 'Infiniti';
    case 'isuzu':
      return 'Isuzu';
    case 'jaguar':
      return 'Jaguar';
    case 'jeep':
      return 'Jeep';
    case 'kia':
      return 'Kia';
    case 'koenigsegg':
      return 'Koenigsegg';
    case 'lamborghini':
      return 'Lamborghini';
    case 'lancia':
      return 'Lancia';
    case 'land-rover':
      return 'Land Rover';
    case 'lexus':
      return 'Lexus';
    case 'lincoln':
      return 'Lincoln';
    case 'lotus':
      return 'Lotus';
    case 'maserati':
      return 'Maserati';
    case 'mazda':
      return 'Mazda';
    case 'mclaren':
      return 'McLaren';
    case 'mercedes':
      return 'Mercedes-Benz';
    case 'mini':
      return 'Mini';
    case 'mitsubishi':
      return 'Mitsubishi';
    case 'nissan':
      return 'Nissan';
    case 'opel':
      return 'Opel';
    case 'pagani':
      return 'Pagani';
    case 'peugeot':
      return 'Peugeot';
    case 'pontiac':
      return 'Pontiac';
    case 'porsche':
      return 'Porsche';
    case 'ram':
      return 'RAM';
    case 'renault':
      return 'Renault';
    case 'rolls-royce':
      return 'Rolls-Royce';
    case 'saab':
      return 'Saab';
    case 'saturn':
      return 'Saturn';
    case 'scion':
      return 'Scion';
    case 'seat':
      return 'SEAT';
    case 'skoda':
      return 'Škoda';
    case 'smart':
      return 'Smart';
    case 'subaru':
      return 'Subaru';
    case 'suzuki':
      return 'Suzuki';
    case 'tesla':
      return 'Tesla';
    case 'toyota':
      return 'Toyota';
    case 'volkswagen':
      return 'Volkswagen';
    case 'volvo':
      return 'Volvo';
    default:
      return value;
  }
}


function renderSwitch(param) {
  switch(param) {
      case 'black':
          return 'Siyah';
      case 'white':
          return 'Beyaz'; 
      case 'darkgrey':
          return 'Füme';
      case 'gray':
          return 'Gri';
      case 'red':
          return 'Kırmızı';
      case 'blue':
          return 'Mavi'; 
      case 'orange':
          return 'Turuncu';
      case 'green':
          return 'Yeşil';
      case 'pink':
          return 'Pembe';
      default:
          return param;
  }
}

function paymentSwitch(param) {
  switch(param) {
      case 1:
        return 'EFT';
      case 2:
        return 'Nakit';
      case 3:
        return 'Kredi Kartı';
      
      default:
          return param;
  }
}


function CustomToolbar({ onApplyFilter, islemler } ) {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [selectedIslemler, setSelectedIslemler] = useState([]);


    
    const handleApplyFilter = () => {
      onApplyFilter({ startDate, endDate },selectedIslemler );
    };

    const handleChangeSelectedIslemler = (event) => {
      setSelectedIslemler(event.target.value);
      
    };

    
  
    return (
    
      <Box display="flex" alignItems="center" gap={2} sx={ {paddingTop: '15px', paddingBottom: '15px'}} >
        <DatePicker
          label="Başlangıç Tarihi"
          value={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Bitiş Tarihi"
          value={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} />}
        />

        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel    >İşlemler</InputLabel>
          <Select
              label="İşlemler"
              multiple
              value={selectedIslemler}
              onChange={handleChangeSelectedIslemler}
              renderValue={(selected) => selected.map(id => islemler.find(islem => islem.id === id).name).join(', ')} 
              
          >
              {islemler.map((islem) => (
                  <MenuItem key={islem.id} value={islem.id}>
                      <Checkbox checked={selectedIslemler.indexOf(islem.id) > -1} />
                      <ListItemText primary={islem.name} />
                  </MenuItem>
              ))}
          </Select>
        </FormControl>


        <Button startIcon={<FilterAltIcon />} variant="contained" style={{textTransform: 'none',backgroundColor:'#85857f', border: '1px solid black'}} onClick={handleApplyFilter}>
          Filitrele
        </Button>
      </Box>
    );
  }

function AracislemlerComponent() {

    const [selectedIslemler, setSelectedIslemler] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });
    const [islemler, setIslemlerData] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [eftSum, setEftSum] = useState(0);
    const [nakitSum, setNakitSum] = useState(0);
    const [kartSum, setKartSum] = useState(0);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Adı', width: 200 },
        { field: 'plaka', headerName: 'Plaka', width: 130 },
        { field: 'numara', headerName: 'Numara', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'aktif', headerName: 'Aktif', width: 100, type: 'boolean' },
        { field: 'marka', headerName: 'Marka', width: 130 , renderCell: (params) => getCarBrandLabel(params.value)},
        { field: 'renk', headerName: 'Renk', width: 130, renderCell: (params) => renderSwitch(params.value) },
        { field: 'islemler', headerName: 'İşlemler', width: 160, type: 'number', renderCell: (params) => renderScrollableCell({ value: getIslemNames(params.value) }), },
        { field: 'fiyat', headerName: 'Fiyat', width: 120, type: 'number',renderCell: (params) => params.value != null ? `${params.value} ₺` : '' },
        { field: 'alinanOdeme', headerName: 'Alınan Ödeme', width: 150, type: 'number' ,renderCell: (params) => params.value != null ? `${params.value} ₺` : '' },
        { field: 'smsSent', headerName: 'SMS Gönderildi', width: 150, type: 'boolean' },
        { field: 'odemeYontemi', headerName: 'Ödeme Yöntemi', width: 150, renderCell: (params) => paymentSwitch(params.value) },
        { field: 'girisTarih', headerName: 'Giriş Tarihi', width: 200 , type: 'date',
        valueGetter: (params) => params.value ? new Date(params.value) : null},
        { field: 'cikisTarih', headerName: 'Çıkış Tarihi', width: 200, type: 'date',
        valueGetter: (params) => params.value ? new Date(params.value) : null}
    ];


 

  // Function to check if a row matches the selected islemler
  const isRowMatched = (row) => {
      
      if (selectedIslemler.length === 0) return true; // No filter applied
      return selectedIslemler.every(id => (row.islemler & id) > 0);
  };

  

    

  function getIslemNames(param) {
    let returnText = '';
    for (let i = 0; i < islemler.length; i++) {
      if ((islemler[i].id & param) > 0) {
        returnText += (returnText ? '\n' : '') + islemler[i].name; // Add '\n' for new lines
      }
    }
    return returnText;
  }

 

  const renderScrollableCell = (params) => {
    return (
      <div className="myScrollableCell" style={{ maxHeight: '50px', overflow: 'auto',whiteSpace: 'pre-line',paddingRight: '8px',textAlign: 'right' }}>
        {params.value}
      </div>
    );
  };
  

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

        const fetchIslemler = async () => {
          try {
            const response = await IslemService.getIslemler();
            setIslemlerData(response.data); 
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching data: ', error);
          } finally {
            
          }
        };
    
        fetchIslemler();
    }, []);

      


    const handleApplyFilter = (filterValues,selectedIslemler) => {
        setDateFilter(filterValues);
        setSelectedIslemler(selectedIslemler);
       
      };

    const filteredData = data.filter((row) => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
        return  isRowMatched(row) && true;
    }
    const rowDate = new Date(row.cikisTarih);

    return  isRowMatched(row) && (
        (!dateFilter.startDate || rowDate > new Date(dateFilter.startDate)) &&
        (!dateFilter.endDate || rowDate < new Date(dateFilter.endDate).setHours(23,59,59) )
    );
    });


    useEffect(() => {
      
      let eftSum = 0;
      let nakitSum = 0;
      let kartSum = 0;
      let totalSum=0;
      filteredData.forEach((item) => {

        if (item.odemeYontemi === 1) { 
          eftSum += item.alinanOdeme || 0;
          totalSum += item.alinanOdeme || 0;
        }
        else if (item.odemeYontemi === 2) { 
          nakitSum += item.alinanOdeme || 0;
          totalSum += item.alinanOdeme || 0;
        }
        else if (item.odemeYontemi === 3) { 
          kartSum += item.alinanOdeme || 0;
          totalSum += item.alinanOdeme || 0;
        }
      });
      setTotalSum(totalSum);
      setEftSum(eftSum);
      setNakitSum(nakitSum);
      setKartSum(kartSum);
  }, [filteredData]);
  
  

    // Additional handlers for CRUD operations can be added here

    return (
        
        <div className='container' >

            
            <CustomToolbar onApplyFilter={handleApplyFilter} islemler={islemler}  />
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
            <div className='container' style={{ padding: '10px'}}>
              <div className='row'>   
                <div className='col-xl-3 col-l-4 col-md-6 col-sm-8 col-12'> 
                  <span className="pull-left"><b>EFT:</b> {eftSum.toLocaleString()} ₺ </span> <br/>
                  <span className="pull-left"><b>Nakit:</b> {nakitSum.toLocaleString()} ₺ </span> <br/>
                  <span className="pull-left"> <b>Kredi Kartı: </b> {kartSum.toLocaleString()} ₺ </span><br/>
                  <hr/>
                  <b> Toplam Alınan Ödeme: </b> {totalSum.toLocaleString()} ₺
              
                </div>
              </div>
             
              
            </div>
        </div>



    );
}

export default AracislemlerComponent;
