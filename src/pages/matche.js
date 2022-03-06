import { Label } from '@mui/icons-material';
import React from 'react';

import { useParams, useLocation } from 'react-router-dom';
import MatcheGrid from '../components/matcheGrid';

export default function Match() {
  let params = useParams();
  const location = useLocation()

  let id = -1;
  let urlStr = "";

  if (location.pathname.startsWith('/league')) {

    id = params.leagueId
    urlStr = `http://api.football-data.org/v2/competitions/${id}/matches`

  }
  if (location.pathname.startsWith('/teams')) {
    id = params.teamId
    urlStr = `http://api.football-data.org/v2/teams/${id}/matches`
  }

  return (<div>
    <MatcheGrid matchId={id} urlStr={urlStr} />
  </div>);
}
