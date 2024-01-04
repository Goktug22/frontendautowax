import React from 'react';
import { useNavigate } from 'react-router-dom';
import TemporaryDrawer from './DrawerComponent';

function HeaderComponent() {
    const navigate = useNavigate();

    return (
        <div id='myhead'>
            <header> 
                <nav className='navbar navbar-expand-md myhead'>
                    <TemporaryDrawer />
                    <div>
                        <a
                            href="/home"
                            className='navbar-brand'
                            style={{ opacity: 1, fontWeight: 600 }}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/home');
                            }}
                            >
                            Autowax
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;
