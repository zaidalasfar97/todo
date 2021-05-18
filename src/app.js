import React from 'react';
import ToDo from './components/todo/todo.js';
import NavBar from './components/todo/navbar.js';
// import Main from './components/todo/main.js';

// import SortProvider from './components/context/sort';
import PaginationProvider from './components/context/pagination';

const App = () => (
  <>
    <NavBar />
    {/* <SortProvider> */}
    <PaginationProvider>
      <ToDo />
    </PaginationProvider>
    {/* </SortProvider> */}
  </>
);

export default App;