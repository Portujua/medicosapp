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

create table Medico (
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
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id),
	unique(cedula),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Telefono_Tipo (
	id varchar(36) not null,
	nombre varchar(128) not null,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Paciente (
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
	primary key(id),
	unique(cedula),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Telefono (
	id varchar(36) not null,
	tlf varchar(128) not null,
	tipo varchar(36) not null,
	dueno varchar(36),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id),
	foreign key (tipo) references Telefono_Tipo(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Log_Login (
	id varchar(36) not null,
	fecha datetime not null,
	username varchar(32) not null,
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
	medico varchar(36) not null references Medico(id),
	area varchar(36) not null references Area(id),
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Mensaje (
	id varchar(36) not null,
	paciente varchar(36) not null references Paciente(id),
	medico varchar(36) not null references Medico(id),
	html text not null,
	img longblob,
	hora datetime,
	owner varchar(128) not null comment 'el nombre de usuario del dueno',
	owner_name varchar(128) not null comment 'el nombre completo del dueno',
	leido tinyint(1) default 0,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Suscripcion (
	id varchar(36) not null,
	paciente varchar(36) not null references Paciente(id),
	tipo_suscripcion varchar(36) not null references Tipo_Suscripcion(id),
	empieza date not null,
	termina date not null,
	cant_cons_restantes int not null,
	createdAt datetime default current_timestamp,
	modifiedAt datetime on update current_timestamp,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;


create table Tipo_Suscripcion (
	id varchar(36) not null,
	nombre varchar(128) not null,
	costo float not null,
	descripcion varchar(128),
	num_dias int not null,
	cant_cons int not null,
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