import { TodoListElement } from "domain/entity";
import TodoListNode from "component/TodoElement"
import AddTodo from "component/AddTodo";
import UpdateTodo from "component/UpdateTodo";

import * as React from "react";
const { useState } = React;

const TodoApp: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoListElement[]>([]);
  const [value, setValue] = useState<string | number>("");
  const [id, setId] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTodoId, setEditTodoId] = useState<number>(0);

  const handleAdd = (todoElement: TodoListElement): void => {
    setTodoList([
      ...todoList,
      todoElement
    ]);
    setId(id + 1);
    setValue("");
  };

  const handleEdit = (todoElement: TodoListElement): void => {
    setIsEditMode(true);
    setValue(todoElement.content);
    setEditTodoId(todoElement.id);
  }

  const handleUpdate = (newTodoList: TodoListElement[]): void => {
    setTodoList(newTodoList);
    setValue("");
    setIsEditMode(false);
    setEditTodoId(0);
  }

  const handleCancel = (): void => {
    setValue("");
    setIsEditMode(false);
    setEditTodoId(0);
  }
  
  return (
    <div>
      <h1>TODO App</h1>
      {isEditMode 
        ? <UpdateTodo 
            onChange={setValue}
            value={value}
            todoList={todoList}
            editTodoId={editTodoId}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        : <>
            <AddTodo
              onChange={setValue}
              value={value}
              id={id}
              onAdd={handleAdd}
            />
            <ul>
              <TodoListNode
                todoList={todoList}
                onDelete={setTodoList}
                onEdit={handleEdit}
              />
            </ul>
          </>
      }
    </div>
  );
}

export default TodoApp;