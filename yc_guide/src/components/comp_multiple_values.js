import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function Comp_multiple_values({ onValueChange }) {
  const [restName, setRestName] = useState([]);

  useEffect(() => {
    fetch("/api/restaurants/names")
      .then((response) => response.json())
      .then((data) => setRestName(data))
      .catch((error) => console.log("Error fetching data: ", error));
      console.log('Fetch is completed!');
      console.log(restName);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ height: "auto", paddingTop: "5%", paddingBottom: "5%" }}
    >
      <Autocomplete
        multiple
        id="tags-standard"
        options={restName}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          onValueChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="상호명"
            placeholder="Favorites"
          />
        )}
        style={{ width: 500 }}
      />
    </Box>
  );
}
