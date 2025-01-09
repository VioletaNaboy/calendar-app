import styled from "styled-components";
import { colors, tags } from '../../utils/variables'

export interface TagProps {
    tag: keyof typeof tags;
    isActive: boolean;
}

export const TaskEl = styled.div`
display: flex;
flex-direction: column;
gap: 4px;
padding: 8px;
background-color: ${colors.light};
border-radius: 6px;
overflow: hidden; 
text-overflow: ellipsis;
max-width: 100%;
flex-shrink: 0;
&:focus{
border: 1px solid ${colors.accent};
}
`

export const Tag = styled.button<{ isActive: boolean, tag: keyof typeof tags }>`
    width: 18%;
    background-color: ${(props): string => props.isActive ? tags[props.tag] : 'grey'};
    height: 6px;
    border-radius: 2px;
    padding: 0;
    `;

export const InputTask = styled.textarea`
    max-width:100%;
    width:90%;
    border: none;
    resize: none;
    font-family: inherit;
    &:focus {
        outline: none; }
    `
export const DeleteBtn = styled.button`
background-color: ${colors.accent};
&:hover {
       background-color: ${colors.backgroundAccent}  }
;
`
export const Wrapper = styled.div`
display: flex; 
justify-content: space-between; 
align-items: center;
gap:1px;
`