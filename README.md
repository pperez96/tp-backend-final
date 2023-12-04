# tp-reserva-mesas
Un sistema para reservar mesas en restaurantes, implementado con Node.js y Angular 


## Backend 

- Ruta **/api/cliente** 
> POST / -> agregar cliente
```json
{
    "cedula": integer,
    "nombre": string,
    "apellido": string
}
``` 
> GET / -> lista todos los clientes

- Ruta **/api/restaurante**
> POST / -> agregar restaurante
```json
{
    "nombre": string,
    "direccion": string,
    "max_x": integer,
    "max_y": integer
}
``` 
> GET /  -> lista todos los restaurantes

> PUT /id  -> actualizar restaurante
```json
{
    "nombre": string,
    "direccion": string,
    "max_x": integer,
    "max_y": integer
}
``` 

> DELETE /id  -> eliminar restaurante

- Ruta **/api/mesa**
> POST /  -> agregar mesa
```json
{
    "nombre_mesa": string, 
    "pos_x": integer,
    "pos_y": integer, 
    "nro_piso": integer,
    "id_restaurante": integer,
    "capacidad": integer
}
``` 
> GET / -> lista todas las mesas

> PUT /id  -> actualizar mesa
```json
{
    "nombre_mesa": string, 
    "pos_x": integer,
    "pos_y": integer, 
    "nro_piso": integer,
    "capacidad": integer
}
``` 

> DELETE /id  -> eliminar mesa

- Ruta **/api/reserva** 
> POST / -> agregar reserva
```json
{
    "id_restaurante":1, 
    "id_mesa":2, 
    "fecha":"2021-05-16", 
    "rango_hora":"12 a 13", 
    "id_cliente": 1, 
    "cantidad_solicitada": 1
}
``` 
> GET /idRestaurante/fecha/clienteId(optional) -> lista todos las reservas

 
- Ruta **/api/categoria**
> POST / -> agregar categoria
```json
{
    "nombre": string
}
``` 
> GET /  -> lista todos las categorias

> PUT /id  -> actualizar categoria
```json
{
    "nombre": string
}
``` 

> DELETE /id  -> eliminar categoria

- Ruta **/api/producto**
> POST /  -> agregar producto
```json
{
    "nombre": string,  
    "precio": integer,
    "id_categoria": integer,
}
``` 
> GET / -> lista todas los productos

> PUT /id  -> actualizar producto
```json
{
    "nombre": string,  
    "precio": integer,
    "id_categoria": integer,
}
``` 

> DELETE /id  -> eliminar producto

- Ruta **/api/consumo**
> POST /  -> agregar consumo
```json
{
    "id": 3,
        "fecha_creacion": "2004-10-19T16:23:54.000Z",
        "fecha_cierre": null,
        "total": 30000,
        "is_open": true,
        "id_mesa": 2,
        "id_cliente": 1,
        "detalles": [
            {
                "id": 9,
                "subtotal": 5000,
                "cantidad": 1,
                "id_consumo": 3,
                "id_producto": 2
            },
            {
                "id": 10,
                "subtotal": 25000,
                "cantidad": 1,
                "id_consumo": 3,
                "id_producto": 3
            }
        ]
    }
``` 
> GET /mesa/:idMesa -> obtener consumo abierto o null por mesa

> GET /:idConsumo -> obtener consumo por id

> GET / -> obtener lista de consumo sin detalles

> PUT /idConsumo  -> actualizar producto
```json
{
    "id": 3,
        "fecha_creacion": "2004-10-19T16:23:54.000Z",
        "fecha_cierre": null,
        "total": 30000,
        "is_open": true,
        "id_mesa": 2,
        "id_cliente": 1,
        "detalles": [
            {
                "id": 9,
                "subtotal": 5000,
                "cantidad": 1,
                "id_consumo": 3,
                "id_producto": 2
            },
            {
                "id": 10,
                "subtotal": 25000,
                "cantidad": 1,
                "id_consumo": 3,
                "id_producto": 3
            }
        ]
        ,
        "eliminados":[idDetalle,idDetalle,id]
    }
``` 

> DELETE /cerrar/idConsumo  -> cerrar Consumo