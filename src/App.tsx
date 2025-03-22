import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { ThemeProvider } from './contexts/providers/ThemeProvider';

const App: React.FC = () => {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
