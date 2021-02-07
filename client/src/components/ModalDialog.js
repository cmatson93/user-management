import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
} from '@material-ui/core';
// import { useStyles } from './styles';

const ModalDialog = ({
    showModal, 
    setShowModal,
    children
}) => {

//   const classes = useStyles();

    return (
        <div>
            <Dialog 
                // className={classes.dialogRoot}
                maxWidth='md'
                open={showModal} 
                onClose={setShowModal} 
                aria-labelledby="form-dialog-title"
            >
                {/* TODO: could make add player text a prop to make component more generic */}
                <DialogTitle id="form-dialog-title">Add Player</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModalDialog;