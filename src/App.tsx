import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import { ThemeProvider } from "./Styles/typed-components";
import { theme } from "./Styles/theme";
import { ProvideHome } from "./Routes/Home/HomeProvider";
import Main from "./Routes/Main";

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ProvideHome>
        <AppPresenter />
      </ProvideHome>
    </BrowserRouter>
  </ThemeProvider>
)

const AppPresenter: React.FC<any> = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Main}/>
    <Route path={"/home"} exact={true} component={Home}/>
    <Redirect from={"*"} to={"/"}/>
  </Switch>
);

export default App;