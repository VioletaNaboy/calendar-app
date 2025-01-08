import styled from "styled-components";
import { colors, sizes, tags } from '../../utils/variables'

export interface TagProps {
    tag: keyof typeof tags;
    isActive?: boolean;
}

export const TaskEl = styled.div`
padding: ${sizes.sDesk};
background-color: ${colors.light};
border-radius: ${sizes.sDesk};
overflow: hidden; 
text-overflow: ellipsis;
max-width: 100%;
flex-shrink: 0;
&:focus{
border: 1px solid ${colors.accent};
}
`

export const Tag = styled.div<TagProps>`
  width: 18%;
  background-color: ${(props): string => props.isActive ? tags[props.tag] : 'grey'};
  height: 7px;
  border-radius: 16%;

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