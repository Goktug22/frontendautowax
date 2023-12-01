import React, { Component } from 'react';
import TemporaryDrawer from './DrawerComponent';
class HeaderComponent extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id='myhead'>

                <header> 
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <TemporaryDrawer />
                        <div> <a href='/home'className='navbar-brand' > Autowax </a></div>
                        
                    </nav>

                </header>
                
            </div>
        );
    }
}

export default HeaderComponent;