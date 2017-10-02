insert into Telefono_Tipo (id, nombre) values 
	(uuid(), "Móvil"),
	(uuid(), "Casa"),
	(uuid(), "Trabajo"),
	(uuid(), "Fax"),
	(uuid(), "Otro");

insert into Usuario (id, nombre, apellido, usuario, contrasena, fecha_nacimiento, sexo, lugar, direccion, cedula, tipo_cedula, es_medico) values (uuid(), "Administrador", "", "root", "root", "1993-03-19", "Masculino", 377, "UD-4 Sector Mucuritas", "21115476", "V", 1);

insert into Tipo_Suscripcion (id, nombre, descripcion, costo, num_dias, cant_cons, icono) values
	(uuid(), "Basica", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa sunt et obcaecati natus magnam adipisci libero blanditiis veritatis repellendus? Dicta voluptates, exercitationem et deserunt quia esse ut quod sit quisquam.", 999, 30, 15, 'fa-heart-o'),
	(uuid(), "Pro", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa sunt et obcaecati natus magnam adipisci libero blanditiis veritatis repellendus? Dicta voluptates, exercitationem et deserunt quia esse ut quod sit quisquam.", 2999, 30, 25, 'fa-heart'),
	(uuid(), "Premium", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa sunt et obcaecati natus magnam adipisci libero blanditiis veritatis repellendus? Dicta voluptates, exercitationem et deserunt quia esse ut quod sit quisquam.", 5999, 30, 35, 'fa-heartbeat');