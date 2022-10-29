import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CssBaseline } from '@mui/material';
import { NavBar } from './NavBar';
import { MainDrawer } from './MainDrawer';
import { SiteFooter } from './Footer';
import { useWindowSize } from '../hooks/useWindowResize';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setDesktopDrawerStatus } from '../redux/actions/interface/interfaceAction';
import { CSSProperties } from '@mui/styled-engine';

const drawerWidth = 240;

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  root: {
    display: 'flex'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  appBar: {
    backgroundColor: '#fafafa',
    color: '#000',
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth / 2 - 10}px)`
    }
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.between(0, 768)]: {
      marginRight: 'initial'
    }
  },
  hide: {
    display: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar as CSSProperties
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
    // [theme.breakpoints.between(0, 500)]: {
    //   padding: theme.spacing(1)
    // }
  }
}));

export const SiteWrapper: React.FC<{ children: any }> = ({ children }) => {
  const { classes } = useStyles();
  const desktopDrawerStatus = useSelector(
    (state: RootState) => state.interface.desktopLeftDrawerOpen
  );
  const dispatch = useDispatch();

  const setDesktopOpen = (value: boolean) => dispatch(setDesktopDrawerStatus(value));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [width] = useWindowSize();

  useEffect(() => {
    if (width < 768 && desktopDrawerStatus) {
      setDesktopOpen(false);
      return;
    }

    if (width > 768 && mobileOpen) {
      setMobileOpen(false);
    }
  }, [width]);

  const handleDrawerOpen = () => {
    if (width > 768) {
      setDesktopOpen(true);
      return;
    }
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    if (width > 768) {
      setDesktopOpen(false);
      return;
    }
    setMobileOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          classes={classes}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          open={desktopDrawerStatus}
        />
        <MainDrawer
          handleDrawerOpen={handleDrawerOpen}
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          open={desktopDrawerStatus}
        />
        <main className={classes.content} id='content'>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      <SiteFooter drawerOpened={desktopDrawerStatus} />
    </div>
  );
};
