import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CorporationPage from './pages/CorporationPage';
import DepartmentPage from './pages/DepartmentPage';
import EmployeePage from './pages/EmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/corporation" element={<CorporationPage />} />
        <Route path="/department/:id" element={<DepartmentPage />} />
        <Route path="/employee/:id" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;