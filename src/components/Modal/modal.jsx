import * as React from 'react';
import {Dialog, DialogActions, DialogContent, Button} from "@mui/material";
import "./modal-style.css";

const titleList = ["id", "title", "body", "user", "created_at", "url", "state", "assignee", "assignees"];

const ModalWindow = ({open, handleClose, data}) => {
  const getInfo = (value) => {
    let text = data[value];
    const style = ["modal-block-info-text"];

    if (value === "user" || value === "assignee") {
      text = data[value]?.login;
    }

    if (value === "assignees") {
      const userList = data[value]?.map((user) => user?.login);
      text = userList?.length > 0 ? userList.join(", ") : "-";
    }

    if (value === "body") {
      style.push("overflow-height");
    }

    if (value === "url") {
      return (
        <a
          href={text}
          target="_blank"
          rel="noreferrer"
          className="modal-block-info-text link"
        >
          {text}
        </a>
      );
    }

    return (<p className={style.join(" ")}>{text ?? "-"}</p>);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="p30"
      maxWidth="md"
    >
      <DialogContent className="p30-top">
          {titleList.map((el, idx) =>
            <div key={idx} className="modal-block-info">
              <h1 className="modal-block-info-h1">{`${el}:`}</h1>
              {getInfo(el)}
            </div>
          )}
      </DialogContent>
      <DialogActions className="p30-bottom">
        <Button variant="contained" onClick={handleClose}>Close Modal</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalWindow;
