import React from "react";

import { Link , NavLink, Route, Routes} from "react-router-dom";
import Classes from './Header.module.css'
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";



const Header = ()=>{
  
   return (
   <header className={Classes.header}>
        <Navbar className={Classes.navbar}>
        <Container >
          <Navbar.Brand  className={Classes.logo}>
            <img
              alt=""
              src="https://img.uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/mailbox-icon.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            <h2>
            Mail Box
            </h2>
           
          </Navbar.Brand>
          {/* {ctx.isLoging && <>
          <Nav className="me-auto">
            <NavLink  to="/">Home</NavLink>
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#pricing">Pricing</NavLink>
          </Nav>
          <Badge bg="secondary">{totalprice}</Badge>
           {totalprice>10000 && <Button className='btn-sm' onClick={handleprimefeature}>{!primeState ? 'Activate premium' : 'disable prmium'}</Button>}
           <Button type="button" className="btn btn-outline-light btn-sm" onClick={ctx.logouthandler}>Log Out</Button>
           </>
           } */}
          
        </Container>
      </Navbar>
      
    </header>
   )
}
export default Header;