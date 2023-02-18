import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import classnames from "classnames";
import { ToastContainer, toast } from "material-react-toastify";

// styles
import useStyles from "./styles";

// logo
import test from "../../images/tst.svg"
import google from "../../images/google.svg";
import { forgotPassword } from "../../Services/ApiService";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(false);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [Forgot, setForgot] = useState(false)
  const ForgotPassword = () => {

    if(Forgot === true){
      setForgot(false)
    }
    else{
      setForgot(true)
    }
    
    if (loginValue === "")
      return toast.error("Please Enter Email address!!", {
        position: "top-right",
      });
    forgotPassword(
      { email: loginValue },
      (response) => {
        toast.success("Please check your email", { position: "top-right" });
        setLoginValue("");
        setPasswordValue('')
      },
      (error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.message, { position: "top-right" });
        } else {
          toast.error("Something is worng !!", { position: "top-right" });
        }
      },
    );
  };
  return (
    <Grid container className={classes.container}   >
       <ToastContainer />
      
      
      <div className={classes.formContainer}
      
        style={{   objectFit: "cover", padding: "50px 10px", borderRadius: "20px"}}>
          <img src={test} alt="google" style={{maxWidth:"100%",height:"150px"}} className={classes.logo} />
        <div className={classes.form} style={{width:"60%"}}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={Forgot ? "Forgot":"Login"} classes={{ root: classes.tab }} />
           {!Forgot &&(
            <Tab label="Register" classes={{ root: classes.tab }} />
           )} 
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <div className={classes.formDivider} />
              </div>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              {!Forgot && (
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"

                  fullWidth
                />
              )}
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="medium"
                  >
                    {Forgot?"Send OTP":"Login"}
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick={ForgotPassword}

                >
                  {Forgot?"Login":"Forgot Password"}
                
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>

              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
