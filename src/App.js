import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [Theme, setTheme] = useState("dark");
  const [Text, setText] = useState("light");
  const [Border, setBorder] = useState("dark");
  const [Shadow, setShadow] = useState('white');

  return (
    <div>
      <BrowserRouter>
        <NavBar
          Theme={Theme}
          Text={Text}
          setTheme={setTheme}
          setText={setText}
          Border={Border}
          setBorder={setBorder}
          setShadow={setShadow}
          Shadow={Shadow}
        />
        <LoadingBar height={3} color="green" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/general"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                Border={Border}
                setBorder={setBorder}
                Theme={Theme}
                Text={Text}
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
