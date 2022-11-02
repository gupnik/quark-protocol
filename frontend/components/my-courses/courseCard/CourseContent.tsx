import React from 'react';
import { CourseLesson } from '../courseLesson/CourseLesson';

export const CourseContent: React.FC = () => {
  return (
    <div>
      <CourseLesson
        name={'Name'}
        description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero non illum est fuga beatae ab, assumenda reiciendis nesciunt numquam similique!Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero non illum est fuga beatae ab, assumenda reiciendis nesciunt numquam similique!`}
        date={new Date()}
      />
      <CourseLesson
        name={'Name'}
        description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero non illum est fuga beatae ab, assumenda reiciendis nesciunt numquam similique!Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero non illum est fuga beatae ab, assumenda reiciendis nesciunt numquam similique!`}
        date={new Date()}
      />
    </div>
  );
};
