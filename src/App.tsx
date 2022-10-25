import React, { useState } from 'react';
import './App.css';
import MyComponent from './components/mapComponent';
import Login from './components/login';
import {
  Wrapper,
  Status
} from '@googlemaps/react-wrapper';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';



function App() {
  const center = { lat: 30.033333, lng: 31.233334 };
  const zoom = 5;

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  }
  const handleData = (myColor: string) => {
    return myColor;
  };


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/map' element={
            <Wrapper apiKey={'AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg'} 
                     render={render} 
                     libraries={['places', 'drawing', 'geometry']}
            >
              <MyComponent
                center={center}
                handleData={handleData}
                zoom={zoom}
                style={{ flexGrow: "1", height: '600px' }}
              >
              </MyComponent>
            </Wrapper>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;