import React, {useState} from 'react';
import {FilterKeyType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId:number) => void
}

export function Todolist (props: PropsType) {
    let [globalFilterKey, setGlobalFilterKey] = useState('all')
    const tasksFilter = (filterKey: FilterKeyType) => {
        //засетай filterKey в globalFilterKey
        setGlobalFilterKey(filterKey)
    }
    const collanderFoo=()=> {
        let collander = props.tasks
        if (globalFilterKey === 'active') {
            collander = props.tasks.filter(el => !el.isDone)
        }
        if (globalFilterKey === 'completed') {
            collander = props.tasks.filter(el => el.isDone)
        }
        return collander
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {collanderFoo().map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={() => {props.removeTask(el.id)}}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={()=> tasksFilter('all')}>All</button>
            <button onClick={()=> tasksFilter('active')}>Active</button>
            <button onClick={()=> tasksFilter('completed')}>Completed</button>
        </div>
    </div>
}
