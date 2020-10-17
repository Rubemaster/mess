import React from "react";
import { createUseStyles } from "react-jss";
import { ChatAreaComponent } from "./Elements/ChatAreaManager";

const useStyles = createUseStyles({
  containColumn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#143D59",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start"
  },
  header: {
    backgroundColor: "#F4B41A",
    boxShadow: "0px 0px 10px -2px ",
    zIndex: 3,
    flexBasis: 50,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    overflow: "hidden"
  },
  containVertical: {
    flexGrow: 1
  },
  containLockVertical: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  lockVerticalHeight: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexDirection: ({ theme }) => (theme.isSmall ? "column" : "row"),
    display: "flex",
    alignContent: "flex-start",
    flexWrap: "wrap"
  },
  isWhite: {
    color: "white;"
  }
});
function log() {
  console.log("something something");
}
function AppFunction(props) {
  const isSmall = props.isSmall;
  const theme = {
    isSmall: isSmall
  };
  const classes = useStyles({ theme });
  return (
    <div className={classes.containColumn}>
      <div className={classes.header}>
        <div className={classes.isWhite}>The Coffee Break Messenger</div>
      </div>
      <div className={classes.containVertical}>
        <div className={classes.containLockVertical}>
          <div className={classes.lockVerticalHeight}>
            {<ChatAreaComponent isSmall={isSmall} log={log} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSmall: window.innerWidth < 600 ? true : false };
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      window.innerWidth < 600
        ? this.setState({ isSmall: true })
        : this.setState({ isSmall: false })
    );
  }
  render() {
    return <AppFunction isSmall={this.state.isSmall} />;
  }
}
