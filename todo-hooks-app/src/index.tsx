import React from "react";
import ReactDOM from "react-dom";
const { useState } = React;

type TodoLists = {
  content: string | number,
  id: number,
}

const TodoApp: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoLists[]>([]);
  const [value, setValue] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const add = () => {
    const newTodo = { 
      content: value, 
      id: idNumber + 1,
    }
    setTodoList([
      ...todoList,
      newTodo
    ]);
    setIdNumber(idNumber + 1);
  };

  const todoListNode = todoList.map(element => {
    return(
      <li key={element.id}>
        {element.content}
      </li>
    )
  })
  
  return (
    <div>
      <h1>TODO App</h1>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e)}
        />
      <button onClick={() => add()}>追加</button>
      <ul>
        {todoListNode}
      </ul>
    </div>
  );
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);