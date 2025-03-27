import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { UserData } from "./context/UserContext";
import HomeSeeker from "./pages/HomeSeeker";
import JobseekerRegister from "./pages/JobseekerRegister";
import Verify from "./pages/Verify"
import JobSeekerLogin from "./pages/JobSeekerLogin";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import JobRecruiterRegister from "./pages/JobRecruiterRegister";
import JobRecruiterLogin from "./pages/JobRecruiterLogin";
import AdminLogin from "./pages/AdminLogin";
import VerifyRecruiter from "./pages/VerifyRecruiter";
import ForgotRecruiter from "./pages/ForgotRecruiter";
import ResetRecruiter from "./pages/resetRecruiter";
import HomeRecruiter from "./pages/HomeRecruiter";

const App = () => {
  const { loading, isAuth, user } = UserData(); 

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* {isAuth && <Navbar user={user} />} */}
          <Routes>
            <Route path="/homeseeker" element={<HomeSeeker />} />
            <Route path="/homerecruiter" element={<HomeRecruiter />} />
            <Route path="/register-seeker" element={<JobseekerRegister />} />
            <Route path="/register-recruiter" element={<JobRecruiterRegister />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path='/login-seeker' element={<JobSeekerLogin />} />
            <Route path='/login-recruiter' element={<JobRecruiterLogin />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/forgot-recruiter' element={<ForgotRecruiter />} />
            <Route path='/reset/:token' element={<Reset />} />
            <Route path='/resetRecruiter/:token' element={<ResetRecruiter />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin' element={<VerifyRecruiter />} />

          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
