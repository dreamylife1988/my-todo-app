import React from "react";
import { useState } from "react";
import "./Input.css";
import { v4 as shortId } from "uuid";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { Stack } from "@mui/system";

function Input({ data, setData }) {
  //temp state
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [ShowAlert, setShowAlert] = useState(false);

  //add task
  const addToDo = () => {
    // if (!Title || !Desc) alert("Please fill out the fields needed");
    if (!Title || !Desc) setShowAlert(true)
    else {
      const task = {
        id: shortId(),
        title: Title,
        desc: Desc,
        date: new Date(),
      };
      setTitle("");
      setDesc("");

      setData([...data, task]);

      localStorage.setItem("toDo", JSON.stringify([...data, task]));
    }
  };

  //clear history
  const clearLocalStorage = () => {
    localStorage.clear();
    setData([]);
  };
  return (
    <>
      <Snackbar
        open={ShowAlert}
        onClose={() => setShowAlert(false)}
        sx={{ width: "100%" }}
        spacing={2}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="warning"
        >
          Please fill out the fields needed
        </Alert>
      </Snackbar>

      <Card>
        <CardContent>
          <Stack>
            <TextField
              id="outlined-basic"
              autoComplete="off"
              label="Title"
              variant="outlined"
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Divider style={{ margin: "0.5em 0" }} />
            {/* <span className="title">
              Title:
              <input
                type="text"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </span> */}
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Divider style={{ margin: "0.5em 0" }} />

            {/* <span className="desc">
              Description:
              <textarea
                type="text"
                value={Desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </span> */}

            {/* <button onClick={addToDo}>Add Todo</button> */}
            <Button variant="contained" onClick={addToDo}>
              Add Todo
            </Button>
            <Divider style={{ margin: "0.5em 0" }} />

            <Button variant="outlined" onClick={clearLocalStorage}>
              Clear History
            </Button>
            {/* <button onClick={clearLocalStorage}>Clear History</button> */}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default Input;
