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
    const [restInfo, setRestInfo] = useState({});
    const [menuInfo, setMenuInfo] = useState([]);
    //useState({}) : 객체로 초기화 useState([]) : 배열로 초기화

    const restaurantUrl = "/api/restaurants/:1";
    const menuUrl = "/api/restaurants/:1/menu";
    const EditRestaurantUrl = "/api/restaurants/:1/edit";

    const [editingRestInfo, setEditingRestInfo] = useState({
        ID: restInfo.idrestaurant,
        name: restInfo.name,
        category1: restInfo.category1,
        category2: restInfo.category2,
        telnum: restInfo.telnum,
        coarse_location: restInfo.coarse_location,
        real_location: restInfo.real_location,
        operation_hour: restInfo.operation_hour,
        breakingtime: restInfo.breakingtime,
        update_date: restInfo.update_date
    });
    const [editable, setEditable] = useState(false); //수정 가능 여부

    useEffect(() => {
        RestInfo();
        MenuInfo();
    }, [editable]);

    const RestInfo = () => {
        fetch(restaurantUrl)
            .then((response) => response.json())
            .then((data) => {
                setRestInfo(data);
                console.log("Rest Info:", data);
            })
            .catch((error) => console.log("Error fetching data: ", error));
    };

    const MenuInfo = () => {
        fetch(menuUrl)
            .then((response) => response.json())
            .then((data) => {
                setMenuInfo(data);
                console.log("Menu Info:", data);
            })
            .catch((error) => console.log("Error fetching data: ", error));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const EditClose = () => {
        //setOpen(false);
        setEditable(false);
    };

    // const [Restname, setName] = useState();
    // const [Restcategory1, setCategory1] = useState();
    // const [Restcategory2, setCategory2] = useState();
    // const [Resttelnum, setTelnum] = useState();
    // const [RestcoarseLocation, setCoarseLocation] = useState();
    // const [RestrealLocation, setRealLocation] = useState();
    // const [RestoperationHour, setOperationHour] = useState();
    // const [RestbreakingTime, setBreakingTime] = useState();

    // const [edited, setEdited] = useState(1);
    // const [editButtonHit, setEditButtonHit] = useState(1);

    // useEffect(() => {
    //     RestInfo();
    //     setEditingRestInfo({
    //          ID: restInfo.idrestaurant,
    //          name: restInfo.name,
    //          category1: restInfo.category1,
    //          category2: restInfo.category2,
    //          telnum: restInfo.telnum,
    //          coarse_location: restInfo.coarse_location,
    //          real_location: restInfo.real_location,
    //          operation_hour: restInfo.operation_hour,
    //          breakingtime: restInfo.breakingtime,
    //          update_date: restInfo.update_date
    //      });

    //     console.log("restInfo", restInfo);
    //     console.log("editingRestInfo", editingRestInfo);

    //     setName(editingRestInfo); 
    //     console.log("Restname", Restname);

    //     setCategory1(editingRestInfo.category1);
    //     setCategory1(editingRestInfo.category2);
    //     setTelnum(editingRestInfo.telnum);
    //     setCoarseLocation(editingRestInfo.coarse_location);
    //     setRealLocation(editingRestInfo.real_location);
    //     setOperationHour(editingRestInfo.operation_hour);
    //     setBreakingTime(editingRestInfo.breakingtime);
    // }, [editButtonHit]);

    const handleEditable = () => {
        setEditable(true);
        let editNumber=0;
        editNumber+=1;
        //setEditButtonHit(editButtonHit + 1)
    };
    const saveButton = () => {
        updateRestaurantInfo();
        setEditable(false);
    };

    const updateRestaurantInfo = () => {
        // const now = new Date();
        // setEditingRestInfo({
        //     name: Restname,
        //     category1: Restcategory1,
        //     category2: Restcategory2,
        //     telnum: Resttelnum,
        //     coarse_location: RestcoarseLocation,
        //     real_location: RestrealLocation,
        //     operation_hour: RestoperationHour,
        //     breakingtime: RestbreakingTime,
        //     update_date: now.toISOString()
        // });

        console.log(editingRestInfo);

        console.log('Data updated successfully:');

        fetch(EditRestaurantUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingRestInfo),
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
                                Restaurant detail Edit
                            </Typography>
                            <Button autoFocus color="inherit" onClick={saveButton}>
                                SAVE
                            </Button>
                        </Toolbar>
                    </AppBar>
                    
                    <TextField
                        required
                        id="standard-required"
                        label="name"
                        value={restInfo[0].name}
                        onChange={(e) => setEditingRestInfo({name: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="category1"
                        value={restInfo[0].category1}
                        onChange={(e) => setEditingRestInfo({category1: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="category2"
                        value={restInfo[0].category2}
                        onChange={(e) => setEditingRestInfo({category2: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="telnum"
                        value={restInfo[0].telnum}
                        onChange={(e) => setEditingRestInfo({telnum: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="coarse_location"
                        value={restInfo[0].coarse_location}
                        onChange={(e) => setEditingRestInfo({coarse_location: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="real_location"
                        value={restInfo[0].real_location}
                        onChange={(e) => setEditingRestInfo({real_location: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="operation_hour"
                        value={restInfo[0].operation_hour}
                        onChange={(e) => setEditingRestInfo({operation_hour: e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="breaking_time"
                        value={restInfo[0].breakingtime}
                        onChange={(e) => setEditingRestInfo({breakingtime: e.target.value})}
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
                    TransitionComponent={Transition}>
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