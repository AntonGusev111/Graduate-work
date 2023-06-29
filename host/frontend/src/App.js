import "./App.css";
import { MyRouter } from "./router/router";
import { TopBar } from "./components/TopBar";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <>
      <div className="MainConteiner">
        <TopBar />
        <div className="bodyArea">
          <SideBar />
          <MyRouter />
        </div>
      </div>
    </>
  );
}

export default App;
