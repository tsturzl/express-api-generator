var config = {
  production: {
    mongodb: "mongodb://localhost/{{appName}}-prod",
    viewsPath: "/lib/viewsPath",
    logLevel: "info",
    port: 3000
  },
  staging: {
    mongodb: "mongodb://localhost/{{appName}}-stage",
    viewsPath: "/lib/viewsPath",
    logLevel: "debug",
    port: 3000
  },
  development: {
    mongodb: "mongodb://localhost/{{appName}}-dev",
    viewsPath: "/lib/viewsPath",
    logLevel: "trace",
    port: 3000
  },
  test: {
    mongodb: "mongodb://localhost/{{appName}}-test",
    viewsPath: "/lib/viewsPath",
    logLevel: "warn",
    port: 3000
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];