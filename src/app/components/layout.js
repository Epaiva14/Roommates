'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import handleLogout from '../utils/handleLogout';


export default function Layout({ children }) {
    const router = useRouter();

    const logMeOut = () => {
        handleLogout();
        router.push('/users/login');
    }

    return (
        <div className='navLayout'>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href='/'>
                            Home
                        </a>

                        <a className="navbar-item" href='/calendar'>
                            Calendar
                        </a>
                        <a className="navbar-item" href='/chat'>
                            Chat Rooms
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item" href='/profile'>
                                About
                            </a>
                            <a className="navbar-item" href='/chat'>
                                Jobs
                            </a>

                            <hr className="navbar-divider" />
                            <a className="navbar-item" href='/help'>
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary" href='/users/profile'>
                                <strong>Profile</strong>
                            </a>
                            <a className="button is-light" href='' onClick={logMeOut}>
                                Log out
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}