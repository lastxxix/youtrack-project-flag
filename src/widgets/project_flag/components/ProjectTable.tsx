import React from 'react';
import { Project } from '../interfaces/project';
type ProjectsTableProps = {
  projects: Project[];
  onToggleFlag: (project: Project) => void;
  loading: boolean;
};

const ProjectsTable = ({ projects, onToggleFlag, loading }: ProjectsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>
              <button
                type="button"
                onClick={() => onToggleFlag(project)}
                disabled={loading}
              >
                {project.flag ? 'On' : 'Off'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;