/*
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
};*/
const entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.httpHandler = {
  endpoints: [
    {
      method: 'GET',
      path: 'project',
      handle: function handle(ctx) {
        try {
          const name = ctx.request.getParameter('name');
          const projectFlag = entities.Project.findByName(name).extensionProperties.flag;
          return ctx.response.json({flag: projectFlag});
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
          for (const project of projects) {
            if (project.id && project.name) {
              entities.Project.findByName(project.name).extensionProperties.flag = project.flag || false;
            }
          }
          return ctx.response.json({"success": "true"});
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
        const name = ctx.request.getParameter('name')
        const parsedBody = JSON.parse(ctx.request.body);
        const flag = parsedBody.flag;

        if (typeof flag !== 'boolean') {
          return ctx.response.json({error: 'Invalid flag value'});
        }

        const project = entities.Project.findByName(name);
        if (!project) {
          return ctx.response.json({error: 'Project not found'});
        }
        entities.Project.findByName(name).extensionProperties.flag = flag;
        return ctx.response.json({proj: project, flag: flag});
      } catch (error) {
        return ctx.response.json({error: error.message});
      }
    }
  }
  ]
};
