import tw from 'tailwind-styled-components';
import styled from 'styled-components'

import Delete from '../../assets/Trash.png'
import Edit from '../../assets/NotePencil.png'
import Cancel from '../../assets/close.png'
import Save from '../../assets/save.png'

import { TaskContext, TaskProps } from '../../contexts/TaskContext';
import { MutableRefObject, useContext, useRef, useState } from 'react';


const TaskWrapper = tw.div`
    flex flex-row
    mt-3
    max-h-18
`
const CheckBoxWrapper = tw.div`
    flex 
    justify-center 
    items-center 
    bg-[#1B1D37] 
    w-12 
    rounded-l
`

const CheckBox = styled.input.attrs({ type: "checkbox" })`
    background-color: #797979;
    padding: 1px;
    border-radius: 2px;
    height: 1.3rem;
    width: 6rem;
    outline: none;
`;

const TaskTextWrapper = tw.div`
    flex flex-1 
    bg-[#1B1D37] 
    h-18 
    ml-1 mr-1 
    px-3 py-1  
    text-white text-[.8rem] font-bold 
`

const TaskText = styled.p`
    min-height: 18px; 
    text-overflow: ellipsis;
`

const ActionsWrapper = tw.div`flex flex-col w-8`

const Actions = tw.div`
    flex flex-1 
    justify-center items-center
    p-1
`
const ActionDelete = tw(Actions)`
    bg-[#CE0000] 
    rounded-tr 
    mb-1
`
const ActionEdit = tw(Actions)`
    bg-[#797979]
    rounded-br
`

const EditableField = tw.input`
    bg-[#1B1D37] 
    h-full
    w-full
    border-0
    outline-0
    text-white text-[.8rem] font-bold
    resize-none
`

interface ActionButtonProps {
    click: React.MouseEventHandler<HTMLButtonElement>,
    w: number,
    h: number,
    source: string
}

const ActionButton = (actions: ActionButtonProps) => {
    return (
        <button className='outline-0' onClick={actions.click}>
            <img src={actions.source} alt='action-button' width={actions.w} height={actions.h}/>
        </button>
    )
}

export const Task = ({ id, done, text }: TaskProps) => {
    const taskContext = useContext(TaskContext)

    const [ isEditing, setIsEditing ] = useState(false)
    const [ edited, setEditedValue ] = useState(text)

    function handleToggleDone() {
        isEditing && setIsEditing(false)
        taskContext.toggleDone(id)
    }

    function handleEdit() {
        done && taskContext.toggleDone(id)
        !isEditing && setIsEditing(true)
    }

    function handleDeleteTask() {
        // done && taskContext.toggleDone(id)
        // !isEditing && setIsEditing(true)
    }

    function handleCancelEdit() {
        setIsEditing(false)
    }

    function handleSaveEdited() {
        const editedTask = {id, done, text: edited}
        taskContext.editTask(editedTask)
        setIsEditing(false)        
    }

    function handleEditValue(event: React.ChangeEvent<HTMLInputElement>) {
        setEditedValue(event.target.value)
    }

    return (
        <TaskWrapper>
            <CheckBoxWrapper>
                <CheckBox onChange={handleToggleDone} checked={done ? true : false} />
            </CheckBoxWrapper>
            <TaskTextWrapper >
                {!isEditing &&
                    <TaskText className={`${done && "line-through text-[#636AC7]"}`}>{text}</TaskText>
                }

                {isEditing && <EditableField value={edited} onChange={handleEditValue} /> }
            </TaskTextWrapper>
            <ActionsWrapper>
                <ActionDelete className={`${isEditing && 'py-3'}`}>
                    {!isEditing && 
                        <ActionButton source={Delete} w={20} h={20} click={handleDeleteTask}/>
                    }

                    {isEditing && 
                        <ActionButton source={Cancel} w={12} h={10} click={handleCancelEdit}/>
                    }
                </ActionDelete>
                <ActionEdit className={`${isEditing && 'py-3'}`}>
                    {!isEditing && 
                        <ActionButton source={Edit} w={20} h={20} click={handleEdit}/>
                    }

                    {isEditing && 
                        <ActionButton source={Save} w={15} h={12} click={handleSaveEdited}/>
                    }
                </ActionEdit>
            </ActionsWrapper>
        </TaskWrapper>
    );
}