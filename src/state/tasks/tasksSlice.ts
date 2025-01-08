import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { TaskType } from '../../types/task'
import { fetchTasks } from './actions'

interface TasksState {
    items: TaskType[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
}

const initialState: TasksState = {
    items: [],
    status: 'idle',
    error: null,
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.items.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action: PayloadAction<TaskType>) => {
            const index = state.items.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
                state.status = 'fulfilled';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || 'Failed to fetch tasks';
            });
    },
});


export const { addTask, removeTask, updateTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;



export default tasksSlice.reducer;