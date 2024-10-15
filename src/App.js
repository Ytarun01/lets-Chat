import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Chat from "./components/chat";
import { Container } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="sm" sx={{ paddingTop: "20px" }}>
        <Chat />
      </Container>
    </Provider>
  );
}

export default App;
