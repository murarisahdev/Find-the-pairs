import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectOption = ({ option, setOption }) => {
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={option}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={10}>
          <em>select pair</em>
        </MenuItem>
        <MenuItem value={6}>6 pairs</MenuItem>
        <MenuItem value={8}>8 pairs</MenuItem>
        <MenuItem value={10}>10 pairs </MenuItem>
        <MenuItem value={12}>12 pairs </MenuItem>
        <MenuItem value={15}>15 pairs </MenuItem>
        <MenuItem value={18}>18 pairs </MenuItem>
        <MenuItem value={21}>21 pairs </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectOption;
