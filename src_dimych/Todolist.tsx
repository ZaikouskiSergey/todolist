import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import s from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void


}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string| null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() === '') {
            setError("Title is required")
            return
        }
        props.addTask(newTitle.trim())
        setNewTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
        setError(null)
    }
    /*    const changeFilterAllHandler=()=>{
            props.changeFilter("all")
        }
        const changeFilterActiveHandler=()=>{
            props.changeFilter("active")
        }
        const changeFilterCompletedHandler=()=>{
            props.changeFilter("completed")
        }*/

    const tsarChangeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)

    }
    let removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? s.error : ""}
            />
            <Button name={'+'} callBack={addTaskHandler}/>

            {error && <div className={s.error_message}>
                {error}
            </div>}

        </div>
        <ul>
            {
                props.tasks.map(t => {
                        /*  let removeTaskHandler = () => {
                              props.removeTask(t.id)
                          }*/
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone? s.is_done : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
                                <Button name={'X'} callBack={() => removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )

            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => tsarChangeFilterHandler('all')}/>
            <Button name={'Active'} callBack={() => tsarChangeFilterHandler('active')}/>
            <Button name={'Completed'} callBack={() => tsarChangeFilterHandler('completed')}/>

        </div>
    </div>
}
