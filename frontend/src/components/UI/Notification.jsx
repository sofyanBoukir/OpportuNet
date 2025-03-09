import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react'

export const Notification = ({type,message}) => {
    const [open,setOpen] = useState(true);
    setTimeout(() => {
        setOpen(false)
    }, 3000);
  return (
    <Snackbar open={open}>
        <Alert
            severity={type}
            variant="filled"
            sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
        >
            {message}
        </Alert>
      </Snackbar>
)
}
