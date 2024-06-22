import React from 'react';
import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Fragment>      
        <Navbar />        
        <Routes>
          <Route path="/" element={<ArticleList/>} />
          <Route path="/:category" element={<ArticleList />} />
          <Route path="/article/:url" element={<ArticleDetail/>} />
        </Routes>  
        <Footer/>    
    </Fragment>
  );
};

export default App;
