import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';   
import { useState,useEffect } from 'react';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import AracislemService from '../services/AracislemService';
import { toast } from "react-toastify";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import  {components} from 'react-select';
import IslemService from '../services/IslemService';




function ModalUnstyled(props) {


  const colorOptions = [
    { value: 'black', label: 'Siyah' },
    { value: 'white', label: 'Beyaz' },
    { value: 'darkgrey', label: 'Füme' },
    { value: 'gray', label: 'Gri' },
    { value: 'red', label: 'Kırmızı' },
    { value: 'blue', label: 'Mavi' },
    { value: 'orange', label: 'Turuncu' },
    { value: 'green', label: 'Yeşil' },
    { value: 'pink', label: 'Pembe' },
  
  ];

  const carBrandOptions = [
    { value: 'acura', label: 'Acura' },
    { value: 'alfa-romeo', label: 'Alfa Romeo' },
    { value: 'aston-martin', label: 'Aston Martin' },
    { value: 'audi', label: 'Audi' },
    { value: 'bentley', label: 'Bentley' },
    { value: 'bmw', label: 'BMW' },
    { value: 'bugatti', label: 'Bugatti' },
    { value: 'buick', label: 'Buick' },
    { value: 'cadillac', label: 'Cadillac' },
    { value: 'chevrolet', label: 'Chevrolet' },
    { value: 'chrysler', label: 'Chrysler' },
    { value: 'citroen', label: 'Citroën' },
    { value: 'cupra', label: 'Cupra' },
    { value: 'dacia', label: 'Dacia' },
    { value: 'daewoo', label: 'Daewoo' },
    { value: 'daihatsu', label: 'Daihatsu' },
    { value: 'dodge', label: 'Dodge' },
    { value: 'ferrari', label: 'Ferrari' },
    { value: 'fiat', label: 'Fiat' },
    { value: 'ford', label: 'Ford' },
    { value: 'genesis', label: 'Genesis' },
    { value: 'gmc', label: 'GMC' },
    { value: 'honda', label: 'Honda' },
    { value: 'hummer', label: 'Hummer' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'infiniti', label: 'Infiniti' },
    { value: 'isuzu', label: 'Isuzu' },
    { value: 'jaguar', label: 'Jaguar' },
    { value: 'jeep', label: 'Jeep' },
    { value: 'kia', label: 'Kia' },
    { value: 'koenigsegg', label: 'Koenigsegg' },
    { value: 'lamborghini', label: 'Lamborghini' },
    { value: 'lancia', label: 'Lancia' },
    { value: 'land-rover', label: 'Land Rover' },
    { value: 'lexus', label: 'Lexus' },
    { value: 'lincoln', label: 'Lincoln' },
    { value: 'lotus', label: 'Lotus' },
    { value: 'maserati', label: 'Maserati' },
    { value: 'mazda', label: 'Mazda' },
    { value: 'mclaren', label: 'McLaren' },
    { value: 'mercedes', label: 'Mercedes-Benz' },
    { value: 'mini', label: 'Mini' },
    { value: 'mitsubishi', label: 'Mitsubishi' },
    { value: 'nissan', label: 'Nissan' },
    { value: 'opel', label: 'Opel' },
    { value: 'pagani', label: 'Pagani' },
    { value: 'peugeot', label: 'Peugeot' },
    { value: 'pontiac', label: 'Pontiac' },
    { value: 'porsche', label: 'Porsche' },
    { value: 'ram', label: 'RAM' },
    { value: 'renault', label: 'Renault' },
    { value: 'rolls-royce', label: 'Rolls-Royce' },
    { value: 'saab', label: 'Saab' },
    { value: 'saturn', label: 'Saturn' },
    { value: 'scion', label: 'Scion' },
    { value: 'seat', label: 'SEAT' },
    { value: 'skoda', label: 'Škoda' },
    { value: 'smart', label: 'Smart' },
    { value: 'subaru', label: 'Subaru' },
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'tesla', label: 'Tesla' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'volvo', label: 'Volvo' }
  ];
  
  const [options, setOptions] = useState([]);
  const [testSelectedOption, setTestSelectedOption] = useState([]);
  const [renkSelectedOption, setRenkSelectedOption] = useState("");
  const [carBrandOption, setCarBrandOption] = useState("");
  const [open, setOpen] = React.useState(false) ;
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setEmail(""); setPlaka(""); setName("");setTelefon("");setTestSelectedOption("");setRenkSelectedOption("");setCarBrandOption(""); } 
  const [plaka, setPlaka] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [fiyat, setFiyat] = useState(0);


  const setColorValueProgrammatically = colorValue => {
    const option = colorOptions.find(option => option.value === colorValue);
    setRenkSelectedOption(option);
  };
  const setBrandValueProgrammatically = brandValue => {
    const option = carBrandOptions.find(option => option.value === brandValue);
    setCarBrandOption(option);
  };

  const handleChange = testSelectedOption => {
    setTestSelectedOption(testSelectedOption);
    let sum = 0;
    for (var i = 0, l = testSelectedOption.length; i < l; i++) {    
      var obj = testSelectedOption[i].fiyat;
      sum = sum + obj;
    }
    setFiyat(sum);


};

const handleColorChange = renkSelectedOption => {
  setRenkSelectedOption(renkSelectedOption);
};

const handleCarBrandChange = carBrandOption => {
  setCarBrandOption(carBrandOption);
};

