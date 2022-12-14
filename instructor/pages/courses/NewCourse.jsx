import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { convertToHTML } from 'draft-convert';
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Button from "../../components/common/Button";
import { fetchCourse, getCurrentCourse, publishCourse, storeCourse, updateCourse } from '../../store/course/course.actions';
import { CourseContentIsValid } from '../../utils/helpers';
import CourseContent from './CourseContent';
import CourseInformation from "./CourseInformation";
import CourseMedia from './CourseMedia';
import CoursePublish from './CoursePublish';
import imgg from "../../assets/img/thumbnail-demo.jpg";
import { useQWallet } from '../../hooks/useQWallet';

function NewCourse({
    currentUser,
    course,
    currentCourseContent,
    // courseStatus,
    match}) {

      const { helloNEAR, isSignedIn } = useQWallet();

  const dispatch = useDispatch()
  const [hasNewCourse, setHasNewCourse] = useState(true)
  const [isEditCourse, setIsEditCourse] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newCourse, setNewCourse] = useState({title: "", hours: "", 
                                  image: imgg,
                                  description: "", topics: "",
                                  category_id: 3,level: "Beginner", sections: []})
  const [errors, setErrors] = useState({})
  const handlePublish = useCallback(
    (newCourse) => {
      console.log(isSignedIn);
      helloNEAR && isSignedIn && helloNEAR
            .createCourse(newCourse)
            .then((val) => {
              console.log(val);
              dispatch(publishCourse(newCourse))
            });
    },
    [helloNEAR, isSignedIn])

  const handleStep = () => {
    switch (currentStep) {
      case 1:
        return <CourseInformation 
          course={newCourse} handleChange={setNewCourse}
          errors={errors} />
      case 2:
        return <CourseContent course={newCourse} handleChange={setNewCourse} />
      case 3: 
        return <CourseMedia  course={newCourse} handleChange={setNewCourse}/>
      case 4: 
       return <CoursePublish  course={newCourse}/>
      default:
        <CourseInformation />
    }
  }

  const changeStep = () => {
    let err = {}
    if(newCourse.title === ''){
      err.title = "Entrez un titre"
    }

    if(newCourse.hours === ''){
      err.hours = "Entrez une duree"
    }

    if(newCourse.topics === ''){
      err.topics = "Entrez des topics"
    }
    setErrors(err)
    if(Object.getOwnPropertyNames(err).length === 0){
      if(currentStep == 1){
        
        if(hasNewCourse == true){
            let description = (convertToHTML(newCourse.description.getCurrentContent()));
            // dispatch(storeCourse(helloNEAR, newCourse,description,currentUser));
            setHasNewCourse(false)
          }else{
            // dispatch(updateCourse(newCourse,course.id))
          }
      }
      setCurrentStep(currentStep + 1)
    }

  }

  useEffect(() => {
    const { slug } = match.params
    if(slug){
      setHasNewCourse(false)
      setIsEditCourse(true)
      dispatch(fetchCourse(slug))
    }

    return () => {
      dispatch(getCurrentCourse([]))
    }
  }, [match, dispatch])

  useEffect(() => {
    if (isEditCourse){
      setNewCourse(course)
    }
  }, [course])

  return (
    <div className="wrap-content">
      <div className="container-fluid">
        <h6 className="page-title"> <AddCircleOutlineOutlinedIcon /> <span> {isEditCourse ? 'Modify Course' : 'New Course'} </span></h6>

        <div className="steps_container step-app mt-5" id="add-course-tab">
          <ul className="step-steps">
            <li className={"" + (currentStep > 1 ? "done" : '') +  " " + (currentStep == 1 ? "active" : '')}>
              <a href="#!">
                <span className="number"></span>
                <span className="step-name">Informations</span>
              </a>
            </li>
            <li className={"" + (currentStep > 2 ? "done" : '') +  " " + (currentStep == 2 ? "active" : '')}>
              <a href="#!">
                <span className="number"></span>
                <span className="step-name">Content</span>
              </a>
            </li>
            <li className={"" + (currentStep > 3 ? "done" : '') +  " " + (currentStep == 3 ? "active" : '')}>
              <a href="#!">
                <span className="number"></span>
                <span className="step-name">Media</span>
              </a>
            </li>
            <li className={" " + (currentStep == 4 ? "active" : '')}>
              <a href="#!">
                <span className="number"></span>
                <span className="step-name">Publish</span>
              </a>
            </li>
          </ul>
        <div className="form-step-content mt-5">
          {handleStep()}
        </div>    
        <div className="step-footer step-tab-pager">
          { currentStep > 1 ? <Button text="Prev" handleClick={() => setCurrentStep(currentStep - 1)} /> : null}
          
          {currentStep < 4 ? 
            <Button text="Next" handleClick={() => changeStep()} /> : 
            course.status === "Publish" ? null :  CourseContentIsValid(newCourse) ? <Button text="Publish" handleClick={ () => handlePublish(newCourse)} /> : null }            
        </div>   
        </div> 
      </div>
    </div>
  )
}

NewCourse.propTypes = {
  currentUser: PropTypes.number,
  currentCourseContent: PropTypes.array,
  course: PropTypes.object,
  match: PropTypes.object
}

const mapStateToProps = state => {
  return {
    currentUser: state.authentication.user.id,
    course: state.course.currentCourse,
    currentCourseContent: state.course.currentCourseContent
  }
}

export default connect(mapStateToProps)(NewCourse)
