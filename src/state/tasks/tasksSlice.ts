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
            state.items.unshift(action.payload);
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
        updateTaskDate: (state, action: PayloadAction<{ id: string, date: string }>) => {
            const index = state.items.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.items[index].date = action.payload.date;
            }
        },
        reorderTasks: (state, action: PayloadAction<{ id: string, sourceIndex: number, targetIndex: number }>) => {
            const { sourceIndex, targetIndex } = action.payload;
            const task = state.items.find(task => task.id === action.payload.id);
            if (!task) return;
            const dayTasks = state.items.filter(t => t.date === task.date);

            if (sourceIndex !== targetIndex) {
                const [movedTask] = dayTasks.splice(sourceIndex, 1);
                dayTasks.splice(targetIndex, 0, movedTask);

                state.items = state.items
                    .filter(task => task.date !== movedTask.date)
                    .concat(dayTasks);
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
                const uniqueTasks = state.items.filter(
                    (existingTask) => !action.payload.some((newTask) => newTask.id === existingTask.id)
                );

                state.items = [...uniqueTasks, ...action.payload];

            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || 'Failed to fetch tasks';
            });
    },
});


export const { addTask, removeTask, updateTask, updateTaskDate, reorderTasks } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const selectFilteredTasks = (state: RootState) => {
    const { search, tags: filterTags } = state.filter;
    const tasks = state.tasks.items;

    return tasks.filter((task) => {
        const matchesSearch = task.description.toLowerCase().includes(search.toLowerCase());

        const matchesTags = filterTags.some(tag => task.tagsArray.includes(tag));

        return matchesSearch && matchesTags;
    });
};



export default tasksSlice.reducer;