import { StyledHeader, StyledInput, StyledButton } from "./StyledHeader"
export const Header = () => {
    return (
        <StyledHeader>
            <StyledInput placeholder="Search for task..." />
            <StyledButton>Add task</StyledButton>
        </StyledHeader>
    )
}