import React, { useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
const responseGoogle = (response) => {
  console.log(response);
};
const MessagesStyling = createUseStyles({
  container: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
    flexWrap: "wrap"
  },
  loginOuter: {
    backgroundColor: "#F4B41A",
    flexBasis: 300,
    flexShrink: 1,
    borderRadius: 4,
    margin: 30,
    padding: "10px 10px 0px 10px"
  },
  customFormControl: {
    maxHeight: "100%",
    zIndex: 10,
    marginBottom: 10
  },
  customButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  title: {
    color: "white",
    fontSize: "26pt"
  },
  errorMessage: {
    color: "white",
    fontSize: "11pt",
    textDecoration: "underline",
    fontStyle: "italic"
  }
});
function LoginFunction(props) {
  const theme = {
    isSmall: props.isSmall
  };

  const history = useHistory();
  props.setRedirectFunction(
    useCallback(() => history.push("/chat"), [history])
  );

  const classes = MessagesStyling({ theme });
  return (
    <div className={classes.container}>
      <div className={classes.loginOuter}>
        <div className={classes.inputContainer}>
          <div className={classes.inputArea}>
            <h1 className={classes.title}>Login:</h1>
            <p className={classes.errorMessage}>{props.errorMessage}</p>
            <Form.Control
              className={classes.customFormControl}
              type="text"
              placeholder="username..."
              ref={props.usernameField}
            />
            <Form.Control
              className={classes.customFormControl}
              type="text"
              placeholder="password..."
              ref={props.passwordField}
            />
            <Button
              className={classes.customButton}
              variant="primary"
              type="submit"
              ref={props.buttonRef}
            >
              Login
            </Button>
            <GoogleLogin
              clientId="319949883115-r4tv55p4dlpatcdgrs90pevs79md51fa.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.customButton}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Access with Google
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.redirectFunction = "";
    this.state = {
      usernameField: React.createRef(),
      passwordField: React.createRef(),
      loginButton: React.createRef(),
      errorMessage: "",
      session: ""
    };
    this.setRedirectFunction = this.setRedirectFunction.bind(this);
    this.loadSession = this.loadSession.bind(this);
  }
  setRedirectFunction(newRedirectFunction) {
    this.redirectFunction = newRedirectFunction;
  }
  loadSession(username, password) {
    fetch(
      "https://rubenrick.online/ChattaNu/new_session.php?email=" +
        username +
        "&password=" +
        password
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          this.setState({ session: response.session_code });
          this.props.updateSession(response.session_code);
          this.redirectFunction();
        } else {
          this.setState({ errorMessage: "Faulty credentials." });
        }
      });
  }
  componentDidMount() {
    this.state.usernameField.current.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        this.state.passwordField.current.focus();
      }
    });
    this.state.passwordField.current.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        this.loadSession(
          this.state.usernameField.current.value,
          this.state.passwordField.current.value
        );
      }
    });
    this.state.loginButton.current.addEventListener(
      "click",
      this.loadSession(
        this.state.usernameField.current.value,
        this.state.passwordField.current.value
      )
    );
  }
  render() {
    return (
      <>
        <LoginFunction
          isSmall={false}
          buttonRef={this.state.loginButton}
          errorMessage={this.state.errorMessage}
          setRedirectFunction={this.setRedirectFunction}
          usernameField={this.state.usernameField}
          passwordField={this.state.passwordField}
        />
      </>
    );
  }
}
