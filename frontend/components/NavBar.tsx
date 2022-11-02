import React, { useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Divider, Badge } from '@mui/material';
import { Menu, Notifications, ChevronLeft } from '@mui/icons-material';
import clsx from 'clsx';
import styles from '../styles/modules/Shared.module.scss';
import { UserAvatar } from './UserAvatar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { useRouter } from 'next/router';

type Props = {
  classes: { [key: string]: string };
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  open: boolean;
};

export const NavBar: React.FC<Props> = ({ classes, handleDrawerOpen, open, handleDrawerClose }) => {
  const [activeTab, setActiveTab] = useState<string | undefined>();
  const [barShadow, setBarShadow] = useState('none');
  const locale = useSelector((state: RootState) => state.preference.locale);
  const router = useRouter();

  const onPageScroll = () => {
    setBarShadow(window.pageYOffset === 0 ? 'none' : '0px 0px 11px 0px rgba(0,0,0,0.75)');
  };

  useEffect(() => {
    document.addEventListener('scroll', onPageScroll);
    const href = global.window.location.pathname.replaceAll('/', '');
    if (href.includes('myCourses')) {
      setActiveTab('My Courses');
      return;
    }
    // setActiveTab(t(`common:headerTabs.${href}`));

    return () => {
      document.removeEventListener('scroll', onPageScroll);
    };
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (global.window) {
      const href = global.window.location.pathname.replaceAll('/', '');
      if (href.includes('myCourses')) {
        // setActiveTab(t(`common:headerTabs.myCourses`));
        return;
      }
      // setTimeout(() => setActiveTab(t(`common:headerTabs.${href}`)), 100);
    }
  }, [locale]);
  
  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
      style={{ boxShadow: barShadow }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}
        >
          <Menu />
        </IconButton>

        <IconButton
          color='inherit'
          aria-label='close drawer'
          onClick={handleDrawerClose}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: !open
          })}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant='h6' noWrap>
          {activeTab}
        </Typography>
        <div className={styles.navBarRightIconsContainer}>
          <IconButton>
            <Badge badgeContent={4} color='primary'>
              <Notifications color={'primary'} />
            </Badge>
          </IconButton>
          <IconButton onClick={() => router.push('/account')}>
            <UserAvatar />
          </IconButton>
        </div>
      </Toolbar>
      <div className={styles.navBarDividerContainer}>
        <Divider light />
      </div>
    </AppBar>
  );
};
