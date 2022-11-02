import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';
import { menuItems } from './utils/menuItems';
import styles from '../styles/modules/Shared.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSProperties } from '@mui/styled-engine';

const drawerWidth = 240;

const useStyles = makeStyles()((theme) => ({
  drawer: {
    width: drawerWidth
  },
  drawerOpen: {
    boxShadow: '2.8px 2.8px 16px 0 rgba(0, 0, 0, 0.5)',
    background: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    boxShadow: '2.8px 2.8px 16px 0 rgba(0, 0, 0, 0.5)',
    background: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: 110
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar as CSSProperties
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main
  },
  paperAnchorDockedLeft: {
    borderRight: 'none'
  }
}));

type Props = {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  open: boolean;
  mobileOpen: boolean;
};

export const MainDrawer: React.FC<Props> = ({
  handleDrawerClose,
  open,
  mobileOpen,
  handleDrawerOpen
}) => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    /* istanbul ignore next */
    if (window) {
      setActiveTab(window.location.href);
    }
  }, []);

  if (!activeTab) {
    return <div />;
  }

  const onLogoClick = () => router.push('/home');

  const drawerContent = () => {
    return (
      <>
        <div className={classes.toolbar}>
          <IconButton onClick={onLogoClick}>
            <img src='/images/register-logo-148.png' height={72} width={72} />
          </IconButton>
        </div>
        <List className={styles.mainMenuListContainer}>
          {menuItems.map((item) => {
            const isActiveTab = activeTab.includes(item.link);
            return (
              <div
                className={`${styles.mainMenuColor} ${isActiveTab && styles.mainMenuActive} ${
                  item.className
                }`}
                key={item.label}
              >
                <Link href={item.link}>
                  <ListItem button>
                    <ListItemIcon className={styles.mainMenuIconContainer}>
                      <item.icon
                        className={`${
                          isActiveTab ? styles.mainMenuActiveIcon : styles.mainMenuIcon
                        }`}
                      />
                    </ListItemIcon>
                    {(open || mobileOpen) && (
                      <ListItemText
                        className={isActiveTab ? styles.mainMenuActiveText : ''}
                        primary={item.label}
                      />
                    )}
                  </ListItem>
                </Link>
              </div>
            );
          })}
        </List>
      </>
    );
  };

  return (
    <>
      <SwipeableDrawer
        onOpen={handleDrawerOpen}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorDockedLeft: classes.paperAnchorDockedLeft
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawerContent()}
      </SwipeableDrawer>
      {/* <Hidden xsDown implementation='css'> */}
        <SwipeableDrawer
          sx={{ display: { xs: 'none', sm: 'block' } }}
          // onMouseLeave={handleDrawerClose}
          // onMouseEnter={handleDrawerOpen}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          classes={{
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          variant='permanent'
          open={open}
        >
          {drawerContent()}
        </SwipeableDrawer>
      {/* </Hidden> */}
    </>
  );
};
