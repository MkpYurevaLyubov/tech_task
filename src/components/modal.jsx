import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  boxShadow: 24,
  p: 4,
};

const styleForH1 = {
  marginRight: "16px",
  fontWeight: "600",
  fontSize: "24px",
}

const titleList = ["id", "title", "body", "user", "created_at", "url", "state", "assignee", "assignees"];

const ModalWindow = ({ open, handleClose, data }) => {
  const getInfo = (value) => {
    let text = data[value];

    if (value === "user") {
      text = data[value]?.login;
    }

    if (value === "assignees") {
      const userList = data[value]?.map((user) => user?.login);
      text = userList?.length > 0 ? userList.join(", ") : "-";
    }

    if (value === "url") {
      return (<a href={text} target="_blank">{text}</a> );
    }

    return (<p>{text ?? "-"}</p>);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {titleList.map((el, idx) =>
              <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={styleForH1}>{el}</Typography>
                {getInfo(el)}
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalWindow;
