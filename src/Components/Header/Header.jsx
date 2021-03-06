import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";
import img from '../img/smartdox-logo-main.png'
import { useNavigate } from "react-router-dom";
export default function Header() {
    let navigate = useNavigate()

  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="lightBlue" navbar>
        <NavbarContainer>
            <NavbarWrapper>
                <NavbarBrand onClick={()=>{navigate('/', {replace: true})}}>
                    <img  className="h-8" src={img} alt="" />
                </NavbarBrand>
                <NavbarToggler
                    color="white"
                    onClick={() => setOpenNavbar(!openNavbar)}
                    ripple="light"
                />
            </NavbarWrapper>

            <NavbarCollapse open={openNavbar}>
                <Nav>
                    <NavItem active="light" ripple="light">
                        <Icon name="language" size="xl" />
                    </NavItem>
                    <NavLink href="/" ripple="light">
                        <Icon name="account_circle" size="xl" />
                    </NavLink>
                    <NavLink href="/" ripple="light">
                        <Icon name="description" size="xl" />
                    </NavLink>
                    <NavItem ripple="light">
                        <Icon name="settings" size="xl" />
                    </NavItem>
                    <NavItem ripple="light" onClick={()=>{localStorage.clear(); navigate('/login', {replace: true}); window.location.reload();}}>
                        <Icon name="lock" size="xl" />
                    </NavItem>
                </Nav>
            </NavbarCollapse>
        </NavbarContainer>
    </Navbar>
  );
}