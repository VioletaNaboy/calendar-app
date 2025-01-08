import styled from "styled-components";
import { colors, sizes } from "../../utils/styles";

interface CalendarProps {
  size: number;
}

export const Calendar = styled.div<CalendarProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr); 
  grid-template-rows: ${(props) => (props.size === 7 ? "min-content repeat(1, 1fr)" : "min-content repeat(5, 1fr)")};
  gap: 4px;
  width: 90vw; 
  box-sizing: border-box; 
  height: 80vh;
  min-width: 300px;
  margin: 24px auto; 
  color: ${colors.text};
`;

export const DayName = styled.div`
  font-size: ${sizes.mDesk};
  max-width:100%;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: ${sizes.borderRadius};
  ${colors.backgroundDark};
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: nowrap;   
  max-height: 100%; 
`;

export const Day = styled.div`
  text-align: left;
  max-width:100%;
  font-size: ${sizes.sDesk};
  padding: 8px;
  border-radius: ${sizes.borderRadius};
  border: 1px solid #ddd;
  ${colors.backgroundLight};
  overflow: hidden;
  white-space: nowrap;    
  max-height: 100%; 
  &.active {
    background-color: ${colors.accent};
    color:${colors.accent}; ;
    font-weight: bold;
  }

`;

export const Button = styled.button`
background-color: ${colors.accent};
margin-right: ${sizes.sDesk};

&:hover {
background-color: ${colors.backgroundAccent};
}
`
export const Text = styled.div`
font-size: ${sizes.lDesk};
font-weight: 600;
color: ${colors.text};
`

export const TaskWrapper = styled.div`
  width: 100%; 
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-x: hidden;
  overflow-y: auto;
  `