import { useCallback } from 'react';
import { useAppDispatch } from '../state/hooks';
import { updateTaskDate, reorderTasks } from '../state/tasks/tasksSlice';
import { normalizeDate } from '../utils/getDays';

export const useDragAndDrop = () => {
    const dispatch = useAppDispatch();

    const handleDragStart = useCallback((id: string, index: number, date: string, e: React.DragEvent) => {
        e.dataTransfer.setData('taskId', id);
        e.dataTransfer.setData('taskIndex', index.toString());
        e.dataTransfer.setData('taskDate', date);
    }, []);

    const handleDrop = useCallback(
        (newDate: string, e: React.DragEvent) => {
            const taskId = e.dataTransfer.getData('taskId');
            if (normalizeDate(new Date(newDate)) < normalizeDate(new Date())) {
                return
            }
            if (taskId) {
                dispatch(updateTaskDate({
                    id: taskId,
                    date: newDate
                }));
            }
        },
        [dispatch]
    );
    const handleDropWithinDay = useCallback(
        (targetIndex: number, e: React.DragEvent,) => {
            const taskId = e.dataTransfer.getData('taskId');
            const taskIndex = parseInt(e.dataTransfer.getData('taskIndex'), 10);

            if (!taskId || isNaN(taskIndex)) return;

            dispatch(reorderTasks({
                id: taskId,
                sourceIndex: taskIndex,
                targetIndex,
            }));
        },
        [dispatch]
    );


    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    return { handleDragStart, handleDrop, handleDragOver, handleDropWithinDay };
};
