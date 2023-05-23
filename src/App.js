import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import AuthForm from './Components/Authentication/Auth';
import Header from './Components/Header/Header'

function App() {
  return (
   <Fragment>
    <Header/>
    <AuthForm/>
   </Fragment>
  );
}

export default App;
