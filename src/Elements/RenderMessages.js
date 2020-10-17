import React from "react";
import { createUseStyles } from "react-jss";
const MessageStyling = createUseStyles({
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
export function RenderMessages(props) {
  const classes = MessageStyling();
  return props.messages.map((currentMessage) => (
    <div
      className={classes.messageContainer}
      style={{
        justifyContent: currentMessage.sent ? "flex-end" : "flex-start"
      }}
    >
      <div
        className={classes.message}
        style={{
          borderRadius: currentMessage.sent
            ? "6px 6px 0px 6px"
            : "6px 6px 6px 0px"
        }}
      >
        {currentMessage.message}
      </div>
    </div>
  ));
}
