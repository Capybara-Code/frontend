import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Session from './pages/Session';
import PageNotFound from './pages/PageNotFound';
import Note from './pages/Note';

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
          <Route path='/session/:id' element={<Session />} />
          <Route path='/notes' element={<Note />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
