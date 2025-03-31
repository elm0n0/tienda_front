import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { ThemeProvider } from './contexts/Providers/theme/ThemeProvider';

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
