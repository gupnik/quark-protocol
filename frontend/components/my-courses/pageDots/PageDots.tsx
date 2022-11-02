import React from 'react';
import styles from './PageDots.module.scss';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type Props = {
  amount: number;
  currentTab: number;
  onPageChange: (val: number) => void;
  showDots: boolean;
};

export const PageDots: React.FC<Props> = ({ amount, currentTab, onPageChange, showDots }) => {
  return (
    <div className={styles.pageDotsWrapper}>
      <IconButton onClick={() => onPageChange(currentTab - 1)} disabled={currentTab === 1}>
        <ArrowBack />
      </IconButton>
      {showDots &&
        [...Array(amount)].map((_, idx) => {
          return (
            <div
              onClick={() => onPageChange(idx + 1)}
              key={idx}
              className={`${styles.dot} ${currentTab === idx + 1 && styles.active}`}
            />
          );
        })}
      <IconButton onClick={() => onPageChange(currentTab + 1)} disabled={currentTab === amount}>
        <ArrowForward />
      </IconButton>
    </div>
  );
};
