import React from "react";
export function scrollHandler() {
  const messagesScroll = this.messagesScroll.current;
  messagesScroll.addEventListener("scroll", (e) => {
    if (
      this.state.contactsHeight < 60 ||
      messagesScroll.scrollHeight - messagesScroll.offsetHeight > 60
    ) {
      const scrollChange = this.scroll > messagesScroll.scrollTop;
      if (scrollChange !== this.direction) {
        this.scrollStart = messagesScroll.scrollTop;
      }
      let distance = Math.sqrt(
        Math.pow((messagesScroll.scrollTop - this.scroll) / 1, 2)
      );
      const h = this.state.contactsHeight;
      if (scrollChange && h >= 0)
        this.setState({
          contactsHeight: h - distance < 0 ? 0 : h - distance
        });
      if (!scrollChange & (h <= 60))
        this.setState({
          contactsHeight: h + distance > 60 ? 60 : h + distance
        });
      this.scroll = messagesScroll.scrollTop;
      this.direction = scrollChange;
    }
  });
}
export function contactClickFunc(contactID, isHost) {
  fetch(
    "https://rubenrick.online/ChattaNu/load_messages.php?session_code=XX&target_conversation=" +
      contactID
  )
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      this.setState({
        conversation: contactID,
        messages: responseJSON.map((message) =>
          Object.create({
            message: message.message,
            sent:
              (message.from_host === "1" ? true : false) === isHost
                ? true
                : false
          })
        )
      });
    });
  this.elementBottom.current.scrollIntoView();
  this.onSend();
}
export function contactsClickHandler() {
  this.state.contacts.forEach((contact) =>
    contact.ref.current.addEventListener("click", () => {
      this.contactClickFunc(contact.id, contact.is_host);
    })
  );
}
export function loadData() {
  fetch(
    "https://rubenrick.online/ChattaNu/load_conversations.php?session_code=XX"
  )
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      this.setState({
        contacts: responseJSON.conversations.map((conversationInformation) =>
          Object.create({
            id: conversationInformation.conversation_id,
            name: conversationInformation.receiver_name,
            is_host:
              conversationInformation.session_is_host === "1" ? true : false,
            ref: React.createRef()
          })
        )
      });
      if (responseJSON.conversations.length > 0) {
        this.contactClickFunc(
          responseJSON.conversations[0].conversation_id,
          responseJSON.conversations[0].session_is_host === "1" ? true : false
        );
      }
      this.contactsClickHandler();
    });
}
function targetOnClick() {
  const inputField = this.sendMessageField.current;
  if (inputField.value && inputField.value !== "" && this.contacts.length > 0) {
    console.log(this.state.messages);
    this.setState((state) => ({
      messages: state.messages.concat([
        { message: inputField.value, sent: true }
      ])
    }));
    let fetchString =
      "https://rubenrick.online/ChattaNu/send_message.php?session_code=XX&message=" +
      inputField.value +
      "&conversation_id=" +
      this.state.conversation;
    fetch(fetchString)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.status === "fail") {
          console.log(responseJSON);
        }
      });
    this.elementBottom.current.scrollIntoView();
  }
  this.sendMessageField.current.value = "";
}
function clearNode(ref) {
  const primaryNode = ref.current;
  const replacementNode = primaryNode.cloneNode(true);
  primaryNode.parentNode.replaceChild(replacementNode, primaryNode);
  return replacementNode;
}
export function onSend() {
  this.targetOnClick = targetOnClick.bind(this);
  this.sendMessageButton.current = clearNode(this.sendMessageButton);
  this.sendMessageField.current = clearNode(this.sendMessageField);
  this.sendMessageButton.current.addEventListener("click", this.targetOnClick);
  this.sendMessageField.current.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.targetOnClick();
    }
  });
  this.inputBarHasListeners = true;
}
