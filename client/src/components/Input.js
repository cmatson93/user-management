import styled from '@emotion/styled';
import { TextField, InputAdornment } from '@material-ui/core';
import { useStyles } from './styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InputMask from 'react-input-mask';


const Input = ({ id, label, name, value, handleChange, multiline, mask }) => {

    const classes = useStyles();
    if (mask) {
        return (
            <InputContainer>
                <InputMask 
                    mask={mask} 
                    value={value}
                    onChange={handleChange}
                    name={name}
                >
                    {(inputProps) => (
                        <TextField 
                            classes={{
                                root: classes.inputRoot
                            }}
                            id={id}
                            label={label}
                            name={name}
                            variant='outlined'
                            placeholder={label}
                            InputProps={
                                // TODO should add logic here to only show check if matches mask properties
                                value ? {
                                    endAdornment: 
                                        <InputAdornment position='end'>
                                            <CheckCircleIcon color='primary'/>
                                        </InputAdornment> 
                                } : null
                            }
                            {...inputProps} 
                        />
                    )}
                </InputMask>
            </InputContainer>
        )
    } else {
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
                    InputProps={
                        value ? {
                            endAdornment: 
                                <InputAdornment position='end'>
                                    <CheckCircleIcon color='primary'/>
                                </InputAdornment> 
                        } : null
                    }
                />
            </InputContainer>
        )
    }
}

export default Input;

const InputContainer = styled.div`
    padding-top: 20px;
    min-width: 275px;
    width: 100%;
`;