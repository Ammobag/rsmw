import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ComplaintStatus({ token, defaults }) {
  const classes = useStyles();
  const [status, setStatus] = React.useState(defaults);

  const handleChange = (event) => {
    setStatus(event.target.value);
    const d = new Date();
    var i = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()
    firebase.database().ref('complaints/' + token + "/").child("status").set(event.target.value);
    if(event.target.value === "closed") {
      firebase.database().ref('complaints/' + token + "/").child("dateClosed").set(i);
    }else{
      firebase.database().ref('complaints/' + token + "/").child("dateClosed").set("-");
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleChange}
        >
          <MenuItem value={"open"}>Open</MenuItem>
          <MenuItem value={"processing"}>Processing</MenuItem>
          <MenuItem value={"closed"}>Closed</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
