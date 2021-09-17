import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const CustomTextField = ({ name, label, required }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render={({ field }) => <TextField 
                    fullWidth
                    label={label}
                    required={required} />
                }
                control={control}
                name={name}
            />
        </Grid>
    )
}

export default CustomTextField
