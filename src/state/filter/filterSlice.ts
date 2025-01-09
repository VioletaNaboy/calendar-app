import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { tags } from '../../utils/variables'


interface FilterState {
    search: string,
    tags: (keyof typeof tags)[]
}

const initialState: FilterState = {
    search: "",
    tags: Object.keys(tags) as (keyof typeof tags)[]
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        toggleTag: (state, action: PayloadAction<keyof typeof tags>) => {
            const tag = action.payload;
            if (state.tags.includes(tag)) {
                state.tags = state.tags.filter((t) => t !== tag);
            } else {
                state.tags.push(tag);
            }
        },

    },
});

export const { setSearch, toggleTag } = filterSlice.actions;


export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;