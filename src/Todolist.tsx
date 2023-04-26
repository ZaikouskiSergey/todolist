import React, {ChangeEvent, useRef, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {logDOM} from "@testing-library/react";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
// const TodoList = (props: TodoListPropsType) => {
//     const taskTitleInput = useRef<HTMLInputElement>(null)
//     const addTaskHandler = ()=>{
//         if(taskTitleInput.current){
//             props.addTask(taskTitleInput.current.value)
//             taskTitleInput.current.value = ""
//         }
//     }
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        const removeTask = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const taskClasses = task.isDone ? "task-isDone" : "task"
        return (
            <li key={task.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span className={taskClasses}>{task.title}</span>
                </div>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long!</div>
        : null
    const userMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler()
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined

    const removeTodoListHandler=()=>{
        props.removeTodoList(props.todoListId)
    }
    return (
        <div className="todolist">
            <header className="todoList-header">
                <h2>{props.title}</h2>
                <button onClick={removeTodoListHandler}>x</button>
            </header>
            <div>
                <input
                    placeholder="Please, enter title"
                    value={title}
                    onChange={setTitleHandler}
                    //ref={taskTitleInput}
                    onKeyDown={addTaskOnKeyPressHandler}
                    className={inputClasses}
                />
                <button
                    disabled={isAddBtnDisabled}
                    //onClick={addTaskHandler}
                    onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div className={"filter-btn-wrapper"}>
                <button
                    className={props.filter === "all"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;