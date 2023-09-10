import React from "react";
import { useEffect, useRef, useState } from "react";
import "../../src/assets/styles/chat.css";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState({ message: "", name: userInfo.name });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h2>
          {name}: <span>{message}</span>
        </h2>
      </div>
    ));
  };

  return (
    <>
      <h1>Chat With Your Doctor Now</h1>
      <div className="box">
        <form onSubmit={onMessageSubmit}>
          <h1>Message Section</h1>
          {/* <div className="name-field">
            <input
              name={userInfo.name}
              onChange={(e) => onTextChange(e)}
              value={userInfo.name}
              label="Name"
            />
          </div> */}
          <div>
            <input
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Conversation</h1>
          {renderChat()}
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
