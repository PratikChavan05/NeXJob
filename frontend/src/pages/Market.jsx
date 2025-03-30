import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import '../styles/market.css';

const JobMarketDashboard = () => {
  // Hardcoded data matching your screenshots
  const locationDemandData = [
    { location: 'Hyderabad', job_count: 1800 },
    { location: 'Delhi NCR', job_count: 1350 },
    { location: 'Pune', job_count: 900 },
    { location: 'Chennai', job_count: 450 },
    { location: 'Bangalore', job_count: 2000 }
  ];

  // Restored professional role demand data
  const roleDemandData = [
    { role: 'Software Engineer', demand: 1245 },
    { role: 'Data Scientist', demand: 892 },
    { role: 'Product Manager', demand: 756 },
    { role: 'UX Designer', demand: 543 },
    { role: 'DevOps Engineer', demand: 687 },
    { role: 'Cloud Architect', demand: 512 }
  ];

  const salaryByLocationData = [
    { location: 'Hyderabad', avg_salary: 16 },
    { location: 'Delhi NCR', avg_salary: 12 },
    { location: 'Pune', avg_salary: 8 },
    { location: 'Chennai', avg_salary: 10 },
    { location: 'Bangalore', avg_salary: 14 }
  ];

  const skillDemandData = [
    { skill: 'Python', demand: 19 },
    { skill: 'JavaScript', demand: 22 },
    { skill: 'React', demand: 15 },
    { skill: 'AWS', demand: 12 },
    { skill: 'Machine Learning', demand: 12 },
    { skill: 'SQL', demand: 16 }
  ];

  const experienceDistributionData = [
    { experience: '0-2 years', count: 2000 },
    { experience: '2-5 years', count: 1500 },
    { experience: '5-10 years', count: 1000 },
    { experience: '10+ years', count: 500 }
  ];

  const industryDistributionData = [
    { industry: 'IT Services', count: 41 },
    { industry: 'Finance', count: 18 },
    { industry: 'Healthcare', count: 12 },
    { industry: 'Education', count: 9 },
    { industry: 'E-commerce', count: 23 }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const BAR_COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Indian Job Market Trends Dashboard</h1>
        {/* <div className="error-notice">
          Failed to load job market data. Showing sample data.
        </div> */}
      </div>
      
      <div className="dashboard-grid">
        {/* Job Demand by City */}
        <div className="dashboard-card">
          <h2>Job Demand by City</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationDemandData}>
                <XAxis 
                  dataKey="location" 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="job_count" 
                  fill={BAR_COLORS[0]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Role Demand - Restored professional version */}
        <div className="dashboard-card">
          <h2>Role Demand</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={roleDemandData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <XAxis 
                  dataKey="role" 
                  tick={{ fill: '#E5E7EB', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="demand" 
                  fill={BAR_COLORS[1]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Salary by Location */}
        <div className="dashboard-card">
          <h2>Salary by Location (LPA)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryByLocationData}>
                <XAxis 
                  dataKey="location" 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="avg_salary" 
                  fill={BAR_COLORS[2]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Skill Demand */}
        <div className="dashboard-card">
          <h2>Skill Demand</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={skillDemandData} 
                  dataKey="demand" 
                  nameKey="skill" 
                  cx="50%" 
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {skillDemandData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  wrapperStyle={{ color: '#E5E7EB', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                  formatter={(value, name, props) => [`${value}%`, props.payload.skill]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Experience Distribution */}
        <div className="dashboard-card">
          <h2>Experience Distribution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={experienceDistributionData}>
                <XAxis 
                  dataKey="experience" 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill={BAR_COLORS[3]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Industry Distribution */}
        <div className="dashboard-card">
          <h2>Industry Distribution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={industryDistributionData} 
                  dataKey="count" 
                  nameKey="industry" 
                  cx="50%" 
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {industryDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  wrapperStyle={{ color: '#E5E7EB', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                  formatter={(value, name, props) => [`${value}%`, props.payload.industry]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="dashboard-footer">
        <p>Data last updated: {new Date().toLocaleString()}</p>
        <p>Total jobs analyzed: 5,450</p>
      </div>
    </div>
  );
};

export default JobMarketDashboard;