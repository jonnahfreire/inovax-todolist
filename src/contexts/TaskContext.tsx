import { useEffect } from "react";
import { createContext, useState } from "react";
import { sCreateTask, sDeleteTask, sEditTask } from "../services/TaskService";

export interface TaskProps {
    id: string,
    done: boolean,
    text: string
}

interface TaskContextData {
    tasks: TaskProps[],
    tasksDone: number,
    tasksTodo: number,
    createTask: (text: string) => void,
    toggleDone: (id: string) => void,
    editTask: (task: TaskProps) => void
    deleteTask: (id: string) => void
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TasksProvider = ({ children }: any) => {
    const [tasks, setTasks] = useState<TaskProps[]>([
        {
            id: "0",
            done: true,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            id: "1",
            done: false,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
    ])

    const tasksDone = tasks.filter(t => t.done).length
    const tasksTodo = tasks.length - tasksDone

    useEffect(() => {}, [])

    function createTask(text: string): void {
        sCreateTask(text)
    }

    function toggleDone(id: string): void {
        const taskList = tasks.map(t => {
            if(t.id === id) {
                t.done = !t.done
            }
            return t
        })
        
        setTasks(taskList)
    }

    function editTask(task: TaskProps): void {
        sEditTask(task)
    }

    function deleteTask(id: string): void {
        sDeleteTask(id)
    }

    return <TaskContext.Provider value={{
        tasks,
        tasksDone,
        tasksTodo,
        createTask,
        toggleDone,
        editTask,
        deleteTask,
    }}>
        { children }
    </TaskContext.Provider>
}