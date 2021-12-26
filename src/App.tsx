import { Layout, IsOnlineBadge, MyButton, LanguageSelector } from "./components";
import { Landing } from "./pages";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";

function App() {
  const [language, setLanguage] = useState("English");
  return (
    <Layout>
      <Typography variant="h1" align="center">
        Welcome to TipXMR
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <IsOnlineBadge isOnline={true} />
        </Grid>
        <Grid item>
          <IsOnlineBadge isOnline={false} />
        </Grid>
        <LanguageSelector language={language} handleChange={setLanguage} />
        <Landing />
        <MyButton
          label="Hello world"
          backgroundColor="red"
          handleClick={() => console.log("hi")}
        />
      </Grid>
    </Layout>
  );
}

export default App;
