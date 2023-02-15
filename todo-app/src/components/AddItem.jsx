import React, { useState } from "react";
import "./styles/styles.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

export default function AddItem() {
  const [itemName, setItem] = useState("");
  const [create, setCreate] = useState("");
  const [comp, setComp] = useState("");
  const [status, setStatus] = useState("notCompleted");

  async function handleEnter() {
    let current = new Date().toTimeString();
    setComp("");
    const data = {
      item: itemName,
      create: current,
      comp: comp,
      status: status,
    };
    const result = await axios.post("/todo/addItem", data);
    if (result.data.message) {
      console.log(result.data.message);
      window.location("http://localhost:3000/");
    } else {
      alert(result.data.err);
    }
  }

  return (
    <div>
      <Avatar
        alt="Travis Howard"
        src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        style={{
          margin: "auto",
          width: "75px",
          height: "75px",
          marginTop: "15px",
        }}
      />
      <AppBar
        position="static"
        color="primary"
        style={{
          width: "500px",
          margin: "auto",
          display: "flex",
          gap: "10px",
          marginTop: "25px",
        }}
        className="bar1"
      >
        <Toolbar
          className="bar"
          style={{
            backgroundColor: "white",
            color: "black",
            display: "flex",
            gap: "25px",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder="Todo Today"
            style={{ border: "none" }}
            onChange={(e) => {
              setItem(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEnter();
              }
            }}
          />
          <ExpandMoreIcon style={{ fontSize: "25" }} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
