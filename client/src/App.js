import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import ModalDialog from './components/ModalDialog';
import UserForm from './UserForm';
import Table from './components/Table';
import api from './api';

const defaultUserFormat = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  address: '',
  notes: ''
}

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState(defaultUserFormat);
  const [users, setUsers] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])
  
  const getUsers = async () => {
    const users = await api.get();
    setUsers(users);
  }

  const handleSaveUser = async (newUser) => {
    const newUserObj = {
      id: user.id,
      firstName: newUser.firstName.value, 
      lastName: newUser.lastName.value, 
      dateOfBirth: newUser.dateOfBirth.value, 
      phoneNumber: newUser.phoneNumber.value, 
      address: newUser.address.value, 
      notes: newUser.notes.value, 
    }
    if (isEditing) {
      const putUser = await api.put(newUserObj);
      console.log('updated...', putUser);
      const userIndex = users.findIndex(obj => obj.id === newUserObj.id);
      let newUsers = [...users];
      newUsers[userIndex] = newUserObj;
      setUsers(newUsers);
      setShowModal(false);
    } else {
      const postedUser = await api.post(newUserObj);
      setUsers(prevUsers => [...prevUsers, postedUser])
      setShowModal(false)
    }
    setUser(defaultUserFormat);
  }

  const handleCancelForm = () => {
    setUser(defaultUserFormat);
    setShowModal(false);
    setIsEditing(false);
  }

  const handleRowClick = (data) => {
    setIsEditing(true);
    setUser(data.row);
    setShowModal(true);
  }

  const handleDeleteClick = async (data) => {
    setUser(data.row);
    setShowDeleteModal(true);
  }

  const deleteUser = async () => {
    await api.delete(user.id);
    setUsers(prevUsers => {
      return prevUsers.filter(userObj => userObj.id !== user.id);
    })
    setUser(defaultUserFormat)
  }

  const handleCancelDelete = () => {
    setUser(defaultUserFormat);
    setShowDeleteModal(false);
  }

  return (
    <AppContainer>
      <HeaderRow>
        <h1>Users</h1>
        <Button 
          variant='contained' 
          color='primary'
          onClick={() => setShowModal(true)}
        >Add User</Button>
      </HeaderRow>
      <TableContainer>
        {
          users ? 
              <Table
                data={users}
                handleEditClick={handleRowClick}
                handleDeleteClick={handleDeleteClick}
              /> 
              : <h1>Loading...</h1>
        }
      </TableContainer>
      <ModalDialog 
        showModal={showModal}
        setShowModal={setShowModal}
        title='Add User'
      >
        <UserForm 
          user={user}
          onSubmit={handleSaveUser}
          handleCancelForm={handleCancelForm}
        />
      </ModalDialog>
      <ModalDialog 
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        // title={`You are about to delete ${user.firstName}`}
      >
        <DeleteConfirmationContainer>
          <h3>You are about to delete {user.firstName}</h3>
          <p>Are you sure you want to do this?</p>
          <ButtonContainer>
            <Button color='primary' variant='contained' onClick={() => deleteUser()}>
                Yes Delete
            </Button>
            <Spacer />
            <Button onClick={() => handleCancelDelete()} variant='outlined'>
                Cancel
            </Button>
          </ButtonContainer>
        </DeleteConfirmationContainer>
      </ModalDialog>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #F1F3F7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 85%;
`;

const DeleteConfirmationContainer = styled.div`
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 0 20px 10px;
`;

const Spacer = styled.div`
    min-width: 8px;
`;

export default App;