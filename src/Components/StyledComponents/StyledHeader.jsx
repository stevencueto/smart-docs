import styled from 'styled-components'
import { keyframes } from 'styled-components'
import breakpoint from 'Commons/breakpoints';


export const Header = styled.header`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 15px 60px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color || '#333'};
`

export const Nav = styled.nav`
    font-size: 1em;
    padding: 3px;

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
        background-color: ${({ hover }) => hover};
      }
`

export const ProfilePicture = styled.img`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  &:hover{
    animation: jiggle 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
`

const jiggle = keyframes`
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
  
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
  
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }`