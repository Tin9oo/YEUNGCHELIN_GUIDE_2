import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Comp_filtered_item({ selRest }) {
  const [expanded, setExpanded] = useState(false);
  const [restInfo, setRestInfo] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch("/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestInfo(data))
      .catch((error) => console.log(error));
  });

  return (
    <div>
      {restInfo.map((rest, index) => (
        <Card sx={{ maxWidth: 275, margin: 2 }}>
          <CardActionArea>
            {/* <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {rest.name}
              </Typography>
              <Typography color="text.secondary">
                {`${rest.category1} / ${rest.category2}`}
              </Typography>
              <Typography variant="body2">
                전화번호: {rest.telnum}
              </Typography>
              <Typography variant="body2">
                위치: {rest.Coarse_location}
              </Typography>
              <Typography variant="body2">
                운영 시간: {rest["operation hour"]}
              </Typography>
              <Typography variant="body2">
                휴식 시간: {rest.breakingtime}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
