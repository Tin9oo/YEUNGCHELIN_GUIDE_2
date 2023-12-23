import React, { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, setRef } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Comp_multiple_values({ onValueChange, refresh, setRefresh }) {
  const [restName, setRestName] = useState([]);
  const [restCat1, setRestCat1] = useState([]);
  const [restCat2, setRestCat2] = useState([]);
  const [restLoc, setRestLoc] = useState([]);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/restaurants/name")
      .then((response) => response.json())
      .then((data) => setRestName(data))
      .catch((error) => console.log("Error fetching data: ", error));

    fetch("/api/restaurants/category1")
      .then((response) => response.json())
      .then((data) => setRestCat1(data))
      .catch((error) => console.log("Error fetching data: ", error));

    fetch("/api/restaurants/category2")
      .then((response) => response.json())
      .then((data) => setRestCat2(data))
      .catch((error) => console.log("Error fetching data: ", error));

    fetch("/api/restaurants/coarse_location")
      .then((response) => response.json())
      .then((data) => setRestLoc(data))
      .catch((error) => console.log("Error fetching data: ", error));
  }, [refresh]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "auto", paddingTop: "5%", paddingBottom: "5%" }}
    >
      <Autocomplete
        multiple
        id="tags-standard"
        options={restName}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          onValueChange('name', newValue.map(item => item.name));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="상호명"
            placeholder="입력하세요"
          />
        )}
        style={{ width: 500, marginBottom: "20px" }}
      />
      <Accordion
        expanded={expanded === true}
        onChange={handleChange(true)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            고급 검색
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            multiple
            id="tags-standard"
            options={restCat1}
            getOptionLabel={(option) => option.category1}
            onChange={(event, newValue) => {
              onValueChange('category1', newValue.map(item => item.category1));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="카테고리"
                placeholder="입력하세요"
              />
            )}
            style={{ width: 500 }}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            options={restCat2}
            getOptionLabel={(option) => option.category2}
            onChange={(event, newValue) => {
              onValueChange('category2', newValue.map(item => item.category2));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="상세 카테고리"
                placeholder="입력하세요"
              />
            )}
            style={{ width: 500 }}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            options={restLoc}
            getOptionLabel={(option) => option.coarse_location}
            onChange={(event, newValue) => {
              onValueChange('coarse_location', newValue.map(item => item.coarse_location));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="위치"
                placeholder="입력하세요"
              />
            )}
            style={{ width: 500 }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
