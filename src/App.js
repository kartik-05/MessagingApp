import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';

function App() {


  const [{ user }, dispatch] = useStateValue();

  return (


    <div className="App">

      {!user ? (
        <div className="login-Container-landing-page">

          <h1><Login /></h1>

        </div>

      ) :
        (<div className="chatbox-container">

          <Router>
            <Sidebar />

            <Switch>

              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">

                <Chat />
              </Route>



            </Switch>


          </Router>

        </div>)
      }


    </div>
  );
}

export default App;
