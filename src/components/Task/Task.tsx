import { useState } from "react";
import { TaskEl, Tag, InputTask, DeleteBtn, Wrapper } from "./StyledTask"
import { TaskProps } from "../../types/task";
import { tags } from "../../utils/variables";
import { useAppDispatch } from "../../state/hooks";
import { updateTask, addTask, removeTask } from "../../state/tasks/tasksSlice";

export const Task: React.FC<TaskProps> = ({ tagsArray, descr, id, date, currentDay }) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(descr === '');
    const [currentDescr, setCurrentDescr] = useState(descr);
    const [currentTags, setCurrentTags] = useState(tagsArray);

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
        if (date !== "") {
            if (currentDescr !== descr || currentTags !== tagsArray) {
                dispatch(updateTask({
                    id,
                    description: currentDescr,
                    tagsArray: currentTags,
                    date,
                }));
            }
            setIsEditing(false)
        } else {
            if (currentDescr !== "") {
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
    };
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
        <TaskEl onClick={handleTaskClick} onMouseLeave={handleBlur}>

            {isEditing ? (
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
                    <DeleteBtn type="button" onClick={handleDeleteClick}>Delete</DeleteBtn>
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