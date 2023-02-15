import React, { useState } from "react";
import "./styles/styles.css";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TodoList from "./TodoList";

export default function AddItem() {
  const [itemName, setItem] = useState("");
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
    const result = await axios.post("https://cute-tan-jackrabbit-wrap.cyclic.app/todo/addItem", data);
    if (result.data.message) {
      console.log(result.data.message);
      alert('Successfully Added')
    } else {
      alert(result.data.err);
    }
  }

  return (
    <div>
      <Avatar
        alt="M A"
        src="https://images.pexels.com/photos/7032640/pexels-photo-7032640.jpeg?auto=compress&cs=tinysrgb&w=600"
        style={{
          margin: "auto",
          width: "75px",
          height: "75px",
          marginTop: "15px",
        }}
      />
      <Accordion style={{
        // width: "500px",
        margin: "50px",
        display: "flex",
        flexDirection: 'column',
        gap: "10px",
        marginTop: "25px",
      }}
        className="bar1">
        <AccordionSummary
          expandIcon={<MenuIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
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
        </AccordionSummary>
        <AccordionDetails>
          <TodoList/>
        </AccordionDetails>
      </Accordion>
      {/* <AppBar
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
          <AddIcon style={{ fontSize: "25" }} onClick={()=>{
            handleEnter()
          }} />
        </Toolbar>
      </AppBar> */}
    </div>
  );
}
