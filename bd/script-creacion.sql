create table Lugar (
	id varchar(36) not null,
	nombre varchar(128),
	nombre_completo varchar(512),
	tipo varchar(64),
	lugar varchar(36),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Telefono_Tipo (
	id varchar(36) not null,
	nombre varchar(128) not null,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Usuario (
	id varchar(36) not null,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	tipo_cedula varchar(1),
	cedula varchar(32),
	email varchar(128),
	usuario varchar(32),
	contrasena varchar(32),
	fecha_nacimiento date,
	sexo varchar(10) not null,
	estado_civil varchar(32),
	estado tinyint(1) default 1,
	lugar varchar(36) not null,
	direccion varchar(256) not null,
	cambiar_contrasena tinyint(1) default 0,
	email_validado tinyint(1) default 0,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	es_medico tinyint(1) default 0,
	primary key(id),
	unique(cedula),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Telefono (
	id varchar(36) not null,
	tlf varchar(128) not null,
	tipo varchar(36) not null,
	usuario varchar(36) not null,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id),
	foreign key (tipo) references Telefono_Tipo(id),
	foreign key (usuario) references Usuario(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Log_Login (
	id varchar(36) not null,
	fecha datetime not null default current_timestamp,
	user varchar(32) not null references Usuario(id),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Area (
	id varchar(36) not null,
	nombre varchar(128) not null,
	estado tinyint(1) default 1,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Medico_Area (
	id varchar(36) not null,
	usuario varchar(36) not null references Usuario(id),
	area varchar(36) not null references Area(id),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Mensaje (
	id varchar(36) not null,
	html longblob not null,
	hora datetime,
	owner varchar(56) not null references Usuario(id),
	user varchar(56) not null references Usuario(id),
	area varchar(56) not null references Area(id),
	leido tinyint(1) default 0,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Suscripcion (
	id varchar(36) not null,
	usuario varchar(36) not null references Usuario(id),
	tipo_suscripcion varchar(36) not null references Tipo_Suscripcion(id),
	consultas_restantes int not null,
	status varchar(20) not null default 'PENDIENTE',
	costo_de_compra float not null,
	constraint allowed_statuses check (status in ('PENDIENTE', 'REVISION', 'RECHAZADO', 'APROBADO')),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


create table Tipo_Suscripcion (
	id varchar(36) not null,
	nombre varchar(128) not null,
	costo float not null,
	descripcion text,
	num_dias int,
	cant_cons int not null,
	icono varchar(128),
	estado tinyint(1) default 1,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Token (
	id varchar(36) not null,
	token varchar(128) not null,
	para varchar(128) default 'validar_email',
	extra varchar(256),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id), unique(token)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Session (
	token varchar(128) not null,
	createdAt datetime default current_timestamp
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;