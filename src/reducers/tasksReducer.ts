import {TasksStateType, TodoListType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";

export const tasksReducer = (tasks: TasksStateType, action: GeneralType): TasksStateType => {
    switch (action.type) {
        case ("REMOVE-TASK"): {
            return {
                ...tasks,
                [action.payload.todoListId]:
                    tasks[action.payload.todoListId].filter(t =>
                        t.id !== action.payload.taskId)
            }

        }
        case ("ADD-TASK"): {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...tasks,
                [action.payload.todoListId]:
                    [newTask, ...tasks[action.payload.todoListId]]
            }
        }
        case("CHANGE-TASK-STATUS"): {
            return {
                ...tasks,
                [action.payload.todoListId]:
                    tasks[action.payload.todoListId].map(t =>
                        t.id === action.payload.taskId
                            ? {...t, isDone: action.payload.newIsDoneValue}
                            : t)
            }
        }
        case ("CHANGE-TASK-TITLE"): {
            return {
                ...tasks,
                [action.payload.todoListId]:
                    tasks[action.payload.todoListId].map(t =>
                        t.id === action.payload.taskId
                            ? {...t, title: action.payload.title}
                            : t)
            }
        }
        case ("ADD-TODO-LIST"):{
            return {...tasks, [action.payload.idTD]: []}
        }

        default:
            return tasks
    }
}
type GeneralType = RemoveTaskAC | AddTaskAC | ChangeTaskStatusAC | ChangeTaskTitleAC | AddNewTodoLIstAC;

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskId,
            todoListId
        }
    } as const
}

type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todoListId
        }
    } as const
}


type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            newIsDoneValue,
            todoListId
        }
    } as const
}


type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskId,
            title,
            todoListId
        }
    } as const
}

type AddNewTodoLIstAC = ReturnType<typeof addNewTodoLIstAC>
export const addNewTodoLIstAC = (idTD:string) => {
    return {
        type: "ADD-TODO-LIST",
        payload: {idTD}
    } as const
}

