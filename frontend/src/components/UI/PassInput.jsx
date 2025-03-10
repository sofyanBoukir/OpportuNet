import { EyeIcon } from '@heroicons/react/16/solid';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react'

export const PassInput = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleMouseUpPassword = (event) => {
        event.preventDefault();
      };
  return (
    <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <EyeIcon onClick={handleClickShowPassword}
                //   aria-label={
                //     showPassword ? 'hide the password' : 'display the password'
                //   }
                //   onClick={handleClickShowPassword}
                //   onMouseDown={handleMouseDownPassword}
                //   onMouseUp={handleMouseUpPassword}
                //   edge="end"
                >
                </EyeIcon>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    </div>
  )
}
