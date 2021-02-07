import { DataGrid } from '@material-ui/data-grid';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from './styles';

const Table = ({ data, handleEditClick, handleDeleteClick }) => {

  const columns = [
    { field: 'firstName', headerName: 'First name', flex: 1.5 },
    { field: 'lastName', headerName: 'Last name', flex: 1.5 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1.5 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex:1.5 },
    { field: 'address', headerName: 'Address', flex: 2 },
    { field: 'notes', headerName: 'Notes', flex: 2 },
    {
      field: 'edit',
      headerName: 'edit',
      renderCell: (params) => (
        <IconButton
          aria-label='edit'
          color='primary'
          onClick={() => handleEditClick(params)}
        >
          <EditIcon />
        </IconButton>
      ),
      renderHeader: () => (<div></div>),
      sortable: false,
      filterable: false,
      flex: 1
    },
    {
      field: 'delete',
      headerName: '',
      renderCell: (params) => (
        <IconButton 
          aria-label='delete' 
          color='secondary'
          onClick={() => handleDeleteClick(params)}
          >
          <DeleteIcon />
        </IconButton>
      ),
      renderHeader: () => (<div></div>),
      sortable: false,
      filterable: false,
      flex: 1
    },
  ];

  const classes = useStyles();

  return (
    <div 
      style={{ 
        height: 650, 
        width: '100%', 
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.25)',
        backgroundColor: '#ffffff' ,
        borderRadius: '12px',
        padding: '5px',
      }}
    >
      <DataGrid 
        className={classes.tableRoot}
        rows={data} 
        columns={columns} 
        pageSize={10} 
        disableClickEventBubbling
        disableColumnMenu
        disableSelectionOnClick
    />
    </div>
  );
}

export default Table;
