import React from 'react';
import ToDo from './components/todo/todo.js';
import NavBar from './components/todo/navbar.js';
import PaginationProvider from './components/context/pagination';

const App = () => (
  <>
    <NavBar />
    <PaginationProvider>
      <ToDo />
    </PaginationProvider>
  </>
);

export default App;