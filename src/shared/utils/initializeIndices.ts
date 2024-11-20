import client from "./elasticsearchClient";

const initIndices = async () => {
  try {
    await client.indices.create({
      index: 'access_logs',
      body: {
        mappings: {
          properties: {
            actor: { type: 'keyword' },
            permissions: { type: 'text' },
            action: { type: 'text' },
            timestamp: { type: 'date' },
          },
        },
      },
    });

    await client.indices.create({
      index: 'error_logs',
      body: {
        mappings: {
          properties: {
            message: { type: 'text' },
            stack: { type: 'text' },
            path: { type: 'text' },
            method: { type: 'keyword' },
            timestamp: { type: 'date' },
          },
        },
      },
    });

    console.log('Indices creados correctamente');
  } catch (err: any) {
    if (err.meta.body.error.type === 'resource_already_exists_exception') {
      console.log('Los índices ya existen.');
    } else {
      console.error('Error al crear índices:', err);
    }
  }
};

initIndices();

//Ejecutar una vez: ts-node initializeIndices.ts

