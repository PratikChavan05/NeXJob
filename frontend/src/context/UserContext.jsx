import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [recruiter, setRecruiter] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthRecruiter, setIsAuthRecruiter] = useState(false);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const getErrorMessage = (error) => error.response?.data?.message || "Something went wrong";

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setJobSeeker(data.user);
      setIsAuth(true);
      setIsAuthRecruiter(false);
      setIsAuthAdmin(false);
      navigate("/alljobs");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function loginRecruiter(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/recruiter/login", { email, password });
      toast.success(data.message);
      setRecruiter(data.user);
      setIsAuth(false);
      setIsAuthRecruiter(true);
      setIsAuthAdmin(false);
      navigate("/myjobs");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function loginAdmin(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/admin/admin-login", { email, password });
      toast.success(data.message);
      setAdmin(data.admin);
      setIsAuth(false);
      setIsAuthRecruiter(false);
      setIsAuthAdmin(true);
      navigate("/admin");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", { name, email, password });
      toast.success(data.message);
      navigate(`/verify/${data.token}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function registerRecruiter(companyName, email, password, phone, website, industry, location, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/recruiter/register", { companyName, email, password, phone, website, industry, location });
      toast.success(data.message);
      navigate(`/verifyRecruiter/${data.token}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function verify(token, otp, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`/api/user/verify/${token}`, { otp });
      toast.success(data.message);
      setJobSeeker(data.user);
      setIsAuth(true);
      setIsAuthRecruiter(false);
      setIsAuthAdmin(false);
      navigate("/alljobs");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }


  
  async function verifyRecruiter (token, otp, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`/api/recruiter/verify/${token}`, { otp });
      toast.success(data.message);
      setRecruiter(data.user);
      setIsAuth(false);
      setIsAuthRecruiter(false);
      setIsAuthAdmin(false);
      navigate("/login-recruiter");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      if (data) {
        setJobSeeker(data);
        setIsAuth(true);
        setIsAuthRecruiter(false);
        setIsAuthAdmin(false);
      }
    } catch (error) {
      console.log("User fetch error:", error);
    }
  }

  async function fetchRecruiter() {
    try {
      const { data } = await axios.get("/api/recruiter/me");
      if (data) {
        setRecruiter(data);
        setIsAuth(false);
        setIsAuthRecruiter(true);
        setIsAuthAdmin(false);
      }
    } catch (error) {
      console.log("Recruiter fetch error:", error);
    }
  }

  async function fetchAdmin() {
    try {
      const { data } = await axios.get("/api/admin/meadmin");
      if (data) {
        setAdmin(data);
        setIsAuth(false);
        setIsAuthRecruiter(false);
        setIsAuthAdmin(true);
      }
    } catch (error) {
      console.log("Admin fetch error:", error);
    }
  }

  async function logout(navigate) {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logged out successfully!");
      setJobSeeker(null);
      setRecruiter(null);
      setAdmin(null);
      setIsAuth(false);
      setIsAuthRecruiter(false);
      setIsAuthAdmin(false);
      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userPromise = fetchUser();
      const recruiterPromise = fetchRecruiter();
      const adminPromise = fetchAdmin();

      const results = await Promise.allSettled([userPromise, recruiterPromise, adminPromise]);

      // Check which API succeeded first
      if (results[0].status === "fulfilled" && results[0].value) {
        setIsAuth(true);
        setIsAuthRecruiter(false);
        setIsAuthAdmin(false);
      } else if (results[1].status === "fulfilled" && results[1].value) {
        setIsAuth(false);
        setIsAuthRecruiter(true);
        setIsAuthAdmin(false);
      } else if (results[2].status === "fulfilled" && results[2].value) {
        setIsAuth(false);
        setIsAuthRecruiter(false);
        setIsAuthAdmin(true);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        loginRecruiter,
        loginAdmin,
        registerUser,
        registerRecruiter,
        logout,
        isAuth,
        setIsAuth,
        setIsAuthRecruiter,
        isAuthRecruiter,
        isAuthAdmin,
        jobSeeker,
        setJobSeeker,
        recruiter,
        admin,
        loading,
        btnLoading,
        verify,
        verifyRecruiter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
