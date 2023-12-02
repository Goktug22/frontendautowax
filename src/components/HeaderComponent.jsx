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
                    <nav className='navbar navbar-expand-md myhead'>
                    <TemporaryDrawer />
                        <div> <a href='/home'className='navbar-brand' style={ { opacity : 1, fontWeight: 600}} > Autowax </a></div>
                        
                    </nav>

                </header>
                
            </div>
        );
    }
}

export default HeaderComponent;