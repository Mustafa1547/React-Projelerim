import { useState } from 'react'
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'


function App() {

  const [todos, setTodos] = useState([])

  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo]);

  }
  const removeTodo = (todoId) => {
    setTodos([...todos.filter((todo) => todo.id != todoId)]);  //çıkarma butonuna bastığımda bastığım todo id si ile listemdeki todo nun id si le aynı değilse bu todoları al filtrele ve tekrardan yeni dizi oluştur böylece çıkardığım todo hariç diğer todolar ekran da listelenir.

  }

  const updateTodo = (newTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id != newTodo.id) {
        return todo;
      }
      return newTodo;
    })
    setTodos([...updatedTodos]);
  }

  return (

    <div className='App'>
      <div className='main'>
        <TodoCreate onCreateTodo={createTodo} />
        <TodoList todos={todos} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} />
      </div>

    </div>

  )
}

export default App
