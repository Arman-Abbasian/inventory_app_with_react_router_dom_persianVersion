import Routee from './routes';
import './App.css';
import Layout from './Layout/Layout';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routee />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
