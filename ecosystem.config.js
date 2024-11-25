module.exports = {
    apps: [
      {
        name: "YAGANI",           
        script: "./src/app.ts",         
        interpreter: "./node_modules/.bin/ts-node",
        watch: true,                // Modiva el modo de observación de cambios en el código
        instances: 4,          // Número de instancias (máximas posibles según los núcleos disponibles)
        exec_mode: "cluster",       // Modo cluster para balancear carga
        max_restarts: 10,
        restart_delay: 5000,
        env: {
          NODE_ENV: "development",        // Variables de entorno para desarrollo
          PORT: 3000,
        }
      },
    ],
  };
  