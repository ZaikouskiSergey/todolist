import {TaskType} from "../../src_6/TodoList";
import {v1} from "uuid";


export const tasksReducer = (state: TaskType[], action: TsarType):TaskType[] => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // let filteredTasks = tasks.filter(t => t.id != id);
            // setTasks(filteredTasks);
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return [newTask, ...state]
        }

        default:
            return state

    }
}
type TsarType = RemoveTaskACType | addTaskACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: id
        }
    } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string) => {
    return {
        type: "ADD-TASK",
        payload: {title}
    } as const
}