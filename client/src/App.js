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
  const [user, setUser] = useState(defaultUserFormat);
  const [users, setUsers] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])
  
  const getUsers = async () => {
    const users = await api.get();
    console.log('users response: ', users);
    setUsers(users);
    // console.log('updated: ', putUser);
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
      console.log('posted... ', postedUser);
      setUsers(prevUsers => [...prevUsers, postedUser])
      setShowModal(false)
    }
  }

  const handleCancelForm = () => {
    setUser(defaultUserFormat);
    setShowModal(false);
  }

  const handleRowClick = (data) => {
    setIsEditing(true);
    setUser(data.row);
    setShowModal(true);
  }

  const handleDeleteClick = async (data) => {
    //Todo add a modal confirmation here 
    await api.delete(data.row.id);
    setUsers(prevUsers => {
      return prevUsers.filter(user => user.id !== data.row.id);
    })
  }

  return (
    <AppContainer>
      <HeaderRow>
        <h1>Add Your Favorite Football Player</h1>
        <Button 
          variant='contained' 
          color='primary'
          onClick={() => setShowModal(true)}
        >Add Player</Button>
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
      >
        <UserForm 
          user={user}
          onSubmit={handleSaveUser}
          handleCancelForm={handleCancelForm}
        />
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

export default App;