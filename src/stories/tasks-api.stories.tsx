import React, {useEffect, useState} from 'react'
import {totoLIstApi} from "../api/todoist-api";

export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "7c95a444-c6ef-47a2-8c0c-0f211fa9af56"
        totoLIstApi.getTasks(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "7c95a444-c6ef-47a2-8c0c-0f211fa9af56"
        const title = 'learn'
        totoLIstApi.createTask(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "7c95a444-c6ef-47a2-8c0c-0f211fa9af56"
        const taskId = "b4282bf0-002b-4820-9a1e-e929aec32010"

        totoLIstApi.deleteTask(todoId, taskId)
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'see'
        const todoId = "7c95a444-c6ef-47a2-8c0c-0f211fa9af56"
        const taskId = "90f81502-7a79-4927-81d9-68cd371fd99f"
        totoLIstApi.updateTasks(todoId, taskId, title)
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

