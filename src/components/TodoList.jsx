import { useReducer } from "react";
import todoReducer from "../reducers/todoReducer";

const initialState = {
  isDarkMode: true,
  todos: [],
};

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    //console.log(text);
    //yeni bir eleman olusturulacagini reducura haber ver
    dispatch({ type: "CREATE", payload: text });
  };

  return (
    <div
      className={`vh-100 vw-100 ${
        state.isDarkMode ? "bg-dark text-white" : "bg-white text-black"
      }`}
    >
      <div className="container p-5">
        <div className=" d-flex justify-content-between align align-items-center">
          <h2 className="text-center">Todo List</h2>
          <button
            className="btn btn-warning"
            onClick={() => dispatch({ type: "CHANGE_THEME" })}
          >
            Mod Değiştir
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="d-flex gap-3 align-items-center my-5"
        >
          <input className="form-control shadow" type="text" />
          <button className="btn btn-info shadow">Gönder</button>
        </form>
        <ul className="list-group">
          {state.todos.map((todo) => (
            <li key={todo.id} className="list-group-item">
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
