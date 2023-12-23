import * as React from "react";
import { Button, ButtonGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  containerClasses,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Comp_addRestaurant({ refresh, setRefresh }) {
  const [open, setOpen] = React.useState(false);
  const [restInput, setRestInput] = React.useState({
    name: "",
    category1: "",
    category2: "",
    telnum: "",
    coarse_location: "",
    real_location: "",
    op_hour_start: "09:00",
    op_hour_end: "22:00",
    bk_time_start: "15:00",
    bk_time_end: "17:00",
  });

  React.useEffect(() => {
    console.log(restInput);
  }, [restInput]);
  React.useEffect(() => {
    console.log("refresh:", refresh);
  }, [refresh]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRestInput({
      name: "",
      category1: "",
      category2: "",
      telnum: "",
      coarse_location: "",
      real_location: "",
      op_hour_start: "09:00",
      op_hour_end: "22:00",
      bk_time_start: "15:00",
      bk_time_end: "17:00",
    });
  };

  const handleChange = (e) => {
    setRestInput({
      ...restInput,
      [e.target.name]: e.target.value,
    });
    console.log(`[${e.target.name}]: ${e.target.value}`);
  };

  const handleSubmit = async () => {
    try {
      // 유효성 검사
      if (!restInput.name) {
        alert("상호명을 입력하십시오.");
        return;
      }
      if (!restInput.category1 || !restInput.category2) {
        alert("카테고리를 입력하세요.");
        return;
      }
      if (!restInput.telnum || !restInput.telnum.match(/^(010-?[0-9]{4}-?[0-9]{4})$/)) {
        alert("유효하지 않은 전화번호 형식입니다.");
        return;
      }
      if (
        !restInput.coarse_location ||
        !["동", "서", "남", "북"].includes(restInput.coarse_location)
      ) {
        alert("유효하지 않은 구역입니다.");
        return;
      }
      if (restInput.op_hour_start >= restInput.op_hour_end) {
        alert("영업 시작 시간이 마감 시간보다 빨라야합니다.");
        return;
      }
      if (restInput.bk_time_start >= restInput.bk_time_end) {
        alert("브레이크타임 시작 시간이 마감 시간보다 빨라야합니다.");
        return;
      }
      if (
        restInput.bk_time_start < restInput.op_hour_start ||
        restInput.bk_time_end > restInput.op_hour_end
      ) {
        alert("브레이크타임은 영업시간 내에 있어야합니다.");
        return;
      }
      console.log(restInput);
      const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restInput),
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }

      console.log("가게 추가 완료");
      setRefresh(!refresh);
      handleClose();
    } catch (error) {
      alert(error.message);
      console.error("서버 오류:", error);
    }
  };

  const handleLocationSelect = (location) => {
    setRestInput({ ...restInput, coarse_location: location });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        가게 추가
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 가게 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>음식점 정보 입력창입니다.</DialogContentText>
          <TextField
            autoFocus
            required
            name="name" // 폼 데이터가 서버로 제출될 때, name이 key로 사용되어 서버에서 식별됨.
            margin="dense"
            id="name" // HTML 요소의 고유 식별자. 문서에서 유일해야함.
            label="상호명"
            type="text" // 입력 유형
            fullWidth
            variant="standard" // standard, outlined, filled 등의 사용방식이 있다.
            onChange={handleChange} // 필드 입력값 변경 시 실행하여 상태값을 갱신한다.
          />
          <TextField
            required
            name="category1"
            margin="dense"
            id="category1"
            label="상위 카테고리"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            name="category2"
            margin="dense"
            id="category2"
            label="하위 카테고리"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="telnum"
            margin="dense"
            id="telnum"
            label="연락처"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <ButtonGroup sx={{ pt: 1 }}>
            <Button
              variant={
                restInput.coarse_location === "동" ? "contained" : "outlined"
              }
              onClick={() => handleLocationSelect("동")}
            >
              동문
            </Button>
            <Button
              variant={
                restInput.coarse_location === "서" ? "contained" : "outlined"
              }
              onClick={() => handleLocationSelect("서")}
            >
              서문
            </Button>
            <Button
              variant={
                restInput.coarse_location === "남" ? "contained" : "outlined"
              }
              onClick={() => handleLocationSelect("남")}
            >
              남문
            </Button>
            <Button
              variant={
                restInput.coarse_location === "북" ? "contained" : "outlined"
              }
              onClick={() => handleLocationSelect("북")}
            >
              북문
            </Button>
            {/* <Button
              variant={
                restInput.coarse_location === "에러용"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleLocationSelect("에러용")}
            >
              에러용
            </Button> */}
          </ButtonGroup>
          <TextField
            name="real_location"
            margin="dense"
            id="real_location"
            label="주소"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="op_hour_start"
            margin="dense"
            id="op_hour_start"
            label="오픈시간"
            type="time"
            defaultValue="09:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="op_hour_end"
            margin="dense"
            id="op_hour_end"
            label="마감시간"
            type="time"
            defaultValue="22:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="bk_time_start"
            margin="dense"
            id="bk_time_start"
            label="Break time (시작)"
            type="time"
            defaultValue="15:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="bk_time_end"
            margin="dense"
            id="bk_time_end"
            label="breakingtime (끝)"
            type="time"
            defaultValue="17:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>추가</Button>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
