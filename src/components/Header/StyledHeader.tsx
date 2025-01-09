import styled from "styled-components";
import { tags } from "../../utils/variables";
import { colors, sizes } from '../../utils/variables'

export const StyledHeader = styled.header`
width: 100%;
display: flex;
justify-content: space-evenly;
flex-wrap:wrap;
align-items: center;
background: ${colors.accent};
padding: ${sizes.sDesk} 0;
margin-bottom: ${sizes.lDesk};
`
export const StyledInput = styled.input`
padding: ${sizes.sDesk};
font-size: ${sizes.sDesk};
border: none;
border-radius:${sizes.borderRadius};
${colors.backgroundLight}; 
color: ${colors.text};
font-weight:700;
width: 40vw;
`

export const TagBtn = styled.button<{ isActive: boolean, tag: keyof typeof tags }>`
    background-color: ${(props): string => props.isActive ? tags[props.tag] : 'grey'};
    color: ${props => props.isActive ? "white" : '#292828'};
    height:3rem;
    border-radius: 10px;
    padding: 0.5em;
`