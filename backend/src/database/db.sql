create database db_venta_de_productos;

\connect db_venta_de_productos


create table cliente(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    cedula integer not null unique,
    nombre text not null,
    apellido text not null
);


create table categoria(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nombre text not null
);

create table producto(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nombre text not null,
    id_categoria integer not null,
    precio integer not null
);

alter table producto add constraint id_categoria_fk_pro foreign key(id_categoria) references categoria(id);

create table venta(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nro_factura integer not null,
    fecha timestamp with time zone not null,
    total integer,
    id_cliente integer not null
);

alter table venta add constraint id_cliente_fk_cs foreign key(id_cliente) references cliente(id);

create table detalle_venta(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    id_venta integer not null,
    id_producto integer not null,
    cantidad integer not null,
    subtotal integer
);

alter table detalle_venta add constraint id_detalle_fk_pro foreign key(id_producto) references producto(id);
alter table detalle_venta add constraint id_detalle_fk_vn foreign key(id_venta) references venta(id);

-- 3) Modulo de ventas
-- Registro de ventas:
-- cabecera: identificador de la venta, numero de factura, fecha, total (auto calculable de acuerdo a los
-- detalles)
-- detalles: identificador del producto, cantidad

