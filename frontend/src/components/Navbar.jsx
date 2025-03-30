import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LogOut } from "lucide-react";
import { UserData } from "../context/UserContext";


const Navbar = () => {
  const { setIsAuth, setUser, isAuth, isAuthRecruiter, setIsAuthRecruiter } = UserData();
  const navigate = useNavigate();

  console.log("Auth Status - Seeker:", isAuth, "Recruiter:", isAuthRecruiter);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      setUser([]);
      setIsAuth(false);
      setIsAuthRecruiter(false);
      navigate("/");
      window.location.href = "/";
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      toast.error(errorMessage);
    }
    
  };
  
  
  // If neither isAuth nor isAuthRecruiter is true, don't render anything
  if (!isAuth && !isAuthRecruiter) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/30 bg-blue-600 backdrop-blur supports-[backdrop-filter]:bg-blue-900">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center text-blue-400 font-bold">
              N
            </div>
          </div>
          <span className="text-xl font-bold text-white">NeXJob</span>
        </div>

        {/* Navigation Links Based on Auth State */}
        <nav className="hidden md:flex items-center gap-6 mr-6">
          {isAuth && (
            <>
              <Link to="/alljobs" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link to="/myapplication" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                My Applications
              </Link>
              <Link to="/recommend" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Recommended Jobs
              </Link>
              <Link to="/seeker" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Profile
              </Link>
              <Link to="/chatbot" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Pathway Generator
              </Link>
            </>
          )}
          {isAuthRecruiter && (
            <>
              <Link to="/myjobs" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                My Jobs
              </Link>
              <Link to="/post" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Post a Job
              </Link>
              <Link to="/allapplication" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Applicants
              </Link>
              <Link to="/meet" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                My Meets
              </Link>
            </>
          )}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logoutHandler}
          className="w-full lg:w-auto px-4 py-2 text-sm border border-blue-800 text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 rounded-md flex items-center transition-colors"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
