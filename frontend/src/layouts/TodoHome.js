import React from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

export default function TodoHome() {
  const [text, setText] = React.useState("");
  const [todo, setTodo] = React.useState([]);
  const [isChange, setIsChange] = React.useState("");

  React.useEffect(() => {
    axios.get("todos/").then((res) => setTodo(res.data));
  }, []);

  const addTodo = () => {
    if (isChange === "") {
      axios
        .post("todos/", { text: text })
        .then((res) => {
          setTodo([...todo, { _id: res.data._id, text: text }]);
          setText("");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("todos/", {  text: text, _id: isChange })
        .then((res) => {
          setTodo(todo.map((val) => {
            return val._id === isChange ? { _id: res.data._id, text: text } : val
          }))
          setText("");
          setIsChange("");
        })
        .catch((err) => console.log(err));
    }
  };

  const editTodo = (id, newtext) => {
    setIsChange(id);
    setText(newtext);
  };

  const deleteTodo = (id) => {
    axios.delete(`todos/${id}`).then(() => {
      setTodo(
        todo.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  return (
    <div>
      <h1>TODO APP</h1>
      <div className="inputNadd">
        <input
          type="text"
          placeholder="Enter a Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addTodo}>{isChange ? "Update" : "Add"}</button>
      </div>
      <div className="todosLayout">
        {todo.map((val, key) => {
          return (
            <TodoItem
              key={key}
              todoItem={val.text}
              edit={() => editTodo(val._id, val.text)}
              deleted={() => deleteTodo(val._id)}
            />
          );
        })}
      </div>
    </div>
  );
}
