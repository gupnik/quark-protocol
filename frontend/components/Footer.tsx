import React from 'react';
import { Link, Typography, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Mail, Home } from '@mui/icons-material';
import styles from '../styles/modules/Shared.module.scss';

const Copyright: React.FC<{ siteName: string }> = ({ siteName }) => {
  return (
    <Typography variant='body2'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        {siteName}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles<{ 'drawerOpened' : boolean }>()((theme, { drawerOpened }) => ({
  footer: {
    padding: theme.spacing(4, 3),
    marginTop: 'auto',
    backgroundColor: '#202020',
    color: '#fff'
  },
  wrapper: {
    '@media (min-width: 400px)': {
      marginLeft: 0
    },
    '@media (min-width: 600px)': {
      marginLeft: drawerOpened ? '25%' : '20%'
    },
    '@media (min-width: 1000px)': {
      marginLeft: drawerOpened ? '35%' : '15%'
    }
  }
}));

type Props = {
  drawerOpened: boolean;
};

export const SiteFooter: React.FC<Props> = ({ drawerOpened }) => {
  const { classes } = useStyles({ drawerOpened });

  return (
    <footer className={classes.footer}>
      <div className={`${styles.footerWrapper} ${classes.wrapper}`}>
        <div className={styles.footerAboutUs}>
          <div>About Us</div>
          <div className={styles.footerUsefulLinksEvenLink}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio odit numquam, omnis
            adipisci ex aperiam ipsum consectetur assumenda cupiditate debitis? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Optio, nemo.
          </div>
        </div>
        <div className={styles.footerUsefulLinks}>
          <div>Useful Links</div>
          <div className={styles.footerUsefulLinksContent}>
            <div>
              <Link color='inherit' href='https://material-ui.com/'>
                Link 1
              </Link>
              <div className={styles.footerUsefulLinksEvenLink}>
                <Link color='inherit' href='https://material-ui.com/'>
                  Link 2
                </Link>
              </div>
            </div>
            <div className={styles.footerUsefulLinksSecondCol}>
              <Link color='inherit' href='https://material-ui.com/'>
                Link 4
              </Link>
              <div className={styles.footerUsefulLinksEvenLink}>
                <Link color='inherit' href='https://material-ui.com/'>
                  Link 3
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>Contacts</div>
          <div className={styles.footerIconText}>
            <Home /> <span>Nikhil Gupta</span>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <Copyright siteName={'Quark Protocol'} />
        </div>
      </div>
    </footer>
  );
};
