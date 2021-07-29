import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import AdminLogIn from "./Components/admin/AdminLogIn/AdminLogIn";
import UserLogIn from "./Components/user/UserLogIn/UserLogIn";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#E33E7F",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route path="/" component={UserLogIn} exact />
          <Route path="/admin" component={AdminLogIn} />
          <Route component={Error} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
