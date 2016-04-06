var config = {
  production: {
    mongodb: "mongodb://localhost/{{appName}}-prod",
    views: "/lib/views",
    logLevel: "info",
    port: 3000
  },
  staging: {
    mongodb: "mongodb://localhost/{{appName}}-stage",
    views: "/lib/views",
    logLevel: "debug",
    port: 3000
  },
  development: {
    mongodb: "mongodb://localhost/{{appName}}-dev",
    views: "/lib/views",
    logLevel: "trace",
    port: 3000
  },
  test: {
    mongodb: "mongodb://localhost/{{appName}}-test",
    views: "/lib/views",
    logLevel: "warn",
    port: 3000
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];