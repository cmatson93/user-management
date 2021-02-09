import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    inputRoot: {
        background: '#ffffff',
        color: '#616871',
        minWidth: '100%',
    }, 
    tableRoot: {
        // '& .custom-table-header-cell': {
        //     backgroundColor: 'rgba(255, 7, 0, 0.55)',
        // },
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#F4F6FB'

        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-columnsContainer:focus' : {
            outline: 'none'
        }, 
    },
    // dialogRoot: {
    //     '& .MuiDialog-paperWidthSm' : {
    //         maxWidth: '800px'
    //     }
    // }
});


