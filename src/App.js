import React from 'react';
import './App.css';
// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <div className="demo">
        <p className="demo-text">
          Hello
          <br />
          World
        </p>
      </div>
      {/* <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes> */}
    </div>
  );
};
export default App;
