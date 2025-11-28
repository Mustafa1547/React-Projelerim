
import React, { useState } from 'react';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import type { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodo } from '../redux/todoSlice';

interface TodoProps {
  todoProps: TodoType
}

function Todo({ todoProps }: TodoProps) {

  const { id, content } = todoProps;
  const [editable, setEditable] = useState<boolean>(false);

  const [newTodo, setNewTodo] = useState<string>(content);

  const dispatch = useDispatch();

  const handleRemoveTodo = () => {
    dispatch(removeTodoById(id))
  }

  const handleUpdatdeTodo = () => {
    const payload: TodoType = {
      id: id,
      content: newTodo

    }
    dispatch(updateTodo(payload));
    setEditable(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", border: "1px solid lightgrey", padding: "16px", marginTop: "25px", borderRadius: "5px" }}>

      {
        editable ? <input type='text' style={{ width: "400px", border: "none", borderBottom: "1px solid lightgrey", outline: "none" }}
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
        /> : <div>{content}</div>

      }
      <div>
        <IoIosRemoveCircleOutline onClick={handleRemoveTodo} className='icons' style={{ marginRight: "8px" }} />
        {editable ? <FaCheck onClick={handleUpdatdeTodo} className='icons' /> : <FaEdit onClick={() => setEditable(true)} className='icons' />}

      </div>
    </div>
  )
}

export default Todo