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
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RestaurantDetailPopup(props) {
    const [open, setOpen] = React.useState(false);



    const [restInfo, setRestInfo] = useState([]);
    const [menuInfo, setMenuInfo] = useState([]);

    useEffect(() => {
        fetch(`/api/restaurants/detail/${0}`)
            .then((response) => response.json())
            .then((data) => setRestInfo(data))
            .catch((error) => console.log("Error fetching data: ", error));
        console.log('Fetch is completed!');
        console.log(restInfo);

        fetch(`/api/restaurants/detail/${0}/menu`)
            .then((response) => response.json())
            .then((data) => setMenuInfo(data))
            .catch((error) => console.log("Error fetching data: ", error));
        console.log('Fetch is completed!');
        console.log(menuInfo);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>

            {/* Button on main page */}
            <Button variant="outlined" onClick={handleClickOpen}>
                Restaurant detail
            </Button>

            {/* Dialog that will shown when click the button */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        {/* Close Button */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        {/* Contents that will shown on AppBar */}
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Restaurant detail
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Edit
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* the Things that have to shown on Restaurant_Detail Page */}
                <List>
                    <ListItem>
                        <ListItemText
                            primary={restInfo.name}
                            secondary={`${restInfo.category1}/${restInfo.category2}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={`
                                가게평점: ${restInfo.star_score} / 
                                시그니처메뉴: ${restInfo.signature_menu} / 
                                동서남북: ${restInfo.Coarse_location} / 
                                전화번호: ${restInfo.telnum} / 
                                실제주소: ${restInfo.Real_location} \n
                                운영시간: ${restInfo.operation_hour} / 
                                휴식시간: ${restInfo.breakingtime}`}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="메뉴" />
                    </ListItem>
                    {/* 메뉴 정보를 map으로 순회하여 각 아이템 렌더링 menuInfo는 하나의 테이블, name은 한 행(한 튜플)*/}
                    {menuInfo.map((menu, index) => (
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