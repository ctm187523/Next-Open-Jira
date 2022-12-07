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

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```



## Configurar las varaibles de entorno
Renombrar el archivo __.env.template__  a __.env__

## LLenar la base de datos con información de pruebas

Llamar a:
```
http://localhost:3000/api/seed con postman por ejemplo
```