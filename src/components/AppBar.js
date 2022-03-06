import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListItemText } from '@mui/material';

const pages = [{ id: 1, title: 'Лиги', to: "/league", index: '/' }, { id: 2, title: 'Команды', to: "/teams" }];


const AppToolBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const history = useNavigate()
  const loction = useLocation()


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.id} to={page.to} style={{ textDecoration: 'none', display: 'block' }}>
                  <MenuItem onClick={handleCloseNavMenu}  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <List sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: 0
            }}>
              {pages.map((page) => (
                <ListItem
                  button
                  key={page.id}
                  onClick={() => history(page.to)}
                  sx={
                    loction.pathname.startsWith(page.to) || loction.pathname === page.index ? { borderBottom: 2, borderColor: 'secondary.main' } : {}
                  }
                >
                  <ListItemText primary={page.title} />
                </ListItem>
              ))}
            </List>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppToolBar;