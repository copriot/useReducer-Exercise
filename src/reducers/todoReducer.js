const todoReducer = (state, action) => {
    //console.log(state)
    //changetheme aksiyonu dispatch edilince statein nasil degisecegine karar verdik
    //degistirilmeyecek degerlerin return edilen state icerisinde kalmaya devam etmesi spread operator statein son halinin degerlerini dagitarak elde ediyoruz.
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, isDarkMode: !state.isDarkMode };

        case "CREATE":

            //kaydedilecek olan todo nesnesini hazirla
            const newTodo = { id: new Date().getTime(), text: action.payload }
            //yeni todoyu önceki todolarin arasina ekle(yeni dizi gerekiyor)

            const updated = [...state.todos, newTodo]
            // const updated2 = state.todos.concat(newTodo)

            //statein güncel halini belirle
            return { ...state, todos: updated };

        case "DELETE":
            // aksiyonun payloadi ile gelen idli elemanı diziden kaldir
            const filteredTodos = state.todos.filter((i) => i.id !== action.payload)

            //statei güncelle
            return { ...state, todos: filteredTodos };

        case "UPDATE_TODO":
            const { id, newText } = action.payload;
            const updatedTodos = state.todos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            );
            return { ...state, todos: updatedTodos };

    };





};
export default todoReducer;