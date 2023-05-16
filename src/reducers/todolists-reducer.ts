import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: GeneralType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            };
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el =>
                el.id === action.payload.id
                    ? {...el, title: action.payload.title}
                    : el)
        }
        case "CHANGE-TODOLIST-FILTER" : {
            return state.map(el => el.id === action.payload.id
                ? {...el, filter: action.payload.filter} : el)
        }

        default:
            return state
    }
}
type GeneralType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleAC | ChangeFilterAC
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}
type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId
        }
    } as const
}

type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}
type ChangeFilterAC= ReturnType<typeof changeFilterAC>
export const changeFilterAC =(id: string, filter: FilterValuesType)=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter}
    } as const

}