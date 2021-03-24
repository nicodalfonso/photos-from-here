import React, { ReactElement } from "react";
import { Header, PhotoFrame } from "./components";

const App = (): ReactElement => {
  return (
    <div className="App">
      <Header />
      <PhotoFrame />
    </div>
  );
};

export default App;
