import React from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type TaskPropsType={
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void

}
const Task: React.FC<TaskPropsType> = ({id,removeTask,changeTaskTitle,changeTaskStatus }) => {
    return (
        <div key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
                checked={t.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>


    );
};

export default Task;