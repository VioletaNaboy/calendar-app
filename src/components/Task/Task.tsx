import { useState } from "react";
import { TaskEl, Tag, InputTask } from "./StyledTask"
import { TaskProps } from "../../types/task";
import { tags } from "../../utils/variables";
import { useAppDispatch } from "../../state/hooks";
import { updateTask, addTask } from "../../state/tasks/tasksSlice";


export const Task: React.FC<TaskProps> = ({ tagsArray, descr, id, date }) => {
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
        if (currentDescr !== descr || currentTags !== tagsArray && date !== '') {
            dispatch(updateTask({
                id,
                description: currentDescr,
                tagsArray: currentTags,
                date,
            }));
            setIsEditing(false);
        }
        if (date === "" && currentDescr !== "") {
            dispatch(addTask({
                id,
                description: currentDescr,
                tagsArray: currentTags,
                date: new Date().toDateString()
            }));
            setIsEditing(false);
        }
        if (date === '' && currentDescr === '') {
            return
        }
        else {
            setIsEditing(false);
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

    return (
        <TaskEl onClick={handleTaskClick} onMouseLeave={handleBlur}>

            {isEditing ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'start', gap: '1px', marginBottom: '4px' }}>
                        {Object.keys(tags).map((t) =>
                            <Tag key={t}
                                tag={t as keyof typeof tags}
                                isActive={currentTags.includes(t as keyof typeof tags)}
                                onClick={() => handleTagClick(t as keyof typeof tags)}
                            />)}
                    </div>
                    <InputTask id={`input-${id}`} value={currentDescr}
                        onChange={handleChange}
                        rows={4} />
                </>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'start', gap: '1px', marginBottom: '4px' }}>
                        {tagsArray.map((t) => <Tag key={t} tag={t as keyof typeof tags} isActive={true} />)}
                    </div>
                    <span>{descr}</span>
                </>
            )
            }


        </TaskEl >)
}