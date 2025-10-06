import { useState } from "react";
import DefectTable from "./components/DefectTable";
import MainPage from "./pages/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainPage></MainPage>
    </>
  );
}

export default App;
