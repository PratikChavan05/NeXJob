import React, { useState, useEffect } from "react";
import { fetchRecommendedJobs } from "../services/api";
import { UserData } from "../context/UserContext";
import { Briefcase, Star, Award, User, Building, Calendar, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Recom = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const recommendedJobs = await fetchRecommendedJobs(user._id);
        setJobs(recommendedJobs);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [user?._id]);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Briefcase className="text-indigo-400" size={28} />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
              NeX<span className="text-white">Job</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6 flex items-center gap-2">
            <Star className="text-indigo-400" size={20} />
            Recommended Jobs
          </h2>
          <p className="text-neutral-400 mt-1">Personalized opportunities based on your profile</p>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
            <p className="text-neutral-400">Loading recommended positions...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map(({ job, matchPercentage }) => (
              <div 
                key={job._id || job.id} 
                className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:border-indigo-800 transition-colors duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                        <Building size={18} className="text-indigo-400" />
                        {job.title}
                      </h3>
                      <div className="flex items-center text-neutral-400 text-sm mb-3">
                        <User size={14} className="mr-1 text-neutral-500" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star size={14} fill="white" />
                      <span>{matchPercentage.toFixed(2)}% Match</span>
                    </div>
                  </div>
                  
                  {job.skills && job.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2 text-neutral-300">
                        <Award size={16} className="text-indigo-400" />
                        <span className="font-medium">Skills:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                    <div className="flex items-center gap-1 text-neutral-400 text-sm">
                      <Calendar size={14} />
                      <span>Posted: {job.postedDate || "Recently"}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/jobpost/${job._id}`)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-900/20 mb-4">
              <Briefcase className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No matching jobs found</h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              We couldn't find any job recommendations for your profile. Try updating your skills or experience to get better matches.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recom;