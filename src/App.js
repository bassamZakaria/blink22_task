import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './containers/Layout/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
