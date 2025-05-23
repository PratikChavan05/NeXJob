import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { UserData } from "./context/UserContext";
import HomeSeeker from "./pages/HomeSeeker";
import JobseekerRegister from "./pages/JobseekerRegister";
import Verify from "./pages/Verify";
import JobseekerLogin from "./pages/JobseekerLogin";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import JobRecruiterRegister from "./pages/JobRecruiterRegister";
import JobRecruiterLogin from "./pages/JobRecruiterLogin";
import AdminLogin from "./pages/AdminLogin";
import VerifyRecruiter from "./pages/VerifyRecruiter";
import ForgotRecruiter from "./pages/ForgotRecruiter";
import ResetRecruiter from "./pages/ResetRecruiter";
import HomeRecruiter from "./pages/HomeRecruiter";
import JobPosting from "./pages/JobPosting";
import AllJobs from "./pages/AllJobs";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import JobPostDetailPage from "./pages/JobPostDetailPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage ";
import JobApplicationsPage from "./pages/JobApplicationsPage";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import Empty from "./components/Empty";
import LandingPage from "./pages/Home";
import JobseekerProfile from "./pages/JobseekerProfile";
import VerifyR from "./pages/VerifyR";
import JobApplicationDetailsPage from "./pages/JobApplicationDetailsPage";
import InterviewRoom from "./components/InterviewRoom";
import ScheduleInterview from "./components/RecruiterScheduleInterview.jsx";
import SeekerChatbot from "./components/SeekerChatbot.jsx";
import RecruiterInterviewDashboard from "./components/RecruiterScheduleInterview.jsx";

import Applicants from "./pages/Applicants";
import Recom from "./pages/Recommend.jsx";
import JobMarketDashboard from "./pages/Market.jsx";



const App = () => {
  const { loading, isAuth, isAuthRecruiter, isAuthAdmin } = UserData();
  console.log(isAuth, isAuthRecruiter, isAuthAdmin);

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      {/* Always Render Navbar, But Adjust Content Based on Auth */}
      <Navbar />

      <Routes>
        {/* Home Route Based on User Role */}
        <Route
          path="/"
          element={
            isAuthAdmin ? (
              <VerifyRecruiter />
            ) : isAuth ? (
              <AllJobs />
            ) : isAuthRecruiter ? (
              <MyJobs />
            ) : (
              <LandingPage />
            )
          }
        />

        {/* Authentication Routes */}
        <Route path="/register-seeker" element={isAuth || isAuthRecruiter ? <AllJobs /> : <JobseekerRegister />} />
        <Route path="/register-recruiter" element={isAuth || isAuthRecruiter ? <AllJobs /> : <JobRecruiterRegister />} />
        <Route path="/login-seeker" element={isAuth ? <AllJobs /> : <JobseekerLogin />} />
        <Route path="/login-recruiter" element={isAuthRecruiter ? <MyJobs /> : <JobRecruiterLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<VerifyRecruiter />} />

        {/* OTP & Verification */}
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/verifyRecruiter/:token" element={<VerifyR />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot-recruiter" element={<ForgotRecruiter />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/resetRecruiter/:token" element={<ResetRecruiter />} />

        {/* Job Seeker Routes */}
        <Route path="/alljobs" element={isAuth ? <AllJobs /> : <LandingPage />} />
        <Route path="/jobpost/:id" element={isAuth ? <JobPostDetailPage /> : <LandingPage />} />
        <Route path="/myapplication" element={isAuth ? <MyApplicationsPage /> : <LandingPage />} />
        <Route path="/seeker" element={isAuth ? <JobseekerProfile /> : <LandingPage />} />
        <Route path="/allapplication" element={isAuthRecruiter ? <JobApplicationsPage /> : <LandingPage />} />
        <Route path="/application/:id" element={isAuth ? <ApplicationDetailPage /> : <LandingPage />} />
        <Route path="/recommend" element={isAuth ? <Recom /> : <LandingPage />} />

        {/* Recruiter Routes */}
        <Route path="/post" element={isAuthRecruiter ? <JobPosting /> : <LandingPage />} />
        <Route path="/myjobs" element={isAuthRecruiter ? <MyJobs /> : <LandingPage />} />
        <Route path="/edit/:id" element={isAuthRecruiter ? <JobPosting /> : <LandingPage />} />
        <Route path="/allapplication/:id" element={isAuthRecruiter ? <JobApplicationDetailsPage /> : <LandingPage />} />
        <Route path="/applicants/:jobId" element={isAuthRecruiter ? <Applicants /> : <LandingPage />} />

        {/* Other Routes */}
        <Route path="/interview/:interviewId" element={<InterviewRoom />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />
        <Route path="/chatbot" element={<SeekerChatbot />} />
        <Route path="/meet" element={<RecruiterInterviewDashboard />} />
        <Route path="/homerecruiter" element={isAuthRecruiter?<HomeRecruiter />:<LandingPage/>} />
        <Route path="/market" element={isAuthRecruiter?<JobMarketDashboard />:<LandingPage/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
