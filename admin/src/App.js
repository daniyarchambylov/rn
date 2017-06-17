import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import  from 'semantic-ui-react'
import Sidebar from './components/Sidebar';


class App extends Component {
    render() {
        return (
            <div className='app'>
                <Sidebar />
                <div className='right'></div>
            </div>
        );
    }
}

export default App;
