import React from "react";
import { createUseStyles } from "react-jss";
import { InputBar } from "./InputBar.js";
import { RenderMessages } from "./RenderMessages.js";
const MessagesStyling = createUseStyles({
  container: {
    flexGrow: 1,
    flexBasis: 1,
    height: ({ theme }) => (theme.isSmall ? null : "100%")
  },
  lockSize: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  scrollSection: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 40,
    width: "100%",
    overflow: "scroll",
    display: "flex",
    direction: "row",
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
  messageContainer: {
    flexBasis: "100%",
    display: "flex"
  },

  message: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 35,
    padding: 4,
    backgroundColor: "#F4B41A"
  }
});
export function MessageArea(props) {
  const theme = {
    isSmall: props.isSmall
  };

  const classes = MessagesStyling({ theme });
  return (
    <div className={classes.container}>
      <div className={classes.lockSize}>
        <div ref={props.scrollAreaRef} className={classes.scrollSection}>
          <RenderMessages messages={props.messages} />
          <div ref={props.elementBottom}></div>
          <div style={{ flexBasis: "100%", height: 20 }}></div>
        </div>
        <InputBar sendButton={props.sendButton} sendField={props.sendField} />
      </div>
    </div>
  );
}
