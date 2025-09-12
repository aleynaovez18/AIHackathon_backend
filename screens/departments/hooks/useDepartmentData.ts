import React from 'react';
import { getUserDepartments, getFacultyWelcomeMessage, Department } from '@/constants/faculty-system';
import { calculateCaseStats, getMockUserProgress, CaseStats } from '@/utils/case-calculator';
import { UserProgress } from '@/utils/progress-manager';

export const useDepartmentData = (userFaculty: string) => {
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [departmentStats, setDepartmentStats] = React.useState<Record<string, CaseStats>>({});
  const [welcomeData, setWelcomeData] = React.useState<any>(null);
  const [userProgress, setUserProgress] = React.useState<UserProgress>(getMockUserProgress());

  React.useEffect(() => {
    const facultyDepartments = getUserDepartments(userFaculty);
    const facultyWelcome = getFacultyWelcomeMessage(userFaculty);
    const progress = getMockUserProgress();
    
    // Calculate stats for each department
    const stats: Record<string, CaseStats> = {};
    facultyDepartments.forEach(dept => {
      stats[dept.id] = calculateCaseStats(dept, progress);
    });
    
    setDepartments(facultyDepartments);
    setDepartmentStats(stats);
    setWelcomeData(facultyWelcome);
    setUserProgress(progress);
  }, [userFaculty]);

  return {
    departments,
    departmentStats,
    welcomeData,
    userProgress
  };
};