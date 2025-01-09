import { StyledHeader, StyledInput, TagBtn } from "./StyledHeader"
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectFilter, setSearch, toggleTag } from "../../state/filter/filterSlice";
import { tags } from "../../utils/variables";
import { Wrapper } from "../Task/StyledTask";
export const Header = () => {
    const dispatch = useAppDispatch();
    const { search, tags: selectedTags } = useAppSelector(selectFilter);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    const handleTagClick = (tag: keyof typeof tags) => {
        dispatch(toggleTag(tag));
    };

    return (
        <StyledHeader>
            <StyledInput value={search} placeholder="Search for task..." onChange={handleSearchChange} />
            <Wrapper style={{ gap: '8px' }}>
                {Object.keys(tags).map((tag) => (
                    <TagBtn
                        key={tag}
                        tag={tag as keyof typeof tags}
                        onClick={() => handleTagClick(tag as keyof typeof tags)}
                        isActive={selectedTags.includes(tag as keyof typeof tags)}
                    >
                        {tag}
                    </TagBtn>
                ))}
            </Wrapper>
        </StyledHeader>
    )
}