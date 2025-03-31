import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { ThemeProvider } from './contexts/theme/ThemeProvider';
import { RoleProvider } from './contexts/Role/RoleProvider';

const App: React.FC = () => {

  return (
    <RoleProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </RoleProvider>
  );
};

export default App;
