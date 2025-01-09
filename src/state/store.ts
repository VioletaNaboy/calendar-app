import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasksSlice";
import filterReducer from './filter/filterSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "tasks",
    storage,
};


const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
    reducer: {
        tasks: persistedTasksReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
