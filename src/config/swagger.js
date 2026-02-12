const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Backend Assignment API documentation",
    },
    servers: [
      { url: "/" } // later replace with hosted URL
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
 apis: ["./src/routes/*.js", "./src/controllers/*.js"]
 // reads swagger comments from routes
});

module.exports = swaggerSpec;
