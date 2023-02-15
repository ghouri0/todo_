import "./App.css";
import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
import "./components/styles/styles.css";

function App() {
  return (
    <div className="App">
      <AddItem/>
      <div className="list">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
