import React, {useEffect, useState} from 'react';
import { Project } from './interfaces/project';
import './app.css';
import ProjectList from './components/ProjectList';
import ProjectHeader from './components/ProjectHeader';
import Loader from '@jetbrains/ring-ui-built/components/loader/loader';
import ErrorMessage from '@jetbrains/ring-ui-built/components/error-message/error-message';

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
      const resp = await host.fetchApp(`backend/projects/flag?name=${updatedProject.name}`, {
        method: 'PUT',
        body: { flag: updatedProject.flag },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return true;
    } catch (err) {
      setError(`Error while updating project: ${JSON.stringify(err)}`);
      return false;
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsFromYouTrack: Project[] = await host.fetchYouTrack("admin/projects?fields=id,name");
        for (const project of projectsFromYouTrack) {
          const projectFlag: {flag: boolean} = await host.fetchApp(`backend/project?name=${project.name}`, {method: 'GET'});
          project.flag = projectFlag.flag;
        }
        setProjects(projectsFromYouTrack);
      } catch (err) {
        setError(`Error while loading data: ${JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", height: "100vh",width: "100%" }}>
        <Loader style={{fontWeight: "bold"}} message="Loading projects..." />
      </div>
    );
  }

  if (error) {
    return (<div style={{height: '300px'}}>
        <ErrorMessage message="Error" description={error} />
      </div>
    );
  }

  return (
    <div className="projects-table" style={{ padding: "24px", display: "flex", flexDirection: "column", width: "70%", justifyContent: "center", margin: "auto" }}>
      <ProjectHeader />
      <ProjectList projects={projects} onToggleFlag={handleToggleFlag} loading={loading} />
    </div>
  );
};

export default AppComponent;