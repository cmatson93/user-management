import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import { useForm } from './customHooks/useForm'; 
import Input from './components/Input';

const UserForm = ({ user, onSubmit, handleCancelForm }) => {

    const stateSchema = {
        firstName: { value: user.firstName, error: ''},
        lastName: { value: user.lastName, error: ''},
        dateOfBirth: { value: user.dateOfBirth, error: ''},
        phoneNumber: { value: user.phoneNumber, error: ''},
        address: { value: user.address, error: ''},
        notes: { value: user.notes, error: ''}
    };

    const stateValidatorSchema = {
        firstName: {
            required: true, 
        },
        lastName: {
            required: true, 
        },
        dateOfBirth: {
            required: true, 
            //TODO: add some format validation here for date
        },
        phoneNumber: {
            required: true, 
            //TODO: add some format validation here for phone number
        },
        address: {
            required: true, 
        },
        notes: {
            required: false, 
        },
    }

    const onSubmitForm = (state) => {
        onSubmit(state);
    }

    const { state, handleOnChange, handleOnSubmit, disable } = useForm(
        stateSchema, 
        stateValidatorSchema, 
        onSubmitForm
    );

    const {
        firstName, 
        lastName, 
        dateOfBirth, 
        phoneNumber, 
        address, 
        notes
    } = state;

    return (
        <FormContainer onSubmit={handleOnSubmit}>
            <TwoColRow>
                <Input
                    id='input-first-name'
                    label='First Name'
                    name='firstName'
                    value={firstName.value}
                    handleChange={handleOnChange}
                    variant='outlined'
                />
                <Spacer />
                <Input
                    id='input-last-name'
                    label='Last Name'
                    name='lastName'
                    value={lastName.value}
                    handleChange={handleOnChange}
                    variant='outlined'
                />
            </TwoColRow>
            <TwoColRow>
                <Input
                    id='input-date-of-birth'
                    label='Date of Birth'
                    name='dateOfBirth'
                    value={dateOfBirth.value}
                    handleChange={handleOnChange}
                    variant='outlined'
                    mask='99/99/9999'
                />
                <Spacer />
                <Input
                    id='input-phone-number'
                    label='Phone Number'
                    name='phoneNumber'
                    value={phoneNumber.value}
                    handleChange={handleOnChange}
                    variant='outlined'
                    mask='+1 (999) 999-9999'
                />
            </TwoColRow>
            <SingleColRow>
                <Input
                    id='input-address'
                    label='Address'
                    name='address'
                    value={address.value}
                    handleChange={handleOnChange}
                    variant='outlined'
                />
            </SingleColRow>
            <Input
                id='input-notes'
                label='Notes'
                name='notes'
                value={notes.value}
                handleChange={handleOnChange}
                variant='outlined'
                error={notes.error}
                multiline={true}
            />
            <SubmitContainer>
                <Button onClick={() => handleCancelForm()} variant='outlined'>
                    Cancel
                </Button>
                <Spacer />
                <Button type='submit' color='primary' variant='contained' disabled={disable}>
                    Save
                </Button>
            </SubmitContainer>
        </FormContainer>
    )
}

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`;

const SubmitContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
`;

const TwoColRow = styled.div`
    display: flex;
`;

const Spacer = styled.div`
    min-width: 20px;
`;

const SingleColRow = styled.div`
    width: 100%;
`;

export default UserForm;