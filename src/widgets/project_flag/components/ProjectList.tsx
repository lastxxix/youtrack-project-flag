import React from 'react';
import { Project } from '../interfaces/project';
import Island from '@jetbrains/ring-ui-built/components/island/island';
import Text from '@jetbrains/ring-ui-built/components/text/text';
import ProjectItem from './ProjectItem';
type ProjectsTableProps = {
  projects: Project[];
  onToggleFlag: (project: Project) => void;
  loading: boolean;
};

const ProjectList = ({ projects, onToggleFlag, loading }: ProjectsTableProps) => {

  if (projects.length === 0){
    return (
      <Island style={{ padding: "24px", textAlign: "center" }}>
        <Text>No projects found.</Text>
      </Island>
    );
  }

  return (
    <Island>
      <div className="project-item" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            height: "30px",
            borderBottom: "1px solid #e0e0e0",
          }}>
            <div className="project-name" style={{display: "flex", flexDirection: "column"}}><div style={{fontWeight: "bold"}}>Project Name</div><div style={{fontWeight: "200", fontSize: "10px"}}>Project ID</div></div>
            <div style={{fontWeight: "bold"}}>Testing</div>
      </div>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          onToggleFlag={onToggleFlag}
        />
      ))}
    </Island>
      
  );
};

export default ProjectList;