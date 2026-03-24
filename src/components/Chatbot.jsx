import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.wrapper}>
      
      {open && (
        <div style={styles.chatbox}>
          <div style={styles.header}>
            <span>Support Chat</span>
            <button onClick={() => setOpen(false)} style={styles.close}>✕</button>
          </div>

          <div style={styles.body}>
            <p>👋 Hi there!</p>
            <p>Welcome to <b>Raushanmehta.in</b></p>
            <p>How can we help you today?</p>
          </div>
        </div>
      )}

      {/* CHAT BUTTON */}
      <div style={styles.button} onClick={() => setOpen(!open)}>
        <img
          src="https://assets-v2.lottiefiles.com/a/b170d560-1165-11ee-8da0-a3a05795164f/P6HdsYDmnZ.gif"
          alt="chat"
          style={styles.icon}
        />
      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  chatbox: {
    width: "320px",
    height: "380px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    marginBottom: "12px",
    overflow: "hidden",
    fontFamily: "Arial",
  },

  header: {
    background: "#4f46e5",
    color: "#fff",
    padding: "12px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "600",
  },

  close: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },

  body: {
    padding: "15px",
    fontSize: "14px",
    color: "#333",
  },

  button: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    cursor: "pointer",
    overflow: "hidden",
  },

  icon: {
    width: "55px",
    height: "55px",
    objectFit: "contain",
    pointerEvents: "none",
  },
};
