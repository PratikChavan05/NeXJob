import express from "express";
import { JobPost } from "../models/jobPostModel.js";
import { SeekerProfile } from "../models/seekerprofileModel.js";
import { User } from "../models/jobseekerModel.js";

const router = express.Router();

const calculateSkillMatch = (seekerSkills, jobSkills) => {
  const matchedSkills = seekerSkills.filter(skill => jobSkills.includes(skill));
  return (matchedSkills.length / jobSkills.length) * 100; 
};

router.get("/recommend/:seekerId", async (req, res) => {
    try {
      const user = await User.findById(req.params.seekerId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const seeker = await SeekerProfile.findOne({ email: user.email });
      if (!seeker) return res.status(404).json({ message: "Seeker profile not found" });
  
      const allJobs = await JobPost.find();
  
      // Skill matching logic
      const recommendedJobs = allJobs
        .map(job => ({
          job,
          matchPercentage: calculateSkillMatch(seeker.skills, job.skills),
        }))
        .filter(job => job.matchPercentage > 50) // Only jobs with 50%+ skill match
        .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by highest match
  
      res.json(recommendedJobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;
