import React, {useEffect, useState} from 'react';
import { Project } from './interfaces/project';
import '@jetbrains/ring-ui/components/loader/loader.css';
import './app.css';
import ProjectsTable from './components/ProjectTable';

// Debug utility to avoid direct console usage
/*
const debug = {
  enabled: true,
  log: (...args: any[]) => debug.enabled && window.console.log(...args),
  error: (...args: any[]) => debug.enabled && window.console.error(...args)
};
*/

const host = await YTApp.register();

const AppComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleToggleFlag = async (project: Project) => {
    try {
      // Changing flag state locally
      const updatedProject = { ...project, flag: !project.flag };
      
      // Updating the projects array with the new flag value
      setProjects(projects.map(p => 
        p.id === project.id ? updatedProject : p
      ));
      
      // Try to send the update to the backend
      const resp = await host.fetchApp(`backend/projects/flag?id=${updatedProject.id}`, {
        method: 'PUT',
        body: { flag: updatedProject.flag },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      //debug.log("PUT response:", resp);
      
      return true;
    } catch (err) {
      setError(`Error while updating project: ${JSON.stringify(err)}`);
      return false;
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        //debug.log("Starting fetchProjects");
        let existingProjects: Project[] = [];
        try {

          //debug.log("About to fetch backend projects");
          const backendResponse = await host.fetchApp('backend/projects', {method: "GET"});
          //debug.log("Backend response:", backendResponse);
          // Make sure we got a valid array back
          existingProjects = Array.isArray(backendResponse) ? backendResponse : [];
          //debug.log("Existing projects:", existingProjects);
        } catch (backendError) {
          setError(`Error fetching backend projects: ${JSON.stringify(backendError)}`);
        }

        // Create a map of existing projects by ID for easy lookup
        const existingProjectsMap = existingProjects.reduce((map, project) => {
          map[project.id] = project;
          return map;
        }, {} as Record<string, Project>);

        // Fetch all current projects from YouTrack
        //debug.log("About to fetch YouTrack projects");
        const projectsFromYouTrack: Project[] = await host.fetchYouTrack("admin/projects?fields=id,name");
        //debug.log("YouTrack projects:", projectsFromYouTrack);
        
        // Merge projects - use existing flags for known projects, set false for new ones
        const mergedProjects = projectsFromYouTrack.map(ytProject => {
          if (existingProjectsMap[ytProject.id]) {
            // Use existing project data (including flag state)
            return existingProjectsMap[ytProject.id];
          } else {
            // New project, initialize with flag set to false
            return {
              ...ytProject,
              flag: false
            };
          }
        });
        
        //debug.log("Sending projects to backend:", mergedProjects);

        const resp = await host.fetchApp('backend/projects', {
          method: 'POST',
          body: mergedProjects,
        });
        //debug.log("Post response:", resp);
        /* Testing if the projects have been saved correctly
        const test = await host.fetchApp('backend/projects', {method: "GET"});
        debug.log("Merged projects saved:", test);
        */
        setProjects(mergedProjects);
      } catch (err) {
        setError(`Error while loading data: ${JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);


  return (
    <div className="projects-table">
      <h2>Available Projects</h2>
      {loading && <div className="ring-loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <ProjectsTable
        projects={projects}
        onToggleFlag={handleToggleFlag}
        loading={loading}
      />
    </div>
  );
};

export default AppComponent;