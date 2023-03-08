import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import { EmptyTasksInfo } from './Task/EmptyTasksInfo';

import { TasksInfo } from './Task/TasksInfo';
import { Task } from './Task/Task';
import { TaskContext } from '../contexts/TaskContext';

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
    const { tasksDone, tasksTodo, tasks } = taskContext;

    return (
        <Wrapper>
            
            <Content>
                <InputContainer>
                    <Input placeholder='Descreva a tarefa aqui' />
                    <Button>Criar tarefa</Button>
                </InputContainer>

                <TasksInfo todo={tasksTodo} done={tasksDone} total={tasks.length}/>

                {!tasks?.length && <EmptyTasksInfo />}
                {tasks?.map(task =>
                    <Task key={task.id} id={task.id} done={task.done} text={task.text} />
                )}
            </Content>
        </Wrapper>
    );
}