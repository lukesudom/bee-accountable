import Header from "../components/Calendar/Header";
import Calendar from "../components/Calendar/Calendar";
import CalendarState from "../components/Context/CalendarContext";
import TaskForm from "../components/Calendar/Taskform";


function App() {
  
  return (
    <div className="container">
      <CalendarState>
        <Header />
        <Calendar />
        <TaskForm/>
      </CalendarState>
    </div>
  );
}

export default App;