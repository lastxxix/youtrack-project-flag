// Cache for projects
const projectCache = new Map();

exports.httpHandler = {
  endpoints: [
    {
      method: 'GET',
      path: 'projects',
      handle: function handle(ctx) {
        try {
          return ctx.response.json(Array.from(projectCache.values()));
        } catch (error) {
          return ctx.response.json({error: error.message});
        }
      }
    },
    {
      method: 'POST',
      path: 'projects',
      handle: function handle(ctx) {
        try {
          const projects = JSON.parse(ctx.request.body);
          const validProjects = [];
          for (const project of projects) {
            if (project.id && project.name) {
              projectCache.set(project.id, project);
              validProjects.push(project);
            }
          }
          return ctx.response.json(projects);
        } catch (error) {
          return ctx.response.json({error: error.message});
        }
      }
    },
    {
      method: 'PUT',
      path: 'projects/flag',
      handle: function handle(ctx) {
      try {
        const id = ctx.request.getParameter('id')
        const parsedBody = JSON.parse(ctx.request.body);
        const flag = parsedBody.flag;

        if (typeof flag !== 'boolean') {
          return ctx.response.json({error: 'Invalid flag value'});
        }
        
        const project = projectCache.get(id);
        if (!project) {
          return ctx.response.json({error: 'Project not found'});
        }
        
        project.flag = flag;
        projectCache.set(id, project);
        
        return ctx.response.json({proj: project, flag: flag});
      } catch (error) {
        return ctx.response.json({error: error.message});
      }
    }
  }
  ]
};