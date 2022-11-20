import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as actions from "../store/courses/courses.actions"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { fetchCategories } from '../store/categories/categories.actions'
import { fetchAllCourses, fetchCoursesByCategories } from '../store/courses/courses.actions' 
import DOMPurify from 'dompurify';
// components 
import Button from '../components/Marketplace/Button';
import Tabs from '../components/Marketplace/Tabs/Tabs';
import FormTextArea from '../components/Marketplace/Form/FormTextArea';
import CourseBanner from '../components/Marketplace/Course/CourseBanner'
// images 
import bg_image from "../assets/img/counter_bg.jpg"
import cd_thumb from "../assets/img/cd_thumb.jpg"
import comment_01 from "../assets/img/comment_01.png"
import { fetchLastQuestions } from '../store/forum/forum.actions'
import { useQWallet } from '../hooks/useQWallet'
import { Link } from 'react-router-dom'


function Forum({questions,dispatch}) {
    const { helloNEAR, isSignedIn } = useQWallet();

    const [newQuestion, setNewQuestion] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    dispatch(fetchLastQuestions())
  }, [dispatch])

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // dispatch(addReview(newReview,currentTraining.id, currentTraining.course_id))
    isSignedIn && await helloNEAR.ask(newQuestion);

    setNewQuestion('')
  }

//   useEffect(() => {
//     dispatch(fetchCategories())
//     dispatch(fetchAllCourses())
//   }, [dispatch])

//   useEffect(() => {
//     if( search !== ''){
//       dispatch(actions.searchCourse(search))
//     }
//   }, [search])

  return (
    <ForumPage>
      <CourseBanner
      title="Forum"
      page="Forum" />
      <section className="course_details_area pt-5 pb-5">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="course_dtls_left mb-30 p-3 pb-4" style={{background: '#ffff'}}> 
                <div className="cd_content">
                    <h3 className="title">{"Forum"}</h3>
                    <div className="bottom">
                        <div className="left ul_li d-flex align-items-center">
                            <div className="">
                            {/* { <img src={cd_thumb} className="author" alt="" /> } */}
                            </div>
                        </div> 
                        
                    </div>
                </div>
              <div className="cdl_bottom"> 
              <div>
                <Tabs> 
                  <div label="Overview"> 
                    <div className="ov_text_wrap">
                      <p dangerouslySetInnerHTML={createMarkup("Use this space to collaborate with your peers!")}></p>
                    </div>
                  </div>
                  {/* <div label="Curriculum"> 
                    <div className="cc_wrap mt-20">
                      <ul className="accordion_box clearfix p-0">
                      </ul>
                    </div>
                  </div>   */}
                  <div label="Questions"> 
                  <div className="review_wrap">
                    <div className="post_comment">
                        <h3 className="comment_title">Questions</h3>
                        <ul className="comment_list mb-40 p-0">
                          {questions.map((review) => (
                            <li key={review.id}>
                              <div className="comment_author">
                                { review.user_avatar == null ?<img src={comment_01} alt="" /> : <img src={review.user_avatar} alt="" /> }                         
                              </div>
                              <div className="comment_content">
                                  <h6>{review.user_name} {review.user_firstname} </h6>
                                  <span className="date"><i className="fal fa-calendar-alt"></i>
                                      {review.created_at}</span>
                                  <div className="cd_review_wrap ul_li">
                                  </div>
                                  <p>{review.text}</p>
                                  {/* <span className="d-flex align-items-center justify-content-center" style={{flexDirection: 'column'}}> */}
                                    {/* <Link to={`/training/${review.id}`}>
                                        <Button 
                                        text="View"
                                        bgColorHover="#0073ff" />
                                    </Link> */}
                                    {/* <span className="mt-3 cancel-formation" onClick={() => dispatch(cancelCurrentTraining(currentTraining.id))}>NE PLUS SUIVRE</span> */}
                                    {/* </span> */}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <br/><br/>
                        <div>
                           <h3 className="comment_title">Add a question</h3>
                           <form onSubmit={handleSubmit}>
                            <FormTextArea
                              name="Ask"
                              value={newQuestion}
                              onChange={(e) => setNewQuestion(e.target.value)}
                              placeholder="Enter your question..."
                              />

                              <div className="d-flex justify-content-center">
                                <Button
                                  text="Ask"
                                  bgColorHover="#0073ff"
                                 />
                              </div>
                           </form>
                         </div>
                      </div>
                    </div>
                  </div> 
                </Tabs> 
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

    </ForumPage>
  )
}

const ForumPage = styled.div`
  padding-top: 110px;

  .course_page_banner{
    background-image: url(${bg_image});
  }
`;

Forum.propTypes = {
  questions: PropTypes.array,
  dispatch: PropTypes.func
}

const mapStateToProps =  state => {
  return {
    questions: state.forum.questions,
  }
}
export default connect(mapStateToProps)(Forum)
