import * as React from "react";
import ReactDOM from "react-dom";
const { useState } = React;

type TodoListNodeProps = {
  todoList: TodoListElement[],
}

const TodoListNode: React.FC<TodoListNodeProps> = ({ todoList }) => {
  return (
    <>
      {todoList.map((todoElement :TodoListElement) => {
        return(
          <li key={todoElement.id}>{todoElement.content}</li>
        );
      })}
    </>
  );
}

type TodoListElement = {
  content: string | number,
  id: number,
}

const TodoApp: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoListElement[]>([]);

  const [value, setValue] = useState<string | number>("");
  const [id, setId] = useState<number>(0);
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const add = (): void => {
    const newTodo: TodoListElement = { 
      content: value, 
      id: id + 1,
    }
    setTodoList([
      ...todoList,
      newTodo
    ]);
    setId(id + 1);
    setValue("");
  };
  
  return (
    <div>
      <h1>TODO App</h1>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e)}
        />
      <button onClick={add}>追加</button>
      <ul>
        <TodoListNode
          todoList={todoList}
        />
      </ul>
    </div>
  );
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);