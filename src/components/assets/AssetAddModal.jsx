import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AssetAddForm from './AssetAddForm.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AssetAddModal = ({ onClose }) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Asset
        </Typography>
        <AssetAddForm onSubmit={(data) => {
          console.log('Asset data:', data);
          onClose(); // Close the modal after submission
        }} />
        <Button className="standard-btn" onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default AssetAddModal;