import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import COUNTRY_DATA from '../COUNTRY_DATA.json';

function LabelCountryData() {
  const result = COUNTRY_DATA.map((data)=>{
    return {
      label: `${data.zho} ${data.name}`,
      ...data
    }
  });
  return result
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CaptialAutocomplete({selectedCaptial}:any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_event: React.SyntheticEvent, newValue: any) => {
    selectedCaptial(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={LabelCountryData()}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField sx={{ bgcolor: 'white'}} {...params} label="請選擇首都" />}
      onChange={handleChange}
    />
  );
}