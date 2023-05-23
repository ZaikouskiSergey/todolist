import {TasksStateType} from "../../src_with_reducer/App";



export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(td => td.id !== action.payload.idTask)
            }
        }
        case "ADD-TASK": {
            let task = {id: '4', title: action.payload.newTitle, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]:
                    [task, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS" : {
            const {id, isDone, todolistId} = action.payload
            return { ...state,
                [todolistId]:
                    state[todolistId].map(t => t.id === id
                        ? {...t, isDone}: t)

            }
        }
        case "CHANGE-TASK-TITLE" : {
            const {id, newTitle, todolistId}=action.payload
            return {...state,
            [todolistId]: state[todolistId].map(t=> t.id===id
                ? {...t, title: newTitle} : t)}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

type ActionsType = RemoveTaskAC | AddTaskAC | ChangeTaskStatusAC | ChangeTaskTitleAC

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (idTask: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            idTask,
            todolistId
        }
    } as const
}


type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (newTitle: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            newTitle,
            todolistId
        }
    } as const
}
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}


type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string)=>{
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId
        }
    } as const
}