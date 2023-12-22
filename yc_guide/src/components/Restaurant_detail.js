//작성일: 2023/12/13
//목적  : 가게 상세 팝업 구현

import React, { useState, useEffect } from 'react';
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
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function RestaurantDetailPopup(props) {

    const [open, setOpen] = React.useState(false);
    const [restInfo, setRestInfo] = useState([]);
    const [menuInfo, setMenuInfo] = useState([]);

    const [editable, setEditable] = useState(false); //수정 가능 여부
    const [editedRestInfo, setEditedRestInfo] = useState([]);

    const restaurantUrl = "/api/restaurants/:1";
    const menuUrl = "/api/restaurants/:1/menu";

    useEffect(() => {
        RestInfo();
        MenuInfo();
    }, []);

    const RestInfo = () => {
        fetch(restaurantUrl)
            .then((response) => response.json())
            .then((data) => {
                setRestInfo(data);
                console.log("Rest Info:", data);
            })
            .catch((error) => console.log("Error fetching data: ", error));
    }

    const MenuInfo = () => {
        fetch(menuUrl)
            .then((response) => response.json())
            .then((data) => {
                setMenuInfo(data);
                console.log("Menu Info:", data);
            })
            .catch((error) => console.log("Error fetching data: ", error));
    }

    const handleEditable = () => {
        setEditable(true);
    };
    const handleEditableClose = () => {
        setEditable(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    console.log('')

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
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
                    <ListItem>
                        {restInfo[0] && (
                            <ListItemText
                                primary={`${restInfo[0].name}`}
                                secondary={`${restInfo[0].category1}/${restInfo[0].category2}`} />
                        )}
                    </ListItem>
                    <ListItem>
                        {restInfo[0] && (
                            <ListItemText
                                primary={`
                                    전화번호: ${restInfo[0].telnum} / 
                                    동서남북: ${restInfo[0].coarse_location} / 
                                    실제주소: ${restInfo[0].real_location} /
                                    운영시간: ${restInfo[0].operation_hour} / 
                                    휴식시간: ${restInfo[0].breakingtime}`}
                            />
                        )}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="메뉴" />
                    </ListItem>
                    {menuInfo && menuInfo.map((menu, index) => (
                        <ListItem key={index}>
                            <>
                                <ListItemText primary={menu.name} />
                                <ListItemText primary={menu.price} />
                            </>
                        </ListItem>
                    ))}
                </List>

            </Dialog>
        </React.Fragment>
    );
}