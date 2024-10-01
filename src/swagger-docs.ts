import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {version} from '../package.json';

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'LeapLearn API Documentation',
        version: version,
        description: 'Documentation for my LeapLearn Software.',

      },
      
      
    },
    apis: ['./app.ts', 'src/auth/auth.routes.ts','src/course/course.routes.ts'], // This is the file where you wrote your API routes
  };

  const specs = swaggerJsdoc(options);


  export default specs;