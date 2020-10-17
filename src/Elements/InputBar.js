import React from "react";
import { Button, Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";
const InputBarStyling = createUseStyles({
  inputContainer: {
    position: "absolute",
    boxShadow: "0px 0px 10px -2px ",
    bottom: 0,
    width: "100%",
    height: 40,
    display: "flex",
    backgroundColor: "#F4B41A"
  },
  inputArea: {
    flex: 1,
    display: "flex",
    margin: 5,
    zIndex: 2
  },
  customFormControl: {
    maxHeight: "100%",
    zIndex: 10
  },
  customButton: {
    marginLeft: 20,
    display: "flex",
    alignItems: "center"
  }
});
export function InputBar(props) {
  const classes = InputBarStyling();
  return (
    <div className={classes.inputContainer}>
      <div className={classes.inputArea}>
        <Form.Control
          className={classes.customFormControl}
          type="text"
          placeholder="message..."
          ref={props.sendField}
        />
        <Button
          className={classes.customButton}
          variant="primary"
          type="submit"
          ref={props.sendButton}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
