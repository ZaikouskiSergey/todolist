import  {useState, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodoLIstAC,
    changeTodoListFilterAC,
    changeTodoLIstTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./reducers/TodoListsReducer";
import {
    addNewTodoLIstAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/TasksReducer";


//CRUD
//C-create
//R-read (filter, search, sort)
//U-update
//D-delete

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type TasksStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS/ES6&TS", isDone: true},
            {id: v1(), title: "REACT/REDUX", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "BREAD", isDone: false}
        ],
    })
    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
       /* const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: updatedTasks})*/
        dispatchTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, newIsDoneValue, todoListId))
      /*  const updatedTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, isDone: newIsDoneValue}
            : t
        )
        setTasks({...tasks, [todoListId]: updatedTasks})*/
    }
    const changeTaskTitle=(taskId: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, title, todoListId))
       /* const updatedTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, title: title}
            : t
        )
        setTasks({...tasks, [todoListId]: updatedTasks})*/
    }

    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        dispatchTodoLists(changeTodoListFilterAC(nextFilter, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchTodoLists(removeTodoListAC(todoListId))
        delete tasks[todoListId]
    }
    const addTodoLIst = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        dispatchTodoLists(addTodoLIstAC(newTodo))
        dispatchTasks(addNewTodoLIstAC(newTodo.id))
        /*setTasks({...tasks, [newTodo.id]:[]})*/

    }
    const changeTodoLIstTitle =  (title: string, todoListId: string) => {
        dispatchTodoLists(changeTodoLIstTitleAC(title, todoListId))
    }
    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const todoListComponents: JSX.Element[] = todoLists.map(tl => {
        const tasksWhatIWantToSee = getTasksForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksWhatIWantToSee}

                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoLIstTitle={changeTodoLIstTitle}
    />
        )

    })
    return (
        <div className="App">
            <AddItemForm titleMaxLength={25} addItem={addTodoLIst}/>
            {todoListComponents}
        </div>
    );
}

export default App;
