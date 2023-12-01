import React, { Component } from 'react';

class FooterComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div id='myfooter'>
               <footer className='footer'>
                    <span className='text-muted'>
                        All Rights Reserved 2023 <a href='https://github.com/Goktug22'> @Goktug22 </a>
                    </span>
               </footer>
            </div>
        );
    }
}

export default FooterComponent;