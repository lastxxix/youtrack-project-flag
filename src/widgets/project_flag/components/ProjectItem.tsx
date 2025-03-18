import { Project } from '../interfaces/project';
import Toggle from "@jetbrains/ring-ui-built/components/toggle/toggle";
const ProjectItem = ({ project, onToggleFlag }: { project: Project; onToggleFlag: (project: Project) => void }) => {
    return (
        
        <div key={project.id} className="project-item" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            height: "30px",
          }}>
            <div className="project-name" style={{display: "flex", flexDirection: "column"}}><div style={{fontWeight: "bold"}}>{project.name}</div><div style={{fontWeight: "200", fontSize: "10px"}}>{project.id}</div></div>
            <Toggle checked={project.flag} onChange={() => onToggleFlag(project)} />
        </div>
    );
}

export default ProjectItem;