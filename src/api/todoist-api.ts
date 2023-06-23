import axios from "axios";

const settings = {
    withCredentials: true
}
const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {}
    }
)
export const totoLIstApi = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodoLists(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodoLists(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    }
}

type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}



