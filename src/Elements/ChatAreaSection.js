import React from "react";
import { Contacts } from "./Contacts.js";
import { MessageArea } from "./MessageArea.js";
export function ChatAreaFunction(props) {
  return (
    <>
      {props.isSmall ? null : (
        <Contacts isSmall={props.isSmall} contacts={props.contacts} />
      )}

      <MessageArea
        isSmall={props.isSmall}
        scrollAreaRef={props.messagesScroll}
        messages={props.messages}
        elementBottom={props.elementBottom}
        sendButton={props.sendMessageButton}
        sendField={props.sendMessageField}
      />
      {props.isSmall ? (
        <Contacts
          isSmall={props.isSmall}
          height={props.contactHeight}
          contacts={props.contacts}
        />
      ) : null}
    </>
  );
}
