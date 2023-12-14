//작성일: 23/12/13
//목적  : 가게 상세 팝업 구현

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Restaurant_detail_Popup(props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let [Restaurant_detail, b] = React.useState([])

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Restaurant detail
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Restaurant detail
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Edit
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem button>
                        <ListItemText primary="name" secondary="category1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>

        </React.Fragment>
    );
}


class Restaurant_detail_Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRestaurant: '',
            name: '',
            category1: '',
            category2: '',
            telnum: '',
            Coarse_location: '',
            Real_location: '',
            redirect_address: '',
            operation_hour: '',
            breakingtime: '',
            star_score: '',
            signature_menu: '',
            update_date: '',
            open: false
        }
    }

    handleClickOpen = () => { this.setState({ open: true }); } //해당 페이지가 열렸는가 확인/
    handleClose = () => { this.setState({ open: false }); } //닫기
}