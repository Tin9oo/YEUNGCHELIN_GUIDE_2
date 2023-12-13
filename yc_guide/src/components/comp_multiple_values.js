import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Comp_multiple_values() {
  const [restName, setRestName] = React.useState([]);
  const [selValue, setSelValue] = React.useState([]);
  
  React.useEffect(() => {
    fetch('/api/restInfo')
      .then(response => response.json())
      .then(data => setRestName(data))
      .catch(error => console.log('Error fetching data: ', error));
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      // minHeight="100vh"
      sx={{ height: '100vh', paddingTop: '10%'}}
    >
      <Autocomplete
        multiple
        id="tags-standard"
        options={restName}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setSelValue(newValue);
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