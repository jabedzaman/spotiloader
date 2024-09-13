module.exports = {
    apps: [
      {
        name: '@spotiloader/api',
        script: './apps/api/main.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
  }
  
