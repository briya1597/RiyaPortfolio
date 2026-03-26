import projectsData from '../data/projects.json';

export const useGithubProjects = () => {
  return { 
    projects: projectsData, 
    loading: false, 
    error: null 
  };
};
