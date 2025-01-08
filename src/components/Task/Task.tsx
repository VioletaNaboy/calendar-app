import { TaskEl, Tag } from "./StyledTask"
import { TaskProps } from "../../types/task";


export const Task: React.FC<TaskProps> = ({ tagsArray, descr }) => {
    return (<TaskEl>
        <div style={{ display: 'flex', justifyContent: 'start', gap: '1px' }}>
            {tagsArray.map((t) => <Tag key={t} tag={t} />)}
        </div>
        <span>{descr}</span>
    </TaskEl>)
}