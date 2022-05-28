import React from "react";
import {
  setSigninUserForm,
  setSignupUserForm,
  getLoggedUserData,
  cleanLoginMessage,
  cleanSignupMessage,
} from "../../features/eLearningSlice";
import { useDispatch } from "react-redux";
import { Grid, Typography, AppBar, Toolbar } from "@material-ui/core";
import Item from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Search from "../utils/Search";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 220,
    marginTop: "20px",
    borderRadius: "50%",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "120px",
      marginBottom: "20px",
    },
  },
  rightButtons: {
    marginRight: "2px",
    marginTop: "50px",
    textTransform: "none",
    marginLeft: "auto",
  },
  searchField: {
    marginBottom: "5px",
  },
  headerContainer: {
    paddingBottom: "20px",
  },
  title: {
    textAlign: "left",
    marginTop: "20px",
    [theme.breakpoints.up("xs")]: {
      marginLeft: "20px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
      textAlign: "right",
      marginLeft: "60px",
    },
    [theme.breakpoints.up("lg")]: {
      textAlign: "right",
    },
  },
  searchInput: {
    paddingLeft: "100px",
  },
  searchFieldContainer: {
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
    },
  },
  buttons: {
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
    },
  },
  searchFieldContainerSignedUser: {
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
      marginLeft: "60px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "50px",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUserData);

  const login = () => {
    dispatch(setSignupUserForm(false));
    dispatch(setSigninUserForm(true));
    dispatch(cleanSignupMessage());
  };

  const signup = () => {
    dispatch(setSigninUserForm(false));
    dispatch(setSignupUserForm(true));
    dispatch(cleanLoginMessage());
  };

  return (
    <AppBar position="static" className={classes.headerContainer}>
      <Toolbar>
        <Grid container justifyContent="center">
          <Grid item xs={3} md={2} lg={2} xl={2}>
            <Item>
              <Box
                component="img"
                className={classes.logo}
                alt="Expense tracker"
                src="https://www.elearning-journal.com/wp-content/uploads/2019/08/news_07082019_11.jpg"
                onClick={() => navigate("/dashboard")}
              />
            </Item>
          </Grid>

          {loggedUser?.user ? (
            <>
              <Grid item xs={12} md={3} lg={3} xl={3} className={classes.title}>
                <Typography variant="h5">Student Dashboard</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.searchFieldContainer}
              >
                <Search />
              </Grid>
            </>
          ) : (
            <>
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.searchFieldContainerSignedUser}
              >
                <Search />
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                xl={3}
                className={classes.buttons}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={login}
                  sx={{
                    textTransform: "none",
                    marginLeft: "10px",
                  }}
                >
                  Log In
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={signup}
                  sx={{
                    textTransform: "none",
                    marginLeft: "10px",
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;