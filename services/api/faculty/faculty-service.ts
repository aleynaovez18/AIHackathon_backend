/**
 * Faculty Service
 * Handles faculty and department related operations
 */

import { httpClient } from '../client/http-client';
import { API_CONFIG } from '../config/api-config';
import { Department, FacultyInfo } from '../types/api-types';

class FacultyService {
  /**
   * Get all departments
   */
  async getDepartments(): Promise<Department[]> {
    const response = await httpClient.get<Department[]>(
      API_CONFIG.ENDPOINTS.FACULTY.DEPARTMENTS
    );
    return response.data;
  }

  /**
   * Get departments by faculty
   */
  async getDepartmentsByFaculty(faculty: string): Promise<Department[]> {
    const response = await httpClient.get<Department[]>(
      API_CONFIG.ENDPOINTS.FACULTY.DEPARTMENTS,
      { params: { faculty } }
    );
    return response.data;
  }

  /**
   * Get department by ID
   */
  async getDepartmentById(departmentId: string): Promise<Department> {
    const response = await httpClient.get<Department>(
      `${API_CONFIG.ENDPOINTS.FACULTY.DEPARTMENTS}/${departmentId}`
    );
    return response.data;
  }

  /**
   * Get faculty information
   */
  async getFacultyInfo(faculty: string): Promise<FacultyInfo> {
    const response = await httpClient.get<FacultyInfo>(
      API_CONFIG.ENDPOINTS.FACULTY.FACULTY_INFO,
      { params: { faculty } }
    );
    return response.data;
  }

  /**
   * Get all available faculties
   */
  async getFaculties(): Promise<{ id: string; name: string; description: string }[]> {
    const response = await httpClient.get<{ id: string; name: string; description: string }[]>(
      `${API_CONFIG.ENDPOINTS.FACULTY.FACULTY_INFO}/list`
    );
    return response.data;
  }
}

// Singleton instance
export const facultyService = new FacultyService();