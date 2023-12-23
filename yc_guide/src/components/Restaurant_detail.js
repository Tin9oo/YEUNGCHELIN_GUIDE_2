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
import { TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function RestaurantDetailPopup(props) {

    const [open, setOpen] = React.useState(false);
    const [restInfo, setRestInfo] = useState([]);
    const [menuInfo, setMenuInfo] = useState([]);

    const restaurantUrl = "/api/restaurants/:1";
    const menuUrl = "/api/restaurants/:1/menu";
    const EditRestaurantUrl = "/api/restaurants/:1/edit";

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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [editable, setEditable] = useState(false); //수정 가능 여부
    const [editedRestInfo, setEditedRestInfo] = useState([]);

    const handleEditable = () => {
        setEditable(true);
        setEditedRestInfo({
            name: restInfo[0].name,
            category1: restInfo[0].category1,
            category2: restInfo[0].category2,
            telnum: restInfo[0].telnum,
            coarse_location: restInfo[0].coarse_location,
            real_location: restInfo[0].real_location,
            operation_hour: restInfo[0].operation_hour,
            breakingtime: restInfo[0].breakingtime,
            update_date: restInfo[0].update_date
        });
    };
    const handleEditableClose = () => {
        console.log('Saved changes:', editedRestInfo);
        setEditable(false);
        updateRestaurantInfo();
    };
    const EditClose = () => {
        setOpen(false); //취향 껏 바꾸자잉
        setEditable(false);
    };

    const [Restname, setName] = useState(restInfo[0]?.name || '');
    const [Restcategory1, setCategory1] = useState(restInfo[0]?.category1 || '');
    const [Restcategory2, setCategory2] = useState(restInfo[0]?.category2 || '');
    const [Resttelnum, setTelnum] = useState(restInfo[0]?.telnum || '');
    const [RestcoarseLocation, setCoarseLocation] = useState(restInfo[0]?.coarse_location || '');
    const [RestrealLocation, setRealLocation] = useState(restInfo[0]?.real_location || '');
    const [RestoperationHour, setOperationHour] = useState(restInfo[0]?.operation_hour || '');
    const [RestbreakingTime, setBreakingTime] = useState(restInfo[0]?.breakingtime || '');

    const updateRestaurantInfo = () => {
        const now = new Date();
        const editedData = {
            name:Restname, 
            category1:Restcategory1, 
            category2:Restcategory2, 
            telnum:Resttelnum, 
            coarse_location:RestcoarseLocation, 
            real_location: RestrealLocation, 
            operation_hour:RestoperationHour, 
            breakingtime:RestbreakingTime,
            update_date: now.toISOString()
        };
    
        fetch(EditRestaurantUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data updated successfully:', data);
        })
        .catch(error => console.error('Error updating data:', error));
    };
    

    if (editable) {
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
                                onClick={EditClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Restaurant detail
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleEditableClose}>
                                SAVE
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].name}`}
                        value={Restname}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].category1}`}
                        value={Restcategory1}
                        onChange={(e) => setCategory1(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].category2}`}
                        value={Restcategory2}
                        onChange={(e) => setCategory2(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].telnum}`}
                        value={Resttelnum}
                        onChange={(e) => setTelnum(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].coarse_location}`}
                        value={RestcoarseLocation}
                        onChange={(e) => setCoarseLocation(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].real_location}`}
                        value={RestrealLocation}
                        onChange={(e) => setRealLocation(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].operation_hour}`}
                        value={RestoperationHour}
                        onChange={(e) => setOperationHour(e.target.value)}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label={`${restInfo[0].breakingtime}`}
                        value={RestbreakingTime}
                        onChange={(e) => setBreakingTime(e.target.value)}
                        variant="standard"
                    />

                    <List>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="메뉴" />
                        </ListItem>
                        {menuInfo && menuInfo.map((menu, index) => (
                            <ListItem key={index}>
                                <>
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="메뉴명"
                                        defaultValue={menu.name}
                                        variant="standard"
                                    />
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="가격"
                                        defaultValue={menu.price}
                                        variant="standard"
                                    />
                                </>
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
            </React.Fragment>
        );
    } else {
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
}