import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import AdminLogIn from "./Components/admin/AdminLogIn";
import UserLogIn from "./Components/user/UserLogIn";
import Dashboard from "./Components/admin/DashBoard";
import UserFeed from "./Components/user/UserFeed";
import UserTransactions from "./Components/user/UserTransactions";
import UserNoticeBoard from "./Components/user/UserNoticeBoard";
import UserComplaints from "./Components/user/UserComplaints";
import UserClassifiedSection from "./Components/user/UserClassifiedSection";
import AddPost from "./Components/user/UserActions/AddPost";
import UserProfile from "./Components/user/UserProfile";

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
          {/* <Route path="" component={UserDashBoard} exact /> */}
          <Route path="/admin" component={AdminLogIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/feed" component={UserFeed} exact />
          <Route path="/addPost" component={AddPost} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/transactions" component={UserTransactions} />
          <Route path="/noticeBoard" component={UserNoticeBoard} />
          <Route path="/complaints" component={UserComplaints} />
          <Route path="/classifiedSection" component={UserClassifiedSection} />
          <Route component={Error} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
