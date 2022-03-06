import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

class SearchText extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onSearchChange(e.target.value);
  }

  render() {
    return (<TextField
      id="outlined-search"
      type="search"
      size="small"
      sx={{ marginTop: "1em" }}
      onChange={this.handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
    );
  }
}

export default SearchText;