import * as React from 'react';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import {Dialog, DialogActions, DialogContent} from "@mui/material";
import Typography from '@mui/material/Typography';

const styleForH1 = {
  marginRight: "16px",
  fontWeight: "600",
  fontSize: "24px",
}

const titleList = ["id", "title", "body", "user", "created_at", "url", "state", "assignee", "assignees"];

const ModalWindow = ({open, handleClose, data}) => {
  const getInfo = (value) => {
    let text = data[value];

    if (value === "user" || value === "assignee") {
      text = data[value]?.login;
    }

    if (value === "assignees") {
      const userList = data[value]?.map((user) => user?.login);
      text = userList?.length > 0 ? userList.join(", ") : "-";
    }

    if (value === "url") {
      return (<a href={text} target="_blank" rel="noreferrer">{text}</a>);
    }

    return (<p>{text ?? "-"}</p>);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ padding: "30px" }}
        maxWidth="md"
      >
        <DialogContent sx={{ padding: "30px" }}>
          <Box>
            {titleList.map((el, idx) =>
              <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={styleForH1}>{el}</Typography>
                {getInfo(el)}
              </Box>
            )}

          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "30px" }}>
          <Button variant="contained" onClick={handleClose}>Close Modal</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalWindow;
