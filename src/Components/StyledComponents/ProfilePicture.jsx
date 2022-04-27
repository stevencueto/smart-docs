import styled from 'styled-components'

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