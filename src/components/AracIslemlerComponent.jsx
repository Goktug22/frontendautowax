import React, { useState, useEffect } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import { Box, Button} from '@mui/material';
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
import logo from "../imgs/autowax.jpg";


import { jsPDF } from "jspdf";

import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon  from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import "../font/Roboto-Medium-normal";
import "../font/Roboto-MediumItalic-normal";
import "../font/Roboto-Light-normal";
import HarcamaService from '../services/HarcamaService';

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

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


function CustomToolbar({ onApplyFilter, islemler,exportPDF } ) {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [selectedIslemler, setSelectedIslemler] = useState([]);

    const handleExportPDF = () => {
      exportPDF(startDate, endDate);
    };
    
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
          format="dd/MM/yyyy"
         
          slotProps={   { field: { clearable: true } , textField : {variant: 'outlined'} }  }
          
          
        />

    
        <DatePicker
          label="Bitiş Tarihi"
          value={endDate}
          onChange={setEndDate}
          
          format="dd/MM/yyyy"
          slotProps={   { field: { clearable: true } , textField : {variant: 'outlined'} }  }
        />

      

<FormControl sx={{ m: 1, width: 300 }}>
  <InputLabel>İşlemler</InputLabel>
  <Select
    label="İşlemler"
    multiple
    value={selectedIslemler}
    onChange={handleChangeSelectedIslemler}
    renderValue={(selected) => selected.map(id => islemler.find(islem => islem.id === id).name).join(', ')}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 200,  // Set maximum height (in pixels)
          overflow: 'auto', // Enable scrolling
        },
      },
    }}
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


        <IconButton onClick={handleExportPDF} className="pdfIconButton" style={{ 
          color: 'white', // White icon
          backgroundColor: 'red', // Red background
          margin: '4px', // Optional: for spacing
      }} >
          <PictureAsPdfIcon />
      </IconButton>


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
       
        { field: 'name', headerName: 'İsim', width: 200 },
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
        valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },
        { field: 'cikisTarih', headerName: 'Çıkış Tarihi', width: 200, type: 'date',
        valueGetter: (params) => params.value ? new Date(params.value) : null,valueFormatter: ({ value }) => value ? formatDateToDDMMYYYY(value) : '' },
        {
          field: 'personel',
          headerName: 'Personel',
          width: 200,
          renderCell: (params) => params.value ? params.value.name : ''
        },
        { field: 'bahsis',align: 'left', headerAlign: 'left', headerName: 'Bahşiş', width: 150, type: 'number' ,renderCell: (params) => params.value != null ? `${params.value} ₺` : '' },
        {
          field: 'pdf',
          headerName: 'PDF',
          renderCell: (params) => (

            <IconButton onClick={() => handlePdfExportForRow(params.row)} className="pdfIconButton" style={{ 
              color: 'white', // White icon
              backgroundColor: 'red', // Red background
              margin: '4px', // Optional: for spacing
          }} >
              <PictureAsPdfIcon />
          </IconButton>
           
          ),
          width: 150,
        },
        ];

        const handlePdfExportForRow = (row) => {
          const doc = new jsPDF();


          doc.setFont("Roboto-Medium");
        
          doc.addImage(logo, 'JPEG', 150, -16, 50, 50); // Adjust dimensions as needed

          let currentYPosition = 20;
        
          const addBoldTextLine = (text, value) => {
            doc.setFont("Roboto-MediumItalic", "normal"); // Set font to bold
            doc.text(text, 10, currentYPosition);
            doc.setFont("Roboto-Light", "normal"); // Set font back to normal
            doc.text(value, 10 + 40, currentYPosition); // Adjust positioning for value
            currentYPosition += 10; // Increment the Y position for the next line
          };
        
          addBoldTextLine(`İsim: `, row.name);
          
          const islemlerText = getIslemNames(row.islemler).split('\n').join(', ');
          addBoldTextLine(`İşlemler: `, islemlerText);
          
          addBoldTextLine(`Alınan Ödeme: `, `${row.alinanOdeme.toLocaleString()} ₺`);
          addBoldTextLine(`Plaka: `, row.plaka);
          addBoldTextLine(`Giriş Tarihi: `, formatDateToDDMMYYYY(row.girisTarih));
          addBoldTextLine(`Çıkış Tarihi: `, formatDateToDDMMYYYY(row.cikisTarih));
        
          doc.save(`Detaylar_${row.name}.pdf`);
        };
        
    
    const getCurrentFormattedDate = () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
      const year = now.getFullYear();
      return `${day}/${month}/${year}`;
    };
        
    
    const exportPDF = async (startDate, endDate) => {


      const addNewPageIfNeeded = () => {
        const pageHeight = doc.internal.pageSize.height;
        if (finalY > pageHeight) {
            doc.addPage();
            finalY = 10; // Reset Y position to top of the new page
        }
    };

      const doc = new jsPDF();
      doc.setFont("Roboto-Medium");
      const formattedStartDate = startDate ? formatDateToDDMMYYYY(startDate) : '';
      const formattedEndDate = endDate ? formatDateToDDMMYYYY(endDate) : '';

      let harcamaTotal = 0;
      let bahsisTotal = 0;

      // Format dates to YYYY-MM-DD
      
      const a = formatDate(startDate);
      const b = formatDate(endDate);
      console.log(a);
      



      let harcamaData = [];
      if (startDate && endDate) {
          try {
              const response = await HarcamaService.getBetweenDates(a,b);
              harcamaData = response.data;
              harcamaTotal = harcamaData.reduce((total, harcama) => total + harcama.miktar, 0);
              
          } catch (error) {
              console.error('Error fetching harcama data: ', error);
              // Handle error (e.g., show an alert or a toast notification)
          }
      }
      bahsisTotal = filteredData.reduce((total, item) => total + (item.bahsis || 0), 0);
      let adjustedTotalSum = totalSum - harcamaTotal - bahsisTotal;


      let dateText = '';
      if (formattedStartDate && formattedEndDate) {
          dateText = `Başlangıç: ${formattedStartDate}      Bitiş: ${formattedEndDate}`;
      } else if (formattedStartDate) {
          dateText = `Başlangıç: ${formattedStartDate}`;
      } else if (formattedEndDate) {
          dateText = `Bitiş: ${formattedEndDate}`;
      }
      
      if (dateText) {
          doc.text(dateText, 10, 10);
      }

     
      

      // Define column headers for the PDF
      const tableColumn = ["Plaka", "Islemler", "Personel", "Numara", "Alinan Odeme",  "Bahsis"];

      // Define rows: convert your grid data to the format for PDF
      const tableRows = filteredData.map(item => [
        item.plaka, 
        getIslemNames(item.islemler), // Assuming this function formats the 'islemler' field correctly
        item.personel ? item.personel.name : '', // Adjust based on how the 'personel' data is structured
        item.numara, 
        item.alinanOdeme != null ? `${item.alinanOdeme} ₺` : '',
        item.bahsis != null ? `${item.bahsis.toLocaleString()} ₺` : '' // Format 'bahsis' as a currency
      ]);
    
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: {
            font: "Roboto-Medium", // or 'times', 'courier'
            fontSize: 10, // You can set the font size here
        },
    });

    let finalY = doc.autoTable.previous.finalY;
    finalY += 10; 

    // Add your additional content
      addNewPageIfNeeded();
      doc.setFontSize(12); // Adjust font size as needed
      doc.text(`EFT: ${eftSum.toLocaleString()} ₺`, 10, finalY);
      finalY += 6; // Increment Y position for next line
      addNewPageIfNeeded();
      doc.text(`Nakit: ${nakitSum.toLocaleString()} ₺`, 10, finalY);
      finalY += 6;
      addNewPageIfNeeded();
      doc.text(`Kredi Kartı: ${kartSum.toLocaleString()} ₺`, 10, finalY);
      finalY += 6;
      addNewPageIfNeeded();
      doc.text(`Toplam Alınan Ödeme: ${totalSum.toLocaleString()} ₺`, 10, finalY);
      finalY += 6; 
      addNewPageIfNeeded();
    

      finalY += 6; // Adjust space if needed
      addNewPageIfNeeded();
      doc.setFontSize(10); // Adjust font size as needed
      for (const [personelName, totalBahsis] of Object.entries(bahsisTotals)) {
        doc.text(`${personelName}: ${totalBahsis.toLocaleString()} ₺`, 10, finalY);
        finalY += 6; // Adjust line spacing if needed
      }
      // Save the PDF
      
      addNewPageIfNeeded();

      
      if (harcamaData.length > 0) {
          // Create a string with each Harcama in the "description(miktar)" format
          const harcamaDescriptions = harcamaData.map(harcama => `${harcama.description}( ${harcama.miktar} ₺ )`).join(', ');
          
          doc.setFontSize(10); // Adjust font size as needed
          doc.text("Harcamalar: "  +  harcamaDescriptions, 10, finalY);
          finalY += 10; // Increment Y position for next content
      }
      addNewPageIfNeeded();


      finalY += 10; 
      addNewPageIfNeeded();
      // Add Harcama and Bahsis totals
      doc.setFontSize(10);
      doc.text(`Toplam Harcama: ${harcamaTotal.toLocaleString()} ₺`, 10, finalY);
      finalY += 6;
      addNewPageIfNeeded();
      doc.text(`Toplam Bahsis: ${bahsisTotal.toLocaleString()} ₺`, 10, finalY);
      finalY += 6;
      addNewPageIfNeeded();
      doc.text(`Harcama ve Bahşiş çıktıktan sonra Toplam Ödeme: ${adjustedTotalSum.toLocaleString()} ₺`, 10, finalY);

      const formattedDate = getCurrentFormattedDate();
      doc.save(`${formattedDate}.pdf`);
    };
    
    

 

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
                console.log(response.data);
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

    const calculateBahsisPerPersonel = (data) => {
      const totals = {};
      data.forEach(item => {
        if (item.personel && item.personel.name && item.bahsis > 0) {
          totals[item.personel.name] = (totals[item.personel.name] || 0) + item.bahsis;
        }
      });
      return totals;
    };
    
    const bahsisTotals = calculateBahsisPerPersonel(filteredData);
    



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



            <CustomToolbar onApplyFilter={handleApplyFilter} islemler={islemler} exportPDF={exportPDF}  />
            <Box  sx={{ height: 600, width: '100%', backgroundColor: 'white' }}>
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    
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
              <div className='row'>
              <div className='col'>
                {Object.entries(bahsisTotals).map(([personelName, totalBahsis]) => (
                  <div key={personelName}>
                    <span><b>{personelName}:</b> {totalBahsis.toLocaleString()} ₺</span><br />
                  </div>
                ))}
              </div>
            </div>
             
              
            </div>
        </div>



    );
}

export default AracislemlerComponent;
