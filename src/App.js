import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import AdminLogIn from "./Components/admin/AdminLogIn";
import UserLogIn from "./Components/user/UserLogIn";
import Dashboard from "./Components/admin/DashBoard";
import UserDashBoard from "./Components/user/UserDashBoard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#F2F2F2",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route path="/" component={UserLogIn} exact />
          <Route path="/userDashBoard" component={UserDashBoard} exact />
          <Route path="/admin" component={AdminLogIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={Error} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
