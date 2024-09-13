module.exports = {
    apps: [
      {
        name: '@spotiloader/api',
        script: './apps/api/dist/main.js',
        instances: '1',
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
  }
  
