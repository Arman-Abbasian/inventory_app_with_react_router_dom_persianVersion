import Routee from './routes';
import './App.css';
import Layout from './Layout/Layout';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routee />
        </Layout>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
