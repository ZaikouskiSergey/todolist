import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterKeyType = 'all' | 'active' | 'completed'

function App() {
    /*  let tasks = [
          {id: 1, title: "HTML&CSS", isDone: true},
          {id: 2, title: "JS", isDone: true},
          {id: 3, title: "ReactJS", isDone: false}
      ]*/

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

  /*  let [globalFilterKey, setglobalFilterKey] = useState('all')*/

    const removeTask = (taskId: number) => {
        //tasks = tasks.filter(el => el.id !== taskId)
        //setTasks(tasks)

        setTasks(tasks.filter(el => el.id !== taskId))
    }

 /*   const tasksFilter = (filterKey: FilterKeyType) => {
        setglobalFilterKey(filterKey)
    }
    let collander = tasks
    if (globalFilterKey === "active") {
        collander = tasks.filter(el => el.isDone)
    }
    if (globalFilterKey === "completed") {
        collander = tasks.filter(el => !el.isDone)
    }*/


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}

            />
        </div>
    );
}

export default App;
