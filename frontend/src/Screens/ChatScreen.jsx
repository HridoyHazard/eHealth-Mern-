import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "../components/Image.jsx";
import { useSelector } from "react-redux";
import {
  Page,
  MyMessage,
  MyRow,
  Form,
  TextArea,
  Button,
  Container,
  PartnerMessage,
  PartnerRow,
  Input,
  FName,
  MyName,
  PartnerName,
  PartnerFName,
} from "../utils/chat.styled.js";

const ChatScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(userInfo.name);
  const [file, setFile] = useState(null);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("here");
      setMessages((messages) => [...messages, message]);
    });
    return () => socketRef.current.disconnect();
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (file) {
      const messageObject = {
        id: yourID,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name,
        name: name,
      };
      setMessage("");
      setFile();
      socketRef.current.emit("send message", messageObject);
    } else {
      const messageObject = {
        body: message,
        id: yourID,
        name: name,
      };
      setMessage("");
      socketRef.current.emit("send message", messageObject);
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function selectFile(e) {
    setMessage(e.target.files[0].name);
    setFile(e.target.files[0]);
  }
  function renderMessage(message, index) {
    if (message.type === "file") {
      const blob = new Blob([message.body], { type: message.type });
      if (message.id === yourID) {
        return (
          <MyRow key={index}>
            <Image fileName={message.fileName} blob={blob} />
            <FName>{message.name}</FName>
          </MyRow>
        );
      }
      return (
        <PartnerRow key={index}>
          <Image fileName={message.fileName} blob={blob} />
          <PartnerFName>{message.name}</PartnerFName>{" "}
        </PartnerRow>
      );
    }
    if (message.id === yourID) {
      return (
        <MyRow key={index}>
          <MyMessage>{message.body}</MyMessage> <br />
          <MyName>{message.name}</MyName>
        </MyRow>
      );
    }
    return (
      <PartnerRow key={index}>
        <PartnerMessage>{message.body}</PartnerMessage> <br />
        <PartnerName>{message.name}</PartnerName>
      </PartnerRow>
    );
  }
  return (
    <Page>
      <h1>Chat</h1>
      <Container>{messages.map(renderMessage)}</Container>
      <Form onSubmit={sendMessage}>
        <TextArea
          value={message}
          onChange={handleChange}
          placeholder="write text here..."
        />
        <Input type="file" onChange={selectFile} />
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default ChatScreen;
