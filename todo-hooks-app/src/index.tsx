import * as React from "react";
import ReactDOM from "react-dom";
const { useState } = React;

type TodoListNodeProps = {
  todoList: TodoListElement[],
  onDelete: (id: number) => void,
  onEdit: (todoElement: TodoListElement) => void,
}

const TodoListNode: React.FC<TodoListNodeProps> = ({ todoList, onDelete, onEdit }) => {
  return (
    <>
      {todoList.map((todoElement: TodoListElement) => {
        return(
          <li key={todoElement.id}>
            {todoElement.content}
            <Button
              buttonText="削除"
              onClick={() => onDelete(todoElement.id)}
            />
            <Button
              buttonText="編集"
              onClick={() => onEdit(todoElement)}
            />
          </li>
        );
      })}
    </>
  );
}

type ButtonProps = {
  buttonText: string,
  onClick: () => void,
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return(
    <button onClick={onClick}>{buttonText}</button>
  )
}

type TextInputProps = {
  value: string | number,
  onChange: (e: string | number) => void,
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return(
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

type AddTodoProps = {
  onChange: (e: string | number) => void,
  value: string | number,
  id: number,
  onAdd: (todoElement: TodoListElement) => void,
}

const AddTodo: React.FC<AddTodoProps> = ({ onChange, value, id, onAdd }) => {
  const add = (): void => {
    const todoElement = {
      content: value,
      id: id + 1,
    }
    onAdd(todoElement)
  }

  return(
    <>
      <TextInput
        value={value}
        onChange={onChange}
      />
      <Button
        buttonText="追加"
        onClick={add}
      />
    </>
  )
}

type UpdateTodoProps = {
  onChange: (value: string | number) => void,
  value: string | number,
  todoList: TodoListElement[],
  editTodoId: number,
  onUpdate: (newTodoList: TodoListElement[]) => void,
  onCancel: () => void,
}

const UpdateTodo: React.FC<UpdateTodoProps> = ({ onChange, value, todoList, editTodoId, onUpdate, onCancel }) => {
  const update = (): void => {
    let newTodoList: TodoListElement[] = todoList.concat()
    newTodoList.map((todoElement) => {
      if (todoElement.id === editTodoId) {
        todoElement.content = value
      }
    })
    onUpdate(newTodoList)
  }
  
  return(
    <>
      <TextInput
        value={value}
        onChange={onChange}
      />
      <Button
        buttonText="更新"
        onClick={update}
      />
      <Button
        buttonText="キャンセル"
        onClick={onCancel}
      />
    </>
  )
}

type TodoListElement = {
  content: string | number,
  id: number,
}

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

  const handleDelete = (id: number): void => {
    let newTodoList: TodoListElement[] = todoList.concat()
    let index: number = 0
    newTodoList.map((element, idx) => {
      if (element.id === id) {
        index = idx
      }
    })
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }

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
              onAdd={todoElement => handleAdd(todoElement)}
            />
            <ul>
              <TodoListNode
                todoList={todoList}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </ul>
          </>
      }
    </div>
  );
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);