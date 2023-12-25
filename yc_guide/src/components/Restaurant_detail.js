//작성일: 2023/12/13
//목적  : 가게 상세 팝업 구현

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function RestaurantDetailPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [restInfo, setRestInfo] = useState({});
  //   const [restInfo, setRestInfo] = useState([]);
  const [menuInfo, setMenuInfo] = useState([]);
  //useState({}) : 객체로 초기화 useState([]) : 배열로 초기화

  const restaurantUrl = "/api/restaurants/:1";
  const menuUrl = "/api/restaurants/:1/menu";
  const EditRestaurantUrl = "/api/restaurants/:1/edit";

  const [Restname, setName] = useState();
  const [Restcategory1, setCategory1] = useState();
  const [Restcategory2, setCategory2] = useState();
  const [Resttelnum, setTelnum] = useState();
  const [RestcoarseLocation, setCoarseLocation] = useState();
  const [RestrealLocation, setRealLocation] = useState();
  const [RestoperationHour, setOperationHour] = useState();
  const [RestbreakingTime, setBreakingTime] = useState();

  const [edited, setEdited] = useState(1);
  const [editButtonHit, setEditButtonHit] = useState(1);

  const [editingRestInfo, setEditingRestInfo] = useState({
    // ID: restInfo.idrestaurant,
    // name: restInfo.name,
    // category1: restInfo.category1,
    // category2: restInfo.category2,
    // telnum: restInfo.telnum,
    // coarse_location: restInfo.coarse_location,
    // real_location: restInfo.real_location,
    // operation_hour: restInfo.operation_hour,
    // breakingtime: restInfo.breakingtime,
    // update_date: restInfo.update_date,
  });

  const [editable, setEditable] = useState(false); //수정 가능 여부
  const [saveButtonHit, setSaveButtonHit] = useState(1);

  const [editingMenu, setEditingMenu] = useState([]);
  const [editableMenu, setEditableMenu] = useState(false);

  useEffect(() => {
    RestInfo();
    MenuInfo();
  }, [editButtonHit, saveButtonHit]);

  const RestInfo = () => {
    fetch(restaurantUrl)
      .then((response) => response.json())
      .then((data) => {
        setRestInfo(data);
        console.log("Rest Info:", restInfo);
        console.log("restInfo.idrestaurant: ", restInfo[0].idrestaurant);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  };

  const MenuInfo = () => {
    fetch(menuUrl)
      .then((response) => response.json())
      .then((data) => {
        setMenuInfo(data);
        setEditingMenu(data); // 가져온 데이터로 editingMenu 초기화
      })
      .catch((error) => console.log("데이터를 불러오는 중 에러 발생: ", error));

    console.log("MenuInfo setMenuInfo", editingMenu);
    console.log("length", editingMenu.length)
  };

  // const MenuInfo = () => {
  //   fetch(menuUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMenuInfo(data);
  //       console.log("Menu Info:", data);
  //     })
  //     .catch((error) => console.log("Error fetching data: ", error));
  // };

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

  useEffect(() => {
    if (restInfo.length > 0 && restInfo[0].idrestaurant) {
      setEditingRestInfo({
        ID: restInfo[0].idrestaurant,
        name: restInfo[0].name,
        category1: restInfo[0].category1,
        category2: restInfo[0].category2,
        telnum: restInfo[0].telnum,
        coarse_location: restInfo[0].coarse_location,
        real_location: restInfo[0].real_location,
        operation_hour: restInfo[0].operation_hour,
        breakingtime: restInfo[0].breakingtime,
        update_date: restInfo[0].update_date,
      });

      console.log("restInfo in here", restInfo[0]);
      console.log("editingRestInfo in here", editingRestInfo);

      setName(restInfo[0].name);
      setCategory1(restInfo[0].category1);
      setCategory2(restInfo[0].category2);
      setTelnum(restInfo[0].telnum);
      setCoarseLocation(restInfo[0].coarse_location);
      setRealLocation(restInfo[0].real_location);
      setOperationHour(restInfo[0].operation_hour);
      setBreakingTime(restInfo[0].breakingtime);
    }
  }, [restInfo]);

  const handleEditable = () => {
    setEditable(true);
    setEditButtonHit(editButtonHit + 1);
    // console.log("editButtonHit:");
    // console.log(editButtonHit);
  };

  const saveButton = () => {
    updateRestaurantInfo();
    setSaveButtonHit(saveButtonHit + 1);
    // console.log("saveButtonHit", saveButtonHit);
    setEditable(false);
  };

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    console.log("시간", now);
    console.log("Restname when save Button hitted", Restname);
    setEditingRestInfo((prevEditingRestInfo) => ({
      ...prevEditingRestInfo,
      name: Restname,
      category1: Restcategory1,
      category2: Restcategory2,
      telnum: Resttelnum,
      coarse_location: RestcoarseLocation,
      real_location: RestrealLocation,
      operation_hour: RestoperationHour,
      breakingtime: RestbreakingTime,
      //update_date: now.toISOString(),
      update_date: formattedDate
    }));
    console.log("editingRestInfo that changed", editingRestInfo);
  }, [Restname, Restcategory1, Restcategory2, Resttelnum, RestcoarseLocation, RestrealLocation, RestoperationHour, RestbreakingTime]);

  const updateRestaurantInfo = () => {
    fetch(EditRestaurantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingRestInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully:", data);
      })
      .catch((error) => console.error("Error updating data:", error));
  };


  const handleLikesCount = () => {
    //LIKE 버튼 눌렀을 때
  };

  const handleMenuChange = (index, field, value) => {
    //setEditingMenu
    setEditableMenu ((prevEditingMenu) => {
      const updatedMenu = [...prevEditingMenu];
      updatedMenu[index][field] = value;
      return updatedMenu;
    });
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
          <AppBar sx={{ position: "relative" }}>
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
            //value={restInfo[0].name}
            value={Restname}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="category1"
            //value={restInfo[0].category1}
            value={Restcategory1}
            onChange={(e) => setCategory1(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="category2"
            //value={restInfo[0].category2}
            value={Restcategory2}
            onChange={(e) => setCategory2(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="telnum"
            //value={restInfo[0].telnum}
            value={Resttelnum}
            onChange={(e) => setTelnum(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="coarse_location"
            //value={restInfo[0].coarse_location}
            value={RestcoarseLocation}
            onChange={(e) => setCoarseLocation(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="real_location"
            //value={restInfo[0].real_location}
            value={RestrealLocation}
            onChange={(e) => setRealLocation(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="operation_hour"
            //value={restInfo[0].operation_hour}
            value={RestoperationHour}
            onChange={(e) => setOperationHour(e.target.value)}
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="breaking_time"
            //value={restInfo[0].breakingtime}
            value={RestbreakingTime}
            onChange={(e) => setBreakingTime(e.target.value)}
            variant="standard"
          />

          <List>
            <Divider />
            <ListItem>
              <ListItemText primary="메뉴" />
            </ListItem>
            {editingMenu &&
              editingMenu.map((menu, index) => (
                <ListItem key={index}>
                  <>
                    <TextField
                      required
                      id={`menu-name-${index}`}
                      label="메뉴명"
                      value={menu.name}
                      onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                      variant="standard"
                    />
                    <TextField
                      required
                      id={`menu-price-${index}`}
                      label="가격"
                      value={menu.price}
                      onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="standard-required"
                      label="LIKES"
                      value={menu.likes}
                      onChange={(e) => handleMenuChange(index, 'likes',e.target.value)}
                      //defaultValue={menu.price}
                      variant="standard"
                    />
                  </>
                </ListItem>
              ))}
          </List>

          {/* <List>
            <Divider/>
            <ListItem>
              <ListItemText primary="메뉴" />
            </ListItem>

            {editingMenu && editingMenu.map((menu, index) => (
              <ListItem key={index}>
                <>
                  <TextField
                    required
                    id="standard-required"
                    label="메뉴명"
                    //defaultValue={menu.name}
                    value={menu.name}
                    onChange={(e) => setBreakingTime(e.target.value)}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="standard-required"
                    label="가격"
                    value={menu.price}
                    onChange={(e) => setBreakingTime(e.target.value)}
                    //defaultValue={menu.price}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="standard-required"
                    label="LIKES"
                    value={menu.likes}
                    onChange={(e) => setBreakingTime(e.target.value)}
                    //defaultValue={menu.price}
                    variant="standard"
                  />
                </>
              </ListItem>
            ))}
          </List> */}

          {/* <List>
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
                      //defaultValue={menu.name}
                      value={menu.name}
                      onChange={(e) =>setBreakingTime(e.target.value)}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="standard-required"
                      label="가격"
                      value={menu.price}
                      onChange={(e) =>setBreakingTime(e.target.value)}
                      //defaultValue={menu.price}
                      variant="standard"
                    />
                  </>
                </ListItem>
              ))}
          </List> */}
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
          <AppBar sx={{ position: "relative" }}>
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
                  secondary={`${restInfo[0].category1}/${restInfo[0].category2}`}
                />
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
            {menuInfo &&
              menuInfo.map((menu, index) => (
                <ListItem key={index}>
                  <>
                    <ListItemText primary={menu.name} />
                    <ListItemText primary={menu.price} />
                    <ListItemText primary={menu.likes} />
                    <Button autoFocus color="inherit" onClick={handleLikesCount}>I LIKE IT</Button>
                  </>
                </ListItem>
              ))}
          </List>
        </Dialog>
      </React.Fragment>
    );
  }
}