const requestData = event => {
  //get car data by license plate
  
  if ( plaka === ""){
    return;
  }

  console.log(renkSelectedOption);
  AracislemService.getAracislemByPlaka(plaka).then( (res) => {
    if ( res.data !== ""){
      setColorValueProgrammatically(res.data.renk);
      setBrandValueProgrammatically(res.data.marka);
      setName(res.data.name);
      setEmail(res.data.email);
      setTelefon(res.data.numara);
      //copy data 

    }
}  );
 

}
  useEffect(() => {
    // Fetch data from the API
    IslemService.getIslemler()
        .then(response => {
            // Transform the data into the format required by react-select
            const transformedOptions = response.data.map(item => ({
                value: item.id, 
                label: item.name + " ( " + item.fiyat + "₺ )" ,
                fiyat: item.fiyat,
            }));
            setOptions(transformedOptions);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);

  


  const saveAracislem = event => {


   var sum =0;
  if( plaka === undefined || plaka === "" ){
    event.preventDefault();
    toast.error('Plaka boş olamaz!', {
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

 if( carBrandOption === undefined || carBrandOption === "" ){
  event.preventDefault();
  toast.error('Lütfen marka seçin', {
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

 if( renkSelectedOption === undefined || renkSelectedOption === "" ){
  event.preventDefault();
  toast.error('Lütfen renk seçin', {
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






 if( name === undefined || name === "" ){
  event.preventDefault();
  toast.error('İsim boş olamaz!', {
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



  if( testSelectedOption === undefined || testSelectedOption.length === 0 ){
    event.preventDefault();
    toast.error('Lütfen işlem seçin', {
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
  else{
  for (var i = 0, l = testSelectedOption.length; i < l; i++) {    
    var obj = testSelectedOption[i].value;
    sum = sum + obj;
  }
  }
   
   
   let islem = {plaka: plaka, name: name, email:email, numara: telefon, islemler: sum , aktif: true, renk: renkSelectedOption.value, marka: carBrandOption.value, fiyat: fiyat};

  

   AracislemService.createAracislem(islem).then( res =>{
    setOpen(false);
   } );
  }


  const animatedComponents = makeAnimated();

  const customStyles = {

  
    menuPortal: (provided, state) => ({
      ...provided,
      zIndex: 9999,
    
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.data.value  === "white" ? 'rgb(63, 62, 62)' : state.data.value,
    
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.value  === "white" ? 'rgb(63, 62, 62)' : state.data.value,
    }),
    
  };
 

  const changePlaka = event => {
     setPlaka( event.target.value.toUpperCase() );

  }

  const changeName = event => {
    setName( event.target.value );

 }

 const changeEmail = event => {
    setEmail( event.target.value );

 }
 const changeTelefon = event => {
    setTelefon( event.target.value );

 }



  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen}>
      <i className="fa fa-plus-square fa-2x " aria-hidden="true"></i>
      </TriggerButton>
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
        closeAfterTransition
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={open}>
        <ModalContent  sx={style} > 
            <div className='row'>
                <div className='card col-12'>
                    <div className='card-body'>
                        <form>
                          

                            <div className='form-group'>
                              <FloatingLabel controlId="floatingPlaka" label="Plaka">
                                <Form.Control type="text" placeholder="Plaka" onBlur={requestData} onChange={changePlaka} value={plaka} />
                              </FloatingLabel>  
                            </div>
                            <br></br>

                            <div className='form-group'>
                              <Select 
                                options={carBrandOptions} 
                                onChange={handleCarBrandChange} 
                                value={carBrandOption}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                placeholder='Marka'
                                components={animatedComponents}
                                menuPortalTarget={document.body}
                                menuPosition={'fixed'} 
                              />
                            </div>
                            <br></br>
                            <div className='form-group'>
                              
                                <Select  menuPortalTarget={document.body} menuPosition={'fixed'}  placeholder='Renk'  components={animatedComponents}  options={colorOptions} value={renkSelectedOption} onChange={handleColorChange} styles={customStyles}   />
                            </div>

                            <br></br>
                            <div className='form-group'>
                              <FloatingLabel controlId="floatingIsım" label="İsim">
                                <Form.Control type="text" placeholder="İsim" onChange={changeName} value={name} />
                              </FloatingLabel>  
                            </div>
                            <br></br>
                          

                            <div className='form-group'>
                              <FloatingLabel controlId="floatingEmail" label="E-Posta">
                                <Form.Control type="text" placeholder="E-Posta" onChange={changeEmail} value={email} />
                              </FloatingLabel>  
                            </div>
                            <br></br>


                            <div className='form-group'>
                              <FloatingLabel controlId="floatingTelefon" label="Telefon">
                                <Form.Control type="text" placeholder="Telefon" onChange={changeTelefon}  value={telefon} />
                              </FloatingLabel>  
                            </div>
                            <br></br>
                            
                         
                          

                            <div className='form-group'>
                              
                                <Select 
                                    isMulti
                                    components={animatedComponents}
                                    value={testSelectedOption}
                                    onChange={handleChange}
                                    options={options}
                                    closeMenuOnSelect={false}
                                    blurInputOnSelect ={false}
                                    placeholder= "Yapılacak işlemler"
                                />
                            </div>
                            <div className='row'> 
                              
                              <div className='col'  style={ {marginTop: "13px"} }   >       <span className='pull left'>  <b> Toplam: </b> {fiyat}₺   </span>  </div>
                              <div  className='col  '  >  <button className='btn btn-primary pull-right' style={ {marginTop: "10px"} } onClick={saveAracislem}>Kaydet</button> </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  timeout : 500;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: '80%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow:'scroll',
    
    maxHeight: '600px',
    maxWidth: '500px',
    height: "100vh",
    
    
    
  
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
  };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => `

  width: 70px;
  height: 70px;
  padding: 13px 18px;
  border-radius: 60px;
  font-size: 15px;
  text-align: center;
  margin: 15px;
  position: relative;

 
  transition: all 150ms ease;
  cursor: pointer;
  background: #0d6efd;
  border: 1px solid  #0d6efd   ;
  color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

export default ModalUnstyled;
