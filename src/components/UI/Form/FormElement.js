import React from "react";

import { TextField, MenuItem, Grid } from "@mui/material";
import PropTypes from "prop-types";

const FormElement = ({ name, label, required, multiline, rows, select, options, value, onChange, error, type }) => {
    let inputChildren = null;

    if (select) {
        inputChildren = options.map((option) => (
            <MenuItem key={option._id} value={option._id}>
                {option.title}
            </MenuItem>
        ))
    }

    return (
        <Grid item xs={12}>
            <TextField
                autoComplete={name}
                id={name}
                variant="outlined"
                fullWidth

                name={name}
                label={label}
                required={required}
                multiline={multiline}
                rows={rows}
                select={select}
                value={value}

                onChange={onChange}
                error={!!error}
                helperText={error}
                type={type}
            >
                {inputChildren}
            </TextField>
        </Grid >
    );
};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    type: PropTypes.string
};

export default FormElement;