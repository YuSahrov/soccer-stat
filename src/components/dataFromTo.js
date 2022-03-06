import * as React from 'react';
import { Stack, TextField, Typography } from '@mui/material';



class DataFromTo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      dateFrom: null,
      dateTo: null
    }

  }

  handleChange(e) {
    //Проверка на коректность ввода данных
    let stateObject = {};
    stateObject[e.target.id] = e.target.value;

    this.setState(stateObject, () => {
      if (this.state.dateFrom && this.state.dateTo && this.state.dateFrom <= this.state.dateTo)
        this.props.onDateFromToChange(this.state.dateFrom, this.state.dateTo);
    })


  }


  render() {
    return (
      <Stack direction="row"
        alignItems="center" spacing={2}>
        <Typography>C</Typography>
        <TextField
          id="dateFrom"
          type="date"
          size="small"
          value={this.dateFrom}
          onChange={this.handleChange}
          sx={{ width: 180 }}

        />
        <Typography>По</Typography>
        <TextField
          id="dateTo"
          type="date"
          size="small"
          value={this.dateTo}
          onChange={this.handleChange}
          sx={{ width: 180 }}

        />
      </Stack>
    );
  }
}

export default DataFromTo;