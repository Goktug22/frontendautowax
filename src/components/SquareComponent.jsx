
import React from 'react';


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
            return '';
    }
  }

function SquareComponent ( { allChanger, col}  ){


  
function handleClick(col){
  console.log(col);
  allChanger( true, col    )

}



    return( 
     
     <div className={  (col.smsSent ? 'sms-sent ' : '' )  + 'square text-center '  } id={col.id} onClick={()=>handleClick(col )}        >
                <span > <b>  { col.plaka } </b> </span>
                <br/>
                <span >   { getCarBrandLabel(col.marka )  }  </span>
                <br/>
                <span> <i>  { renderSwitch(col.renk) } </i> </span>

               
               
               
            </div>
   )
   ;
} 

export default SquareComponent;



