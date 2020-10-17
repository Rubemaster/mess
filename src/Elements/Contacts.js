import React from "react";
import { createUseStyles } from "react-jss";
const ContactsStyling = createUseStyles({
  container: {
    flexBasis: ({ theme }) => (theme.isSmall ? theme.height : 200),
    height: ({ theme }) => (theme.isSmall ? null : "100%"),
    width: ({ theme }) => (theme.isSmall ? "100%" : null),
    backgroundColor: "#F4B41A",
    overflow: "scroll",
    zIndex: 1
  },
  innerContianerLarge: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  innerContianerSmall: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  contactLarge: {
    backgroundColor: "#143D59",
    color: "white",
    flexBasis: "100%",
    height: 60,
    margin: 5,
    borderRadius: 2
  },
  contactSmall: {
    backgroundColor: "#143D59",
    color: "white",
    flexBasis: "100%",
    width: 60,
    margin: 5,
    borderRadius: 4
  }
});
export function Contacts(props) {
  const contacts = props.contacts;
  const theme = {
    isSmall: props.isSmall,
    height: props.isSmall ? props.height : false,
    contacts: contacts.length
  };
  const classes = ContactsStyling({ theme });
  return (
    <div className={classes.container}>
      <div
        className={
          props.isSmall
            ? classes.innerContianerSmall
            : classes.innerContianerLarge
        }
      >
        {contacts.map((contact, key) =>
          props.isSmall ? (
            <div ref={contact.ref} className={classes.contactSmall}>
              {contact.name}
            </div>
          ) : (
            <div ref={contact.ref} className={classes.contactLarge}>
              {contact.name}
            </div>
          )
        )}
      </div>
    </div>
  );
}
