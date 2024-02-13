import * as React from "react";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ label_name }) {
  const [chosenoption, setChosenOption] = React.useState("");

  const handleChange = (event) => {
    setChosenOption(String(event.target.value));
  };

  return (
    <Box className="box">
      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: "white",
            fontSize: "1.5rem",
            fontStyle: "",
            fontWeight: "bold",
            marginLeft: "-8px",
          }}
          id="demo-simple-select-label"
        >
          {label_name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenoption}
          label="Options"
          sx={{ color: "white", marginTop: "5px" }}
          onChange={handleChange}
        >
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
