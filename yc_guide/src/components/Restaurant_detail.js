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
    const [edit_able, setEditable] = useState(false); //수정 가능 여부
    const [restInfo, setRestInfo] = useState([]);
    const [menuInfo, setMenuInfo] = useState([]);

    const restaurantUrl = "/api/restaurants/:0";
    const menuUrl = "/api/restaurants/:0/menu";

    useEffect(() => {
        RestInfo();
        console.log("why;;");
        MenuInfo();
        console.log("notWorking;;");
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
                        <Button autoFocus color="inherit" onClick={handleEditable}>
                            Edit
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText
                            primary={`${restInfo[0].name}`}
                            secondary={`${restInfo[0].category1}/${restInfo[0].category2}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={`
                            가게평점: ${restInfo[0].star_score} / 
                            시그니처메뉴: ${restInfo[0].signature_menu} / 
                            동서남북: ${restInfo[0].Coarse_location} / 
                            전화번호: ${restInfo[0].telnum} / 
                            실제주소: ${restInfo[0].Real_location} \n
                            운영시간: ${restInfo[0]['operation hour']} / 
                            휴식시간: ${restInfo[0].breakingtime}`}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="메뉴" />
                    </ListItem>
                    {menuInfo && menuInfo.map((menu, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={menu.name} />
                            <ListItemText primary={menu.price} />
                        </ListItem>
                    ))}
                </List>

            </Dialog>
        </React.Fragment>
    );
}