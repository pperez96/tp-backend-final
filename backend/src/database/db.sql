create database db_venta_de_productos;

\connect db_venta_de_productos

create table restaurante(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nombre text not null,
    direccion text not null,
    max_X integer not null,
    max_Y integer not null
);

create table mesa(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nombre_mesa text not null,
    id_restaurante integer not null,
    pos_x integer not null,
    pos_y integer not null,
    nro_piso integer not null,
    capacidad integer not null,
    CONSTRAINT posicion_unica UNIQUE (pos_x, pos_y, nro_piso)
);


alter table mesa add constraint id_restaurante_fk_me foreign key(id_restaurante) references restaurante(id);

create table cliente(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    cedula integer not null unique,
    nombre text not null,
    apellido text not null
);

create table reserva(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    id_restaurante integer not null,
    id_mesa integer not null,
    fecha date not null,
    rango_hora text not null,
    id_cliente integer not null,
    cantidad_solicitada integer not null
);

alter table reserva add constraint id_restaurante_fk_res foreign key(id_restaurante) references restaurante(id);
alter table reserva add constraint id_mesa_fk foreign key(id_mesa) references mesa(id);
alter table reserva add constraint id_cliente_fk foreign key(id_cliente) references cliente(id);

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
    subtotal integer not null
);

alter table detalle_venta add constraint id_detalle_fk_pro foreign key(id_producto) references producto(id);
alter table detalle_venta add constraint id_detalle_fk_vn foreign key(id_venta) references venta(id);

-- 3) Modulo de ventas
-- Registro de ventas:
-- cabecera: identificador de la venta, numero de factura, fecha, total (auto calculable de acuerdo a los
-- detalles)
-- detalles: identificador del producto, cantidad

create table consumo(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    id_mesa integer not null,
    id_cliente integer not null,
    total integer not null,
    is_open boolean not null,
    fecha_creacion timestamp with time zone not null,
    fecha_cierre timestamp with time zone
);

alter table consumo add constraint id_mesa_fk_cs foreign key(id_mesa) references mesa(id);
alter table consumo add constraint id_cliente_fk_cs foreign key(id_cliente) references cliente(id);

create table detalle_consumo(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    id_consumo integer not null,
    id_producto integer not null,
    cantidad integer not null,
    subtotal integer not null
);

alter table detalle_consumo add constraint id_detalle_fk_pro foreign key(id_producto) references producto(id);
alter table detalle_consumo add constraint id_detalle_fk_cs foreign key(id_consumo) references consumo(id);
