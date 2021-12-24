import { IsOnlineBadge, MyButton, LanguageSelector } from "./components";
import {Landing} from "./pages";
import { useState } from "react";
// import Button from '@mui/material/Button'

function App() {
  const [language, setLanguage] = useState("English");
  return (
    <div>
      <div>
        <IsOnlineBadge isOnline={true} />
      </div>
      <LanguageSelector language={language} handleChange={setLanguage} />
      <Landing />
      <MyButton
        label="Hello world"
        backgroundColor="red"
        handleClick={() => console.log("hi")}
      />
    </div>
  );
}

export default App;
