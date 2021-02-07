import styled from '@emotion/styled';
import { TextField, InputAdornment } from '@material-ui/core';
import { useStyles } from './styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Input = ({ id, label, name, value, handleChange, multiline }) => {

    const classes = useStyles();

    return (
        <InputContainer>
            <TextField
                classes={{
                    root: classes.inputRoot
                }}
                id={id}
                label={label}
                name={name}
                value={value}
                onChange={handleChange}
                variant='outlined'
                multiline={multiline}
                InputProps={value ? { endAdornment: <InputAdornment position='end'><CheckCircleIcon color='primary'/></InputAdornment> } : null}
            />
        </InputContainer>
    )
}

export default Input;

const InputContainer = styled.div`
    padding-top: 20px;
    min-width: 275px;
    width: 100%;
`;