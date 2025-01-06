import styled from "styled-components";

export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); 
  grid-template-rows: repeat(6, 1fr); 
  gap: 5px;
  width: 100%; 
  max-width: 600px; 
  margin: 0 auto; 
  color:black;
`;

export const DayName = styled.div`

  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
`;

export const Day = styled.div`
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;

  &.active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
`;
