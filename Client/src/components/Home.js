import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [roomType, setRoomType] = useState("Public");
  const [permissions, setPermissions] = useState([]);

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID generated!");
  };

  const joinRoom = () => {
    if (!roomId || !username || !roomType) {
      toast.error("All fields are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username, roomType, permissions },
    });
    toast.success(`Joined ${roomType} Room successfully!`);
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div>
      <motion.nav className="navbar navbar-dark bg-dark p-3" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <a className="navbar-brand" href="/" style={{ fontFamily: "Times New Roman, Times, serif" }}>
          CodeCast
        </a>
        <div>
          <a className="text-light mx-3" href="/">Home</a>
          <a className="text-light mx-3" href="#footer">About</a>
        </div>
      </motion.nav>

      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover", backgroundPosition: "center", height: "100vh", width: "100vw", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}></div>

        <div className="card p-4 text-center glassmorphic-card" style={{ zIndex: 2, width: "100%", maxWidth: "400px", borderRadius: "20px", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}>
          <h4 className="text-light mb-3">Enter the Room ID</h4>
          <motion.input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="form-control mb-2" placeholder="Room ID" onKeyUp={handleInputEnter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} />
          <motion.input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-3" placeholder="Username" onKeyUp={handleInputEnter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} />
          
          {/* Room Type Selection
          <h5 className="text-light">Select Room Type</h5>
          <select className="form-control mb-3" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="Public">Public (Anybody)</option>
            <option value="Private">Private (View only)</option>
            <option value="Admin">Admin</option>
          </select> */}
          
          {/* Permission Selection (only for Private/Admin) */}
          {roomType !== "Public" && (
            <div>
              <h5 className="text-light">Set Permissions</h5>
              <input type="text" className="form-control mb-2" placeholder="Enter usernames for permissions" onChange={(e) => setPermissions(e.target.value.split(","))} />
            </div>
          )}

          <button onClick={joinRoom} className="btn btn-primary btn-block mb-2" style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)", border: "none", padding: "10px", fontSize: "16px", fontWeight: "bold", borderRadius: "8px" }}>
            JOIN ROOM
          </button>

          <p className="text-light mt-3">
            Don't have a room ID? <span onClick={generateRoomId} className="text-info" style={{ cursor: "pointer", fontWeight: "bold" }}>Create New Room</span>
          </p>
        </div>
      </div>

      <footer id="footer" className="text-center text-light p-4" style={{ marginTop: "50px", background: "linear-gradient(135deg, #1e1e2f, #3a3a6a)", borderTop: "3px solid #6a11cb", paddingBottom: "20px" }}>
        <p className="mb-2" style={{ fontSize: "18px", fontWeight: "bold" }}>CodeCast - Real-Time Collaborative Code Editor</p>
        <p style={{ fontSize: "14px", opacity: "0.8" }}>Seamless collaboration with AI-powered features.</p>
        <div className="d-flex justify-content-center mt-3">
          <a href="https://github.com" className="mx-2 text-light" style={{ fontSize: "20px" }}><FaGithub /></a>
          <a href="https://twitter.com" className="mx-2 text-light" style={{ fontSize: "20px" }}><FaTwitter /></a>
          <a href="https://linkedin.com" className="mx-2 text-light" style={{ fontSize: "20px" }}><FaLinkedin /></a>
        </div>
        <p style={{ fontSize: "12px", opacity: "0.6", marginTop: "10px" }}>Â© 2025 CodeCast. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
