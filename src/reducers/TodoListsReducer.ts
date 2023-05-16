import {FilterValuesType, TodoListType} from "../App";

export const todoListsReducer = (todolist: TodoListType[], action: GeneralType):TodoListType[] => {
    switch (action.type) {
        case ('CHANGE-TODO-LIST-FILTER'): {
            return todolist.map(tl => tl.id === action.payload.todoListId
                ? {...tl, filter: action.payload.nextFilter} : tl)
        }
        case ("REMOVE-TODOLIST"): {
            return todolist.filter(tl => tl.id !== action.payload.todoListId)
        }
        case ("ADD-TODOLIST"): {
            return [...todolist, action.payload.newTodo]
        }
        case ("CHANGE-TODOLIST-TITLE"): {
            return todolist.map(td => td.title ===action.payload.todoListId
            ? {...td, title: action.payload.title} : td)
        }
        default:
            return todolist
    }
}

type GeneralType = ChangeTodoListFilterACType | RemoveTodoListACType | AddTodoLIstACType | ChangeTodoLIstTitleAC

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (nextFilter: FilterValuesType, todoListId: string) => {
    return {
        type: "CHANGE-TODO-LIST-FILTER",
        payload: {
            nextFilter,
            todoListId
        }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todoListId}
    } as const
}

type AddTodoLIstACType = ReturnType<typeof addTodoLIstAC>
export const addTodoLIstAC = (newTodo: TodoListType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTodo}

    } as const
}

type ChangeTodoLIstTitleAC = ReturnType<typeof changeTodoLIstTitleAC>
export const changeTodoLIstTitleAC = (title: string, todoListId: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title,
            todoListId
        }
    } as const
}