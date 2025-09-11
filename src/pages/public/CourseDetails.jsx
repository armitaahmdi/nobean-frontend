import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../../features/user/courses/coursesDetailsSlice';
import CourseIntroCard from '../../features/user/courses/components/CourseIntroCard';
import CourseDescription from '../../features/user/courses/components/CourseDescription';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';

export default function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.courseDetails);
  const { setPageTitle, clearPageTitle } = useBreadcrumb();

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [id, dispatch])

  // Set breadcrumb title when course is loaded
  useEffect(() => {
    if (course) {
      setPageTitle(course.title);
    }
    
    // Clean up when component unmounts
    return () => {
      clearPageTitle();
    };
  }, [course, setPageTitle, clearPageTitle]);

  console.log(course);


  return (
    <>

      <div>CourseDetails - {id} </div>
      {course ? (
        <div>
          <CourseIntroCard
            title={course.title}
            description={course.description}
            price={course.price}
            courseImage={course.image}
            videoSrc={course.video}
            time={course.time}
            session={course.session}
            participants={course.participants}
          />
          <CourseDescription course={course} />

        </div>
      ) : (
        <p>در حال بارگذاری...</p>
      )}
    </>
  )
}