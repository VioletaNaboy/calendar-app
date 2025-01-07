import styled from "styled-components";
import { colors, sizes } from '../../utils/styles'

export const StyledHeader = styled.header`
width: 100%;
background: ${colors.accent};
padding: ${sizes.mDesk};
margin-bottom: ${sizes.lDesk};
`
export const StyledInput = styled.input`
padding: ${sizes.mDesk};
font-size: ${sizes.mDesk};
border: none;
border-radius:${sizes.borderRadius};
${colors.backgroundLight}; 
color: ${colors.text};
font-weight:700;
width: 50vw;
`
export const StyledButton = styled.button`
background-color: ${colors.text};;
margin: ${sizes.sDesk};

&:hover {
background-color: ${colors.backgroundAccent};
}
`