import { useContext, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';

import { EmptyTasksInfo } from './Task/EmptyTasksInfo';

import { TasksInfo } from './Task/TasksInfo';
import { Task } from './Task/Task';
import { TaskContext, TaskProps } from '../contexts/TaskContext';
import { ToastDialog } from './utils/Utilities';

const Wrapper = tw.div`
  flex flex-1
  items-center
  justify-center

  w-full h-full
  sm:mt-10
`
const Content = tw.div`
    flex flex-col
    w-full
    sm:w-2/3
    p-5
`
const InputContainer = tw.div`
    flex
    flex-row
    justify-between
`
const Input = tw.input`
    flex-1 
    pl-2 mr-2
    text-sm 
    bg-[#F2F2F2] 
    outline-0 
    border border-[#1B1D37] rounded
    focus-visible:text-sm 
    focus-visible:font-semibold
`
const Button = tw.button`
    font-semibold 
    text-white sm:text-sm text-[.6rem]
    px-2 py-1.5 
    rounded 
    bg-[#1B1D37]
    hover:bg-[#1B1D37]/[0.9] 
    hover:ease-in duration-200
    `


export const MainStack = () => {
    const taskContext = useContext(TaskContext);
    const { tasksDone, tasksTodo, tasks, createTask } = taskContext;
    const [text, setText] = useState<string>('');
    const [created, setCreated] = useState(false);

    const timerRef = useRef(0);

    function handleChangeToast() {
        setCreated(!created)

        timerRef.current = window.setTimeout(() => {
            setCreated(false)
        }, 100);

        return () => clearTimeout(timerRef.current);
    }

    function save(task: TaskProps): void {
        taskContext.editTask(task)
    }

    function _delete(id: string): void {
        taskContext.deleteTask(id)
    }

    function create() {
        if (!text) return;

        createTask(text);
        setCreated(true);
        setText("");
    }

    return (
        <Wrapper>
            <Content>
                <InputContainer>
                    <Input
                        value={text}
                        placeholder='Descreva a tarefa aqui'
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button onClick={create}>Criar tarefa</Button>
                </InputContainer>

                <TasksInfo todo={tasksTodo} done={tasksDone} total={tasks.length} />

                {!tasks?.length && <EmptyTasksInfo />}
                {tasks?.map(task =>
                    <Task key={task.id} task={task} actions={{ save, delete: _delete }} />
                )}

                {created &&
                    <ToastDialog
                        isOpen={created}
                        handleOpen={handleChangeToast}
                        handleClose={handleChangeToast}
                    />
                }
            </Content>
        </Wrapper>
    );
}