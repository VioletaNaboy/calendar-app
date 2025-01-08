import styled from "styled-components";
import { colors, sizes, tags } from '../../utils/variables'

interface TagProps {
    tag: keyof typeof tags;
}

export const TaskEl = styled.div`
padding: ${sizes.sDesk};
background-color: ${colors.light};
border-radius: ${sizes.sDesk};
overflow: hidden; 
text-overflow: ellipsis;
max-width: 100%;
flex-shrink: 0;
`

export const Tag = styled.div<TagProps>`
  width: 18%;
  background-color: ${(props): string => tags[props.tag]};
  height: 5px;
  border-radius: 12%;
`;