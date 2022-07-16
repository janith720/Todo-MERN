import React from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import ErrorComponent from "../components/ErrorComponent";
import NoTodosMsg from "../components/NoTodosMsg";

export default function TodoHome() {
  const [text, setText] = React.useState("");
  const [todo, setTodo] = React.useState([]);
  const [isChange, setIsChange] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value.length > 0) {
      setError(false);
    }
  };

  //fetch all todos
  React.useEffect(() => {
    axios.get("todos/").then((res) => setTodo(res.data));
  }, []);

  //add a new todo
  const addTodo = () => {
    if (isChange === "") {
      if (text.length > 2) {
        axios
          .post("todos/", { text: text })
          .then((res) => {
            setTodo([...todo, { _id: res.data._id, text: text }]);
            setText("");
          })
          .catch((err) => console.log(err));
      } else {
        setError(true);
      }
    } else {
      //update a todo
      if (text.length > 2) {
        axios
          .post("todos/", { text: text, _id: isChange })
          .then((res) => {
            setTodo(
              todo.map((val) => {
                return val._id === isChange
                  ? { _id: res.data._id, text: text }
                  : val;
              })
            );
            setText("");
            setIsChange("");
          })
          .catch((err) => console.log(err));
      } else {
        setError(true);
      }
    }
  };

  //get the id todo for update
  const editTodo = (id, newtext) => {
    setIsChange(id);
    setText(newtext);
  };

  //delete a todo
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
      <div className="fullLayout">
        {/* todo input and add button */}
        <div className="inputNadd">
          <input
            type="text"
            placeholder="Enter a Todo"
            value={text}
            onChange={handleChange}
          />

          <button onClick={addTodo}>{isChange ? "Update" : "Add"}</button>
        </div>

        {/* error component */}
        {error && <ErrorComponent />}

        <div className="todosLayout">
          {todo.length < 1 ? (
            <NoTodosMsg />
          ) : (
            todo.map((val, key) => {
              return (
                <TodoItem
                  key={key}
                  todoItem={val.text}
                  edit={() => editTodo(val._id, val.text)}
                  deleted={() => deleteTodo(val._id)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
