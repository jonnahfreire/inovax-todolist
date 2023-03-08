import { TaskProps } from "../contexts/TaskContext";

export async function sCreateTask(text: string): Promise<void> {
    
}

export async function sEditTask(task: TaskProps): Promise<void> {}

export async function sToggleTaskDone(task: TaskProps): Promise<void> {}

export async function sDeleteTask(id: string): Promise<void> {}