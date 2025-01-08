import { TaskEl, Tag } from "./StyledTask"
import { tags } from "../../utils/styles";

export interface TaskProps {
    tagsArray: (keyof typeof tags)[];
    descr: string;
}


export const Task: React.FC<TaskProps> = ({ tagsArray, descr }) => {
    return (<TaskEl>
        <div style={{ display: 'flex', justifyContent: 'start', gap: '1px' }}>
            {tagsArray.map((t) => <Tag tag={t} />)}
        </div>
        <span>{descr}</span>
    </TaskEl>)
}