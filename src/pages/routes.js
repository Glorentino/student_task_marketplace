import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './index';
import JobPost from './post-job-page-';
import JobPosted from './marketplace';
import SubmitJob from './submit-job-page';
import Navbar from './components';
import MyJobs from "./my-jobs";
import CompanyDisplay from './my-jobs-company';
import Profile from "./profile";
const Hero = () => {
    return (
        <section >

                <Router>
                < Navbar /> 
                    <Routes>
                        <Route  exact path='/' element={<Home/>} />
                        <Route path='/Profile' element={<Profile/>}></Route>
                        <Route  path='/MyJobs' element={<MyJobs/>} />
                        <Route  path='/JobPost' element={<JobPost/>}/>
                        <Route path='/SubmitJob' element={<SubmitJob/>}/>
                        <Route path='/JobPosted' element={<JobPosted/>}/>
                        <Route path='/CompanyJob' element={<CompanyDisplay/>}/>
                    </Routes>
                    </Router>

        </section>
    )
}
export default Hero;