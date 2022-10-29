import React from 'react';

type Props = {
  img?: string;
};

const styles = { height: 35, width: 35, background: '#bbb', borderRadius: '50%' };

export const UserAvatar: React.FC<Props> = ({ img }) => {
  if (img) {
    return <img style={styles} src={img} />;
  }

  return <span style={styles} />;
};
