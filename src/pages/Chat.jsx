import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header/Header";
import Sidebar from "../components/Side-bar/Sidebar";

const socket = io("http://localhost:4200");

function Chat() {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    socket.on("receive_message", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("token");
    if (loggedInUserId) {
      const decoded = jwtDecode(loggedInUserId);
      setUserId(decoded.name);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      socket.emit("register_user", userId);
    }
  }, [userId]);

  const handleSendMessage = () => {
    if (recipientName && message) {
      socket.emit("send_message", { recipientName, message, senderId: userId });
      setMessage("");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/api/messages/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReceivedMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="chat-container">
        <div className="chat-interface">
          <ul className="user-list">
            {users.map((user) => (
              <li
                key={user._id}
                className={`user-list-item ${
                  recipientName === user.name ? "active" : ""
                }`}
                onClick={() => setRecipientName(user.name)}
              >
                {user.name}
              </li>
            ))}
          </ul>

          <input
            className="message-input"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send Message
          </button>

          <div className="messages-list">
            <h2>Received Messages:</h2>
            {receivedMessages.map((msg, index) => (
              <p key={index} className="message">
                <strong>{msg.senderId}:</strong> {msg.message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
