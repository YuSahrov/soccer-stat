import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchText from '../components/searchText'
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorShow from '../components/errorShow';


class League extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

    this.state = {
      dataItem: [],
      filterData: [],
      searchStr: "",
      page: 1,
      count: 0,
      pageSize: 12,
      error: false,
      messageError: ""
    }

  }



  componentDidMount() {
    //Получаем данные с сервера
    const urlStr = "http://api.football-data.org/v2/competitions/";


    axios.get(urlStr, { headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API }, })
      .then(response => {
        this.setState(
          {
            dataItem: response.data.competitions,
            filterData: response.data.competitions,
            count: Math.round(response.data.count / this.state.pageSize)
          }
        )
      }

      )
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

  filterData() {
    let dataItem = [];
    if (this.state.searchStr !== "") {
      dataItem = this.state.dataItem.filter(item => {
        return item.name.toUpperCase().indexOf(this.state.searchStr.toUpperCase()) > -1 || item.area.name.toUpperCase().indexOf(this.state.searchStr.toUpperCase()) > -1
      })
    } else {
      dataItem = this.state.dataItem;
    }

    const count = Math.round(dataItem.length / this.state.pageSize)


    this.setState(
      {
        filterData: dataItem,
        count: (this.state.count !== count) ? count : this.state.count,
        page: (this.state.count !== count) ? 1 : this.state.page
      }
    )
  }


  handlePageChange(event, value) {
    this.setState({ page: value, });
  }

  handleSearchChange(searchText) {
    this.setState({ searchStr: searchText }, () => { this.filterData() });
  }

  bodyLigue() {
    let leagueListElemant = "";
    if (this.state.dataItem.length > 0) {

      const filterItem = this.state.filterData.slice((this.state.page - 1) * this.state.pageSize, (this.state.page - 1) * this.state.pageSize + this.state.pageSize);
      leagueListElemant = filterItem.map(item => {
        return (<Grid item xs={12} sm={6} md={4} key={item.id} ><LabelLeague league={item} /></Grid>)
      }
      );
    }
    return (<div>
      <SearchText onSearchChange={this.handleSearchChange} />

      <Grid container spacing={2} mt={1}>
        {leagueListElemant}
      </Grid>

      {
        this.state.count > 1 &&
        <Stack spacing={2} justifyContent="center"
          alignItems="center" mt={4}>
          <Pagination count={this.state.count} page={this.state.page} shape="rounded" onChange={this.handlePageChange} />
        </Stack>
      }
    </div>
    )
  }

  render() {
    return (

      <div>
        {!this.error &&
          this.bodyLigue()
        }
        {
          this.state.error &&
          <ErrorShow messageError={this.state.messageError} errorCode={this.state.errorCode} ></ErrorShow>
        }


      </div>)
  }
}

function LabelLeague(props) {
  const { league } = props;
  const history = useNavigate();
  return (
    <Card sx={{ minWidth: 200 }}>

      <CardActionArea onClick={() => history(`/league/${league.id}`, {
        state: {
          labelHead: league.name,
          breadcrumbs: [{ to: "/league", title: "Лиги" }, { to: "", title: league.name }]
        }
      })}>
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            {league.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center" mt={3}>
            {league.area.name}
          </Typography>

        </CardContent>
      </CardActionArea>

    </Card>
  );
}


export default League;