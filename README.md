# Next.js OpenJira App
para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__ al acabar el proceso de correrlo la terminal queda libre

MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las varaibles de entorno
Renombrar el archivo __.env.template__  a __.env__