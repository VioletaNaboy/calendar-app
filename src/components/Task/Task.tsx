import { useState } from "react";
import { TaskEl, Tag, InputTask, DeleteBtn, Wrapper } from "./StyledTask"
import { TaskProps } from "../../types/task";
import { tags } from "../../utils/variables";
import { useAppDispatch } from "../../state/hooks";
import { updateTask, addTask, removeTask } from "../../state/tasks/tasksSlice";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

export const Task: React.FC<TaskProps> = ({ tagsArray, descr, id, date, currentDay, index }) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(descr === '');
    const [currentDescr, setCurrentDescr] = useState(descr);
    const [currentTags, setCurrentTags] = useState(tagsArray);
    const { handleDragStart, handleDragOver, handleDropWithinDay } = useDragAndDrop();

    const isNew = date === ""

    const handleTaskClick = () => {
        if (!isEditing) {
            setIsEditing(true);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value.trimStart();
        setCurrentDescr(value);

    };
    const handleBlur = () => {
        if (!isNew) {
            if (currentDescr !== descr || currentTags !== tagsArray && currentTags.length > 0) {
                dispatch(updateTask({
                    id,
                    description: currentDescr,
                    tagsArray: currentTags,
                    date,
                }));
            }
            setIsEditing(false)
        } else { return }
    };
    const handleSaveClick = () => {
        if (currentDescr !== "" && currentTags.length > 0) {
            dispatch(addTask({
                id,
                description: currentDescr,
                tagsArray: currentTags,
                date: currentDay.toDateString()
            }));
            setIsEditing(false)
        } else {
            return
        }
    }

    const handleTagClick = (t: keyof typeof tags) => {
        if (currentTags.includes(t)) {
            const a = currentTags.filter(tag => tag !== t);
            setCurrentTags(a)
        }
        else {
            const a = [...currentTags, t]
            setCurrentTags(a)
        }
    };
    const handleDeleteClick = () => {
        dispatch(removeTask(id));
    }

    return (
        <TaskEl draggable={!isNaN(Number(id))}
            onClick={handleTaskClick}
            onMouseLeave={handleBlur}
            onDragOver={handleDragOver}
            onDragStart={(e) => handleDragStart(id, index, currentDay.toDateString(), e)}
            onDrop={(e) => handleDropWithinDay(index, e)} >

            {isEditing && !isNaN(Number(id)) ? (
                <>
                    <Wrapper>
                        {Object.keys(tags).map((t) =>
                            <Tag key={t}
                                tag={t as keyof typeof tags}
                                isActive={currentTags.includes(t as keyof typeof tags)}
                                onClick={() => handleTagClick(t as keyof typeof tags)}
                            />)}
                    </Wrapper>
                    <InputTask id={`input-${id}`} value={currentDescr}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe a task" />
                    {isNew ? (<DeleteBtn type="button" onClick={handleSaveClick}>Save</DeleteBtn>) : (<DeleteBtn type="button" onClick={handleDeleteClick}>Delete</DeleteBtn>)}
                </>
            ) : (
                <>
                    <Wrapper>
                        {tagsArray.map((t) => <Tag key={t} tag={t as keyof typeof tags} isActive={true} />)}
                    </Wrapper>
                    <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>{descr}</span>
                </>
            )}
        </TaskEl >)
}