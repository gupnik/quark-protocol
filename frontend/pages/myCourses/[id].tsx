import { Button } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Course } from '../../models/types';
import { SiteWrapper } from '../../components/SiteWrapper';
import { CoursePage } from '../../components/my-courses/coursePage/CoursePage';
import { GetServerSideProps } from 'next';

type Props = {
  course: Course;
};

export default function SingleCoursePage({ course }: Props) {
  return (
    <div>
      <Head>
        <title>{course.name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SiteWrapper>
        <CoursePage course={course} />
      </SiteWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const { req } = context;
  // const protocol = req.headers.referer.split(':')[0];
  // const host = req.headers.host;
  // const course = await fetch(`${protocol}://${host}/api/courses/${id}`);
  // const parsed = await course.json();

  const parsed = {
    id: '1',
    name: 'Course 1',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero non illum est fuga beatae ab, assumenda reiciendis nesciunt numquam similique!`,
    coverImg:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    teacherImg:
      'https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg',
    teacherName: 'Teacher 1'
  };

  return {
    props: {
      course: parsed,
      namespacesRequired: []
    }
  };
};
