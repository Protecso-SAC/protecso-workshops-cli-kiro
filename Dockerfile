# Misma imagen para instalar y ejecutar (ADR-0002). El proyecto no tiene
# dependencias externas: solo necesita Node y el ejecutor de pruebas integrado.
FROM node:24-slim

WORKDIR /app

CMD ["npm", "test"]
