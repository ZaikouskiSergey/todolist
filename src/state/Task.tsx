import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type TaskPropsType={
    todolistId: string
    tasks: TaskType
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void

}
export const Task: React.FC<TaskPropsType> = memo(({removeTask,changeTaskTitle,changeTaskStatus, tasks, todolistId }) => {
    const onClickHandler = () => removeTask(tasks.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(tasks.id, newIsDoneValue, todolistId);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(tasks.id, newValue, todolistId);
    }
    return (
        <div className={tasks.isDone ? "is-done" : ""}>
            <Checkbox
                checked={tasks.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={tasks.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>


    );
})

export default Task;