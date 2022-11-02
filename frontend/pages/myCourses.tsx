import Head from 'next/head';
import React from 'react';
import { SiteWrapper } from '../components/SiteWrapper';
import { MyCoursesContent } from '../components/my-courses/MyCoursesContent';
import styles from '../styles/modules/MyCourses.module.scss';

const MyCourses = () => {
  return (
    <div>
      <Head>
        <title>Explore</title>
        <link rel='icon' href='favicon.ico' />
      </Head>
      <SiteWrapper>
        <div className={styles.myCoursesWrapper}>
          <MyCoursesContent />
        </div>
      </SiteWrapper>
    </div>
  );
};

export default MyCourses;
