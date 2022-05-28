/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@material-ui/core/";
import {
  getLoggedUserData,
  closeAccount,
  cleanStore,
  getCloseAccountStatus,
} from "../../features/eLearningSlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  tittle: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
  cancel: {
    marginLeft: "10px",
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
}));
const CloseAccountForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);
  const closeAccountStatus = useSelector(getCloseAccountStatus);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    error: "",
  });

  useEffect(() => {
    if (closeAccountStatus?.message) {
      dispatch(cleanStore());
      navigate("/");
    }
  }, [closeAccountStatus]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (values.password === "") {
      setValues({
        ...values,
        error: "Enter  password!",
      });
      return;
    }

    setValues({
      ...values,
      error: "",
    });

    const user = {
      param: loggedUser.user._id,
      data: {
        password: values.password,
      },
    };

    dispatch(closeAccount(user));
  };

  const cancel = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {loggedUser.user.firstName ? (
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
              placeholder="Password"
              type="password"
            />
            <br />

            {closeAccountStatus?.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}></Icon>
                {closeAccountStatus.error}
              </Typography>
            )}
            {values.error !== "" && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}></Icon>
                {values.error}
              </Typography>
            )}
          </CardContent>

          <CardActions>
            <div style={{ margin: "0 auto" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={clickSubmit}
                className={classes.save}
              >
                Save
              </Button>

              <Button
                color="primary"
                variant="contained"
                className={classes.cancel}
                onClick={cancel}
              >
                Cancel
              </Button>
            </div>
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
};

export default CloseAccountForm;