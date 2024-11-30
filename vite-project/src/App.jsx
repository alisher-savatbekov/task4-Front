import Login from './Login.jsx';
import './App.css';
import React from 'react';
import Image from 'react-bootstrap/Image';
import Photo from './photos/polekrana.avif';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import PropTypes from 'prop-types';
import SuccessPage from './SuccessPage.jsx';
import UserList from './userList/UserList.jsx';

function ConditionalAsides({ children }) {
  const location = useLocation();
  console.log('Current Path:', location.pathname); // Логируем текущий путь

  const excludedPaths = ['/success',"/users"];

  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return <>{children}</>;
}

ConditionalAsides.propTypes = {
  children: PropTypes.node.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // Инициализация состояния
      token:localStorage.getItem("de_token") ? JSON.parse(localStorage.getItem("de_token")) : null
    };
  }

  render() {
  
  
      
    return (
      <div className="app">
        <BrowserRouter>
          <ConditionalAsides>
            <aside className="part-1">
              <Routes>
                <Route path="/" element={<Login users={this.state.users} />} />
                <Route path="/signUp" element={<SignUp users={this.state.users} />} />
              </Routes>
            </aside>
            <aside className="part-2">
              <Image src={Photo} />
            </aside>
          </ConditionalAsides>
          <Routes>
            <Route
              path="/success"
              element={
                  <SuccessPage/>
              }
            />
            <Route path="/users"
             element={<UserList/>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
