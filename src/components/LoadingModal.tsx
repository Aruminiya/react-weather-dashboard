import { Box, Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

type LoadingModalProps = {
  isLoading: boolean;
};

function LoadingModal({ isLoading }: LoadingModalProps) {
  return (
    <Modal
      open={isLoading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>Loading...</h1>
      </Box>
    </Modal>
  );
}

export default LoadingModal;