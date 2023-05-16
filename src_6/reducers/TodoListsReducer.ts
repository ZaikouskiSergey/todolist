import {FilterValuesType, TodoListType} from "../App";

export const todoListsReducer=(todolist:TodoListType[], action: GeneralType)=>{
    switch (action.type){
        case ('CHANGE-TODO-LIST-FILTER'): {
            return todolist.map(tl=> tl.id === action.payload.todoListId
            ? {...tl, filter: action.payload.nextFilter} : tl)
        }
        case ("REMOVE-TODOLIST"): {
            return todolist.filter(tl=> tl.id !== action.payload.todoListId)
        }

        default: return todolist
    }
}

type GeneralType = ChangeTodoListFilterACType | RemoveTodoListACType | AddTodoLIstACType

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC =(nextFilter: FilterValuesType, todoListId: string)=>{
    return {
        type: "CHANGE-TODO-LIST-FILTER",
        payload: {
            nextFilter,
            todoListId
            }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string)=>{
    return {
        type: "REMOVE-TODOLIST",
        payload: {todoListId}
    } as const
}

type AddTodoLIstACType = ReturnType<typeof addTodoLIstAC>
export const addTodoLIstAC =(title: string)=>{
    return {
        type: "ADD-TODOLIST",
        payload: {title}
    }
}