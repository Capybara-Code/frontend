import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';

import { initialiseStore } from './app/slices/authSlice'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseStore())
  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
