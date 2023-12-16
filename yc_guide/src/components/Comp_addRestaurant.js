import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Comp_addRestaurant() {
  const [open, setOpen] = React.useState(false);
  const [restInput, setRestInput] = React.useState({
    name: "",
    category1: "",
    category2: "",
    telnum: "",
    Coarse_location: "",
    REAL_Location: "",
    opHourStart: "09:00",
    opHourEnd: "22:00",
    bkTimeStart: "15:00",
    bkTimeEnd: "17:00",
    star_score: 0
  });

  React.useEffect(() => {
    console.log(restInput);
  }, [restInput]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setRestInput({
      ...restInput,
      [e.target.name]: e.target.value
    });
    console.log(`[${e.target.name}]: ${e.target.value}`);
  };

  const handleSubmit = async () => {
    try {
        console.log(restInput);
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restInput)
        });
        if (response.ok) {
            console.log('가게 추가 완료');
            handleClose();
        }
        else {
            console.log('가게 추가 실패');
        }
    }
    catch (error) {
        console.error('서버 오류:', error);
    }
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
          />
          <TextField
            name="Coarse_location"
            margin="dense"
            id="Coarse_location"
            label="구역"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="REAL_Location"
            margin="dense"
            id="REAL_Location"
            label="주소"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="opHourStart"
            margin="dense"
            id="opHourStart"
            label="오픈시간"
            type="time"
            defaultValue="09:00"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                step: 300
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="opHourEnd"
            margin="dense"
            id="opHourEnd"
            label="마감시간"
            type="time"
            defaultValue="22:00"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                step: 300
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="bkTimeStart"
            margin="dense"
            id="bkTimeStart"
            label="Break time (시작)"
            type="time"
            defaultValue="15:00"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                step: 300
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="bkTimeEnd"
            margin="dense"
            id="breakingtime (끝)"
            label="bkTimeEnd"
            type="time"
            defaultValue="17:00"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                step: 300
            }}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            name="star_score"
            margin="dense"
            id="star_score"
            label="별점"
            type="number"
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
