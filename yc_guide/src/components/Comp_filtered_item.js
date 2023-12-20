import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Comp_filtered_item({ selRest, refresh, setRefresh }) {
  const [restInfo, setRestInfo] = useState([]);

  useEffect(() => {
    console.log("Length of selRest: ", selRest.length);
    console.log("selRest: ", selRest);

    if (
      selRest.name.length === 0 &&
      selRest.category1.length === 0 &&
      selRest.coarse_location.length === 0
    ) {
      allRest();
    } else {
      filteredRest();
    }
  }, [selRest, refresh]);

  const allRest = () => {
    fetch("api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestInfo(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const filteredRest = () => {
    const restInfoTmp = {
      name: selRest.name,
      category1: selRest.category1,
      coarse_location: selRest.coarse_location,
    };

    fetch(`api/restaurants/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restInfoTmp),
    })
      .then((response) => response.json())
      .then((data) => setRestInfo(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log("Function filtered_Rest is completed!");
  };

  return (
    <div>
      {restInfo.map((rest, index) => (
        <Card key={rest.idrestaurant} sx={{ maxWidth: 275, margin: 2 }}>
          <CardActionArea>
            {/* <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            /> */}
            <CardContent>
              {/* {Object.entries(rest).map(([key, value]) => (
                <div>{key}: {value}</div>
              ))} */}
              <Typography gutterBottom variant="h5" component="div">
                {rest.name}
              </Typography>
              <Typography color="text.secondary">
                {`${rest.category1} / ${rest.category2}`}
              </Typography>
              <Typography variant="body2">전화번호: {rest.telnum}</Typography>
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
