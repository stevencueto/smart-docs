import { useContext } from "react";
import ThemeContextPer from "../../context/DocsContext";
import { Header, Nav, ProfilePicture  } from "../StyledComponents/StyledHeader";
import UserContext from "../../context/UserContex";

const HeaderComp = ()=> {
    const {user} = useContext(UserContext)
    const {theme} = useContext(ThemeContextPer)
  return (
    <Header>
        <Nav>{user.username}</Nav>
        <Nav>Welcome</Nav>
        <ProfilePicture src="https://media.vogue.fr/photos/5c9b4077488cdc4843df8c05/2:3/w_2240,c_limit/Capture%20d%E2%80%99e%CC%81cran%202019-03-27%20a%CC%80%2010.20.41.png"/>
        </Header>
  )
}

export default HeaderComp
