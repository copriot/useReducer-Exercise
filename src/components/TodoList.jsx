import { useReducer, useEffect, useState } from "react";
import todoReducer from "../reducers/todoReducer";

const initialState = {
  isDarkMode: true,
  todos: [],
};

// Local Storage'dan veri yükleme
const loadFromLocalStorage = () => {
  const savedState = localStorage.getItem("todoState");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return initialState;
};

// Local Storage'a veri kaydetme
const saveToLocalStorage = (state) => {
  localStorage.setItem("todoState", JSON.stringify(state));
};

const TodoList = () => {
  // State'i localStorage'dan yükleyin
  const [state, dispatch] = useReducer(todoReducer, loadFromLocalStorage());

  // State değiştikçe localStorage'a kaydet
  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  const [editMode, setEditMode] = useState(null); // Düzenleme modunu yönetmek için
  const [editText, setEditText] = useState(""); // Düzenleme formundaki metin

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    dispatch({ type: "CREATE", payload: text });
    e.target.reset();
  };

  const handleEdit = (todo) => {
    setEditMode(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_TODO",
      payload: { id: editMode, newText: editText },
    });
    setEditMode(null);
    setEditText("");
  };

  return (
    <div
      className={`vh-100 vw-100 ${
        state.isDarkMode ? "bg-dark text-white" : "bg-white text-black"
      }`}
    >
      <div className="container p-5">
        <div className="d-flex justify-content-between align-items-center">
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
        {editMode && (
          <form onSubmit={handleUpdate} className="mb-3">
            <input
              className="form-control shadow"
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button className="btn btn-warning shadow mt-1">Güncelle</button>
          </form>
        )}
        <ul className="list-group">
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{todo.text}</span>
              <div className="d-flex gap-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="btn btn-success"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
                  className="btn btn-danger"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
