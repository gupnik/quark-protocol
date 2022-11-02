import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Card, CardHeader, CardContent, Skeleton, Theme, createStyles } from '@mui/material';

const useStyles = makeStyles()((theme: Theme) =>
  ({
    card: {
      width: 400
    },
    media: {
      height: 190
    },
    [theme.breakpoints.between(0, 500)]: {
      card: {
        width: 300
      }
    }
  })
);

export const CardSkeleton: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Skeleton animation='wave' variant='circular' width={40} height={40} />}
        title={<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation='wave' height={10} width='40%' />}
      />
      <Skeleton animation='wave' variant='rectangular' className={classes.media} />
      <CardContent>
        <>
          <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={10} width='80%' />
        </>
      </CardContent>
    </Card>
  );
};
