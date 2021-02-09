import { 
    Dialog, 
    DialogContent, 
    DialogTitle,
} from '@material-ui/core';

const ModalDialog = ({
    showModal, 
    setShowModal,
    title,
    children
}) => {

    return (
        <div>
            <Dialog 
                maxWidth='md'
                open={showModal} 
                onClose={setShowModal} 
                aria-labelledby="form-dialog-title"
            >
                { 
                    title ? 
                        <DialogTitle id="form-dialog-title">
                            {title}
                        </DialogTitle> 
                    : null
                }
                <DialogContent>
                    {children}
                </DialogContent>
                
            </Dialog>
        </div>
    )
}

export default ModalDialog;