import React, { useState, useEffect } from 'react';
import SquareComponent from './SquareComponent';
import ModalUnstyled from './ModalComponent';
import AracislemService from '../services/AracislemService';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Form from 'react-bootstrap/Form';
import IslemService from '../services/IslemService';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from "react-toastify";
import arabaFoto from "../imgs/uyuyanAraba.png";
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
        return '';
    }
  }


const arrayChunk = (arr, n) => {
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};

const ListEmployeeComponent = () => {
  const [islemler,setIslemler] = useState( [] );  
  const [aracislemler, setAracislemler] = useState([]);
  const [id,setId] = useState(0);
  const [open,setOpen] = useState(false);
  const [title,setTitle] = useState("");
  const [name,setName] = useState("");
  const [numara,setNumara] = useState("");
  const [plaka,setPlaka] = useState("");
  const [email,setEmail] = useState("");
  const [fiyat,setFiyat] = useState(0);
  const [marka,setMarka] = useState("");
  const [renk,setRenk] = useState("");
  const [smsSent,setSmsSent] = useState(false);
  const [totalsum, setTotalSum] = useState(0);
  const [displayIslemler, setDisplayIslemler] = useState( [] );
  const [selectedOption, setSelectedOption] = useState('');
  const [alinanOdeme, setAlinanOdeme] = useState('');

  
  const arsiveGonder = (event, id) => {
    
 
 
  
  if ( selectedOption === ""){
    toast.error('Lütfen Ödeme Yöntemi Seçiniz', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      return;
  }

  if ( alinanOdeme === ""){
    toast.error('Lütfen Ödenen Miktarı Giriniz', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      return;
  }

  let odemeYontemi = 0; 
  if ( selectedOption === 'inline-radio-1'){
    odemeYontemi=1;
  }
  else if ( selectedOption === 'inline-radio-2'){
    odemeYontemi=2;
  }
  else if ( selectedOption === 'inline-radio-3'){
    odemeYontemi=3;
  }


 

    AracislemService.archiveAracislem( id , odemeYontemi, alinanOdeme ).then( res =>{
      if ( res.status === 200){
        toast.success('Kaydedildi', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          


          AracislemService.getAracislemler().then((res) => {
            setAracislemler(res.data);
            setOpen(false);
          });

          
      
        //disable the button
      }
     } );
  
  }
  
  const smsGonder = (event, id) => {
    AracislemService.smsAracislem( id ).then( res =>{
      if ( res.status === 200){
        setSmsSent(true);
        toast.success('SMS Gönderildi', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          


          AracislemService.getAracislemler().then((res) => {
            setAracislemler(res.data);
          });

          //setOpen(false);
      
        //disable the button
      }
     } );
  
  }
  



  const setAll = (open, obj) => {
    console.log(obj);
    setOpen(open);
    setId(obj.id);
    setTitle(obj.plaka);
    setName(obj.name);
    setNumara(obj.numara);
    setPlaka(obj.plaka);
    setEmail(obj.email);
    setFiyat(obj.fiyat);
    setMarka(getCarBrandLabel(obj.marka));
    setRenk(obj.renk);
    setSmsSent(obj.smsSent);
    setSelectedOption("");
    setAlinanOdeme("");
    //setDisplayIslemler([]);
    //setTotalSum(0);
    //perform bitwise and operation and create a list of operations
    let sum = 0;
    let tempIslemler = [];
    let objIslem = obj.islemler;
    if ( objIslem === undefined || objIslem === 0 ){
      return;
    }
    for ( let i = 0; i< islemler.length ; i++){
      if (   (islemler[i].id & objIslem ) > 0  ){
        sum = sum + islemler[i].fiyat;
        tempIslemler.push( islemler[i]);
      }
    }
    setTotalSum(sum);
    setDisplayIslemler(tempIslemler);


  };

  const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.id);
  }

  const changeAlinanOdeme = event => {
    setAlinanOdeme( event.target.value );

 }


  useEffect(() => {
    AracislemService.getAracislemler().then((res) => {
      setAracislemler(res.data);
    });


    IslemService.getIslemler().then((res) => {
      setIslemler(res.data);
    });
  }, []);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='row'>
        <div className='col-4'>
          {/* Possibly some content here */}
        </div>
        <div className='col-4'>
          <h2 className='text-center' style={{ marginTop: '20px', color: '#343a40' , fontFamily: 'Fantasy' , fontWeight: 200}}>
             İşlemdeki Araçlar 
          </h2>
        </div>
        <div className='col-4'>
          <div className='float-end'>
            <ModalUnstyled />
          </div>
        </div>
      </div>

      <Dialog  fullWidth
            maxWidth="md"
           
            open={open} onClose={handleClose} >
        <DialogTitle textAlign="center" > <b> {title} </b>     </DialogTitle>
        <DialogContent>

<div className='row'>
    <div className='col-md-6 col-12'> 
        <table>
            <tbody>
            <tr>
                <td>    
                    <span>
                        <i className="fa fa-address-card" aria-hidden="true"></i>
                        {name}
                    </span>    
                </td>
            </tr>
            <tr>
                <td>    
                    <span>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    {numara}
                    </span>     
                </td>
            </tr>
            <tr>
                <td>    
                    <span>
                    <i className="fa fa-car" aria-hidden="true"></i>
                    {marka}
                    </span>   
                </td>
            </tr>
            <tr>
                <td>    
                    <span>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    {email}
                    </span> 
                </td>
            </tr>
            </tbody>
        </table>
        <br></br>
    </div>
    <div className='col-md-6 col-12'>

       
    <ul className='no-bullets'> 
    {displayIslemler.map((islem, i) => (
            <li key={i}>
                <span> {islem.name} </span> <span className='pull-right'>  {islem.fiyat} ₺ </span>
            </li>
            
          ))}
    </ul>   
    <hr/>
    <ul className='no-bullets'>      
      <li>
        <span>     <i className="fa fa-shopping-cart" aria-hidden="true"></i> Toplam: </span> <span className='pull-right'>  {totalsum} ₺ </span>
      </li>
    </ul> 

    <br></br>

    
           
            
       
    </div> 
</div>
<div className='row'>
  <div className='col-md-6 col-12'>
  <Form.Check
    className="custom-radio"
    inline
    label="EFT"
    name="group1"
    type="radio"
    id={`inline-radio-1`}
    onChange={handleOptionChange}
    checked={selectedOption === 'inline-radio-1'}
  />
  <Form.Check
    className="custom-radio"
    inline
    label="Nakit"
    name="group1"
    type="radio"
    id={`inline-radio-2`}
    onChange={handleOptionChange}
    checked={selectedOption === 'inline-radio-2'}
  />
  <Form.Check
    className="custom-radio"
    inline
    name="group1"
    label="Kredi Karti "
    type="radio"
    id={`inline-radio-3`}
    onChange={handleOptionChange}
    checked={selectedOption === 'inline-radio-3'}
  />
        
  </div>

  

</div>
<br></br>


<div className='row'>
  <div className='col'>



    <InputGroup className="w-50">
    <FloatingLabel controlId="floatingFiyat" label="Ödeme">
        <Form.Control
          type="number"
          placeholder="Alinan Fiyat"
          aria-label="Alinan Fiyat"
          aria-describedby="basic-addon1"
          value={alinanOdeme}
          onChange={changeAlinanOdeme}
        />
    </FloatingLabel> 
        <InputGroup.Text id="basic-addon1">₺</InputGroup.Text>
      </InputGroup>
    
  </div>


</div>

    <br></br>
        <button onClick={(event) => smsGonder(event, id)} type="button" className={"btn btn-success " +  (smsSent ? "disabled" : ""  )  }> <i className="fa fa-envelope-o" aria-hidden="true"></i> Sms Gönder</button>
       
        <button onClick={(event) => arsiveGonder(event, id)} type="button" className="btn pull-right btn-primary " >  Bitir</button>
        
        
     
        </DialogContent>
      </Dialog>

      <h2 className='text-center' style={{ fontFamily: "comic sans ms", marginBottom: "-40px"}} > Şimdilik İşlemde Hiç Araç Yok... </h2>
      <img className = " img-fluid"src={arabaFoto} alt="Uyuyan Araba" />
      {arrayChunk(aracislemler, 4).map((row, i) => (
        <div key={i} className="row gy-2 gx-2">
          {row.map((col, j) => (
            <div key={j} className="col-sm-3 col-6">
              <SquareComponent allChanger={setAll} col={col} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListEmployeeComponent;
