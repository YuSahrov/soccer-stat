import React from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/ru';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DateFromTo from '../dataFromTo';
import ErrorShow from '../errorShow';
import AppBreadcrumbs from '../AppBreadcrumbs'



class MatcheGrid extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleDateFromToChange = this.handleDateFromToChange.bind(this);

    this.state = {
      dataItem: [],
      filterData: [],
      count: 0,
      error: false,
      messageError: "",
      errorCode: "",
      headName: "",
      pageSize: 11,
      page: 1,
      filterStr: "",
    }
  }
  componentDidMount() {
    let { matchId, urlStr } = this.props;

    this.getMatches(matchId, urlStr, this.state.filterStr);
  }

  getMatches(matchId, urlStr, filterStr) {
    axios.get(urlStr + filterStr, { headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API }, })
      .then(response => {
        this.setState(
          {
            dataItem: response.data.matches,
            filterData: response.data.matches,
            count: Math.round(response.data.count / this.state.pageSize)
          })
      })
      .catch(error => {
        console.log('===error===', error);
        if (error.response) {
          this.setState(
            {
              error: true,
              messageError: error.response.data.message,
              errorCode: error.response.data.errorCode
            }
          )
        }

      });

  }

  handlePageChange(event, value) {
    this.setState({ page: value, });
  }

  handleDateFromToChange(dateFrom, dateTo) {

    this.setState({ filterStr: `?dateFrom=${dateFrom}&dateTo=${dateTo}` }, () => {

      let { matchId, urlStr } = this.props;
      this.getMatches(matchId, urlStr, this.state.filterStr);
    })
  }


  getStatusDesc(status) {
    const statusDesc = {
      "SCHEDULED": "Запланирован",
      "LIVE": "В прямом эфире",
      "IN_PLAY": "В игре",
      "PAUSED": "Пауза",
      "FINISHED": "Завершен",
      "POSTPONED": "Отложен",
      "SUSPENDED": "Приостановлен",
      "CANCELED": "Отменен"
    }
    return statusDesc.hasOwnProperty(status) ? statusDesc[status] : 'Стутус не известен'
  }

  getResultMatche(res) {
    return (res.homeTeam ? res.homeTeam : "0") + ":" + (res.awayTeam ? res.awayTeam : "0")
  }

  drawPagonatin() {
    if (this.state.count > 0)
      return (
        <Stack spacing={2} justifyContent="center"
          alignItems="center" mt={4}>
          <Pagination count={this.state.count} page={this.state.page} shape="rounded" onChange={this.handlePageChange} />
        </Stack>
      )

  }

  drawTable() {
    let tableRows = ""
    if (this.state.filterData && this.state.filterData.length > 0) {
      const filterItem = this.state.filterData.slice((this.state.page - 1) * this.state.pageSize, (this.state.page - 1) * this.state.pageSize + this.state.pageSize);
      tableRows = filterItem.map((row) => {

        return (<TableRow key={row.id} className='matche-row'>
          <TableCell>{format(parseISO(row.utcDate), 'dd.MM.yyyy HH.mm', locale)}</TableCell>
          <TableCell>{this.getStatusDesc(row.status)}</TableCell>
          <TableCell>{row.homeTeam.name}</TableCell>
          <TableCell>-</TableCell>
          <TableCell>{row.awayTeam.name}</TableCell>
          <TableCell ></TableCell>
          <TableCell>{this.getResultMatche(row.score.fullTime)}
            <Typography variant='span' className='extraData' ml="2px">
              ({this.getResultMatche(row.score.extraTime)}) ({this.getResultMatche(row.score.penalties)})
            </Typography>
          </TableCell>
        </TableRow>
        )
      })
    }
    if (tableRows !== "")
      return (
        <div>

          <TableContainer component={Paper} >
            <Table aria-label="matches table">
              <TableBody>
                {tableRows}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    else
      return (<h1 style={{ textAlign: "center" }}>Нет данных для отображения</h1>)

  }

  render() {

    return (<div style={{ marginTop: "1rem" }}>
      {
        !this.state.error &&
        <div>
          <AppBreadcrumbs></AppBreadcrumbs>

          <h1>Матчи</h1>

          <div style={{ marginBottom: "1rem" }}>
            <DateFromTo onDateFromToChange={this.handleDateFromToChange} />
          </div>
        </div>
      }

      {!this.state.error && this.drawTable()}
      {!this.state.error && this.drawPagonatin()}

      {
        this.state.error &&
        <ErrorShow messageError={this.state.messageError} errorCode={this.state.errorCode} ></ErrorShow>
      }

    </div>)
  }
}

export default MatcheGrid;