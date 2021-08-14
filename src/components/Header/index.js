import React from 'react';
import LibraryMenu from './LibraryMenu';
import CreateMenu from './CreateMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import FoldersAddedDialog from 'components/Folders/FoldersAddedDialog';
import NavExpand from 'components/Header/NavExpand/index';
import { Link } from 'react-router-dom';

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Poller One',
  },
  home: {
    color: 'inherit',
    margin: '0 5px',
  },
  library: {
    color: 'inherit',
    margin: '0 5px',
  },
  create: {
    background: 'cyan',
    color: 'primary',
    margin: '0 5px',
    '& *':{
      color: 'inherit',
    }
  },
    
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  homeIcon: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  expandMenuIcon: {
    cursor: 'pointer',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [libraryAnchorEl, setLibraryAnchorEl] = React.useState(null);
  const [createAnchorEl, setCreateAnchorEl] = React.useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isNavExpanded, setIsNavExpanded] = React.useState(false)

  const isLibraryMenuOpen = Boolean(libraryAnchorEl);
  const isCreateMenuOpen = Boolean(createAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLibraryMenuOpen = (event) => {
    setLibraryAnchorEl(event.currentTarget);
  };
  const handleCreateMenuOpen = (event) => {
    setCreateAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setProfileAnchorEl(null);
    setCreateAnchorEl(null);
    setLibraryAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleNavExpanded = (state) => {setIsNavExpanded(state)}

  const [foldersAddedFormOpen, setFoldersAddedFormOpen] = React.useState(false);
  const handleFoldersAddedFormClose = () => {
    setFoldersAddedFormOpen(false);
  };
  const handleFoldersAddedFormOpen = () => {
    setFoldersAddedFormOpen(true);
  };

  return (
    <div className={classes.grow}>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <div className={classes.sectionMobile}>
          <MenuIcon
            className={classes.expandMenuIcon}
            onClick={() => handleNavExpanded(true)}
          />
          <Link className={classes.homeIcon} to='/'
          >
          <Typography
            className={classes.title}
            variant="h5"
            noWrap
          >
            F
          </Typography>
          </Link>
          </div>
          <div className={classes.sectionDesktop}>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          >
            FLASHCARD
          </Typography>
            <Button component={Link} to='/' className={classes.home}>HOME</Button>
          <Button
            className={classes.library}
            endIcon={<KeyboardArrowDownIcon />}
            aria-label="library more"
            aria-haspopup="true"
            onClick={handleLibraryMenuOpen}
          >
            Your Library
          </Button>
          <Button
            variant='contained'
            className={classes.create}
            endIcon={<KeyboardArrowDownIcon/>}
            aria-label="create more"
            aria-haspopup="true"
            onClick={handleCreateMenuOpen}
          >
            Create
          </Button>
          </div>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <LibraryMenu
        libraryAnchorEl={libraryAnchorEl}
        isLibraryMenuOpen={isLibraryMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <CreateMenu
        createAnchorEl={createAnchorEl}
        isCreateMenuOpen={isCreateMenuOpen}
        handleMenuClose={handleMenuClose}
        handleFoldersAddedFormOpen={handleFoldersAddedFormOpen}
      />
      <ProfileMenu
        profileAnchorEl={profileAnchorEl}
        isProfileMenuOpen={isProfileMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <FoldersAddedDialog
        open={foldersAddedFormOpen}
        handleClose={handleFoldersAddedFormClose}
      />
      <NavExpand
        isOpen={isNavExpanded}
        handleOpen={handleNavExpanded}
      />
    </div>
  );
}
