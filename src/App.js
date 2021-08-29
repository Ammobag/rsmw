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
import AddComplaint from "./Components/user/UserActions/AddComplaint";
import AddClassified from "./Components/user/UserActions/AddClassified";
import UserCreateAccount from "./Components/user/UserCreateAccount";
import UserFormBasic from "./Components/user/UserFormBasic";
import UserFormTenant from "./Components/user/UserFormTenant";
import UserFormServant from "./Components/user/UserFormServant";
import Public from "./Components/public/Public";
import UserFormVehicle from "./Components/user/UserFormVehicle";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFB740",
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
          <Route path="/" component={Public} exact />
          <Route path="/logIn" component={UserLogIn} exact />
          <Route path="/createAccount" component={UserCreateAccount} />
          <Route path="/basicForm" component={UserFormBasic} />
          <Route path="/tenantForm" component={UserFormTenant} />
          <Route path="/servantForm" component={UserFormServant} />
          <Route path="/vehicleForm" component={UserFormVehicle} />
          {/* <Route path="" component={UserDashBoard} exact /> */}
          <Route path="/admin" component={AdminLogIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/feed" component={UserFeed} exact />
          <Route path="/addPost" component={AddPost} />
          <Route path="/addClassified" component={AddClassified} />
          <Route path="/addComplaint" component={AddComplaint} />
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
