import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

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


}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')
    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
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
    let removeTaskHandler = (tID:string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <Button name={'+'} callBack={addTaskHandler}/>

        </div>
        <ul>
            {
                props.tasks.map(t => {
                      /*  let removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }*/
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <Button name={'X'} callBack={()=>removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )

            }
        </ul>
        <div>
            <Button name={'All'} callBack={()=> tsarChangeFilterHandler('all')}/>
            <Button name={'Active'} callBack={()=> tsarChangeFilterHandler('active')}/>
            <Button name={'Completed'} callBack={()=> tsarChangeFilterHandler('completed')}/>

        </div>
    </div>
}
