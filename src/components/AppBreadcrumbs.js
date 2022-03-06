import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CustomSeparator(props) {
  const history = useNavigate()
  const location = useLocation()

  let labelHead = location.state.labelHead || '';
  let arr = location.state.breadcrumbs;

  let breadcrumbs = arr.map((item, key) => {
    let res = ""
    if (item.to !== "")
      res = (<Link
        underline="hover"
        color="inherit"
        key={key}
        onClick={() => history(item.to)}
      >
        {item.title}
      </Link >)
    else res = (<Typography key={key} color="text.primary">
      {item.title}
    </Typography>)
    return res
  })


  return (
    <Stack spacing={2} mt={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>

    </Stack>
  );
}