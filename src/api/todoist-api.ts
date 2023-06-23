import axios from "axios";

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
    },
    getTasks(todoId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseTasksType<TaskType>>(`todo-lists/${todoId}/tasks`, {todoId, title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTasks(todoId: string, taskId: string, title: string) {
        return instance.put<ResponseTasksType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`, {title})
    }
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type ResponseTasksType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D

}

type GetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}




