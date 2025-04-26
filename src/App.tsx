import React, { useState, useEffect } from 'react';
import './index.css';

interface Todo {
  id: string;
  message: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), message: text.trim(), completed: false }
    ]);
    setText('');
  };

  const toggle = (id: string) =>
    setTodos(t =>
      t.map(x => x.id === id ? { ...x, completed: !x.completed } : x)
    );

  const remove = (id: string) =>
    setTodos(t => t.filter(x => x.id !== id));

  return (
    <div className="todo-app">
      <header className="header">
        <h1>My Todo List</h1>
      </header>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="What needs doing?"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>＋</button>
      </div>

      <ul className="todo-list">
        {todos.map(t => (
          <li key={t.id} className={`todo-item ${t.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggle(t.id)}
            />
            <span className="todo-text">{t.message}</span>
            <button className="delete-btn" onClick={() => remove(t.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
