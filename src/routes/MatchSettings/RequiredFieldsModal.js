import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const RequiredFieldsModal = ({ open, onClose, requiredFields }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="required-fields-modal"
            aria-describedby="modal-to-display-required-fields"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    boxShadow: 24,
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Please Fill All Required Fields
                </Typography>
                {/* Display only the fields that are not filled */}
                {requiredFields.map((field, index) => (
                    <Typography key={index} variant="body1" style={{ fontWeight: 'bold' }}>
                        {field.split('_').join(' ')} {/* Replace underscores with spaces */}
                    </Typography>
                ))}
                <Button variant="contained" color="primary" onClick={onClose} style={{ marginTop: '24px' }}>
                    Ok
                </Button>
            </Box>
        </Modal>
    );
};

export default RequiredFieldsModal;
