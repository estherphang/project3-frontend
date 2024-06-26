import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

import axios from "axios";

const BACKEND_URL = import.meta.env.BACKEND_URL;

export default function BenefitSelection({ labelName, name, onChange, value }) {
  const style = {
    outlineStyle: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(119, 101, 227)", // Change outline color to purple when focused
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(119, 101, 227)", // Change label color to purple when focused
      },
    },
  };

  const [benefit, setBenefit] = useState([]);
  const [chosenOption, setChosenOption] = useState(value);

  //lift up state
  const handleChange = (e) => {
    setChosenOption(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    // Update the chosen option when the value prop changes
    setChosenOption(value);
  }, [value]);

  //get Benefit Data
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/benefits`)
      .then((response) => {
        setBenefit(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("choice", chosenOption);

  return (
    <Box sx={style.outlineStyle}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenOption}
          label="Career Data"
          name={name}
          onChange={handleChange}
        >
          {benefit.map((item) => (
            //store item id as value
            <MenuItem key={item.id} value={item.id}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
