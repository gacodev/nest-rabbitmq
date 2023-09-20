# turbotraffic API

# coleccion de Postman para acceso HTTP

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/20082346-bc29e6b0-254a-43ee-bb21-a18ea354c0ba?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20082346-bc29e6b0-254a-43ee-bb21-a18ea354c0ba%26entityType%3Dcollection%26workspaceId%3D3fc380d8-cc70-4f32-8659-3199f494a889)

## conexion de dos microservicios usando mongoose 

para construir la aplicacion ejecute el siguiente comando estando en la ruta de la carpeta del proyecto.

```bash
docker-compose up
```

este comando ejecutara la creacion de los microservicio y los conectara mediante las rutas que estan establecidas en el docker-composer-yml apuntando a cada app

## informacion importante. puertos y configuraciones establecidas a nivel global

- microservicio 1 : producer opera en el puerto 3000 interno 3000 api o punto de entrada.
- microservicio 2 : consumer message pattern({cmd:'store'}) 
- microservicio 3 : mongodb opera en el puerto 27017 interno y 27017 externo 
- microservicio 4 : rabbitmq opera en los puertos - 5672:5672 y 15672:15672

## como acceder a los microservicios via http ##

para visualizar como se exponen se abre un navegador y se escribe en la barra de direcciones localhost:3000 esto se expone con el objetivo de poderlo visualizar desde el navegador, sin embargo no es necesario el navegador para validar los resultados tambien se puede crear una peticion de tipo get y/ post en postman

rutas 

- localhost/3000 mensaje de bienvenida
- localhost/view visualizar un template basico de html donde se ven los registros de la base de datos
- localhost/registries visualizar los registros en formato json


## recomendaciones ##

1. defina los encabezados como application/json
2. seleccione el checkbox raw
3. al final de la seccion seleccion en la lista desplegable la opcion json
2. en el body de la peticion debe enviar un objeto con la siguiente estructura
```bash
{
    data: "contenido del campo a almacenar"
}
```
 importante el campo debe ser un string pues tiene validaciones 

# comprobacion de los resultados 


## mediante un gestor de base de datos que puede descargarlo para su sistema operativo de preferencia

1. descargue el gestor de base de datos desde esta web https://www.mongodb.com/try/download/compass
2. instalelo en el computador donde esta ejecutando del docker-compose.yml
3. conectese por medio del puerto que se determinó (27017)
4. cree o permita a los microservicios crear la base datos para puedan almacenar la informacion

## recomendaciones rabbitmq

1. cada microservicio valida que exista una cola por lo que es imperativo que los dos coincidan al momento de conectarse por rabbit en caso de que los nombre de las colas(queue) no coincidan la aplicacion generar un error o permanecera en espera la peticion
2. es importante entender la codependencia de los dos microservicios a nivel de rabbit si se ejecuta un endpoint que este conectado a el servicio de mensajes(producer) y el microservicio que resuelve a nivel bakend la operacion no esta disponible (consumer) la aplicacion no respondera hasta que dicho servicio este activo y la peticion falla por tiempo de espera.
3. todas las conexiones se realizaron mediante el nombre del microservicio y por red interna como se indico








