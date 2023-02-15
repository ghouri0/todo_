import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



export default function TodoList() {
  const [checked, setChecked] = useState([0]);
  const [todoList, setTodo] = useState([]);

  const handleToggle = (value) => async () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    await compTodo(value);
    setChecked(newChecked);
  };

  async function compTodo(value) {
    let current = new Date().toTimeString();
    await fetch(
      `https://cute-tan-jackrabbit-wrap.cyclic.app/todo/updateItem/${value.item}/${current}`,
      {
        mode: "cors",
        method: "put",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.success);
          // window.location('http://localhost:3000/')
        } else {
          console.log(data.message);
        }
      });
  }

  async function getItems() {
    await fetch("https://cute-tan-jackrabbit-wrap.cyclic.app/todo/getItems", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodo(data);
      });
  }

  async function handleDelete(item) {
    await fetch(`https://cute-tan-jackrabbit-wrap.cyclic.app/todo/deleteItem/${item}`, {
      mode: "cors",
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          // window.location('http://localhost:3000/')
        } else {
          console.log(data.err);
        }
      });
  }

  useEffect((e) => {
    getItems();
  }, [todoList]);
  return (
    <div>
      <List
        sx={{
          width: "auto",
          bgcolor: "background.paper",
          borderRadius: "5px",
        }}
      >
        {todoList.length > 0
          ? todoList.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<DragIndicatorIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >

                  <ListItem
                    key={value.item}
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={value.status == "completed" ? "checked" : ""}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.item} />
                    </ListItemButton>
                  </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <h4>creation:</h4> {value.create}
                  </Typography>
                  <Typography>
                    <h4>completion:</h4> {value.comp !== "" ? value.comp : "Not completed Yet"}
                  </Typography>
                  <Typography>
                    {value.status === "completed" ? "Completed" : ''}
                  </Typography>
                  <Button variant="contained" color="error" onClick={() => {
                    handleDelete(value.item)
                  }}>
                    Delete Task
                  </Button>
                </AccordionDetails>
              </Accordion>
            );
          })
          : ""}
      </List>
    </div>
  );
}