SELECT * FROM clinica.medico;

CREATE TABLE  MEDICO (
  matricula INT ,
  nombre NCHAR(30) ,
  apellido VARCHAR(30) ,
  especialidad VARCHAR(20) ,
  observaciones TEXT(50) ,
  PRIMARY KEY (matricula)
  );



CREATE TABLE  PASIENTE (
  nnssBIGNT VARCHAR(20) NOT NULL,
  NOMBRE VARCHAR(30) NULL,
  DOMICILIO VARCHAR(50) NULL,
  CODIGO_POSTAL SMALLINT(6) NULL,
  TELEFONO VARCHAR(23) NULL,
  NUMERO_HISTORIAL_CLINICO INT(11) NULL,
  OBSERVACIONES TEXT(50) NULL,
  primary key (NUM_HISTORIAL_CLINICO),
  
  foreign key(NRO_HISTORIAL_PASIENTE_)REFERENCES PASIENTE (NRO_HISTORIAL_CLINICO),
  foreign key(MATRICULA_MEDICO)REFERENCES MATRICULA(MEDICO)
  );
 

CREATE TABLE  ingreso (
  ID_INGRESO INT (11),
  FECHA_INGRESO DATE ,
  NRO_HABITACION SMALLINT(6) ,
  NRO_CAMAS SMALLINT(6) ,
  OBSERVACIONES TEXT(50) ,
  ISTORIAL_PASIENTE INT(11) ,
  MATRICULA_MEDICO INT(11) ,
  medico_matricula INT ,
  PASIENTE_nnssBIGNT VARCHAR(20) ,
  PRIMARY KEY (ID_INGRESO)
  
  
  SELECT * FROM clinica.medico;

insert into medico values(122, "lucia","faseco","cardiologia",null);
insert into medico values(155, "alfedo","gutierres","medico familiar","no atiende pami",true);
insert into medico values(226, "frodo","bolson","pediatra","solamente turno tarde",true);
insert into medico values(332, "jesus maria","prates","medico familiar","sirujia",null);
insert into medico values(334, "gandalf","meridoc","infectologia",null);
insert into medico values(449, "ricardo","puchini","medico familiar","medico clinico general",true);
insert into medico values(645, "cacho","villa","oftalmologo",null);
insert into medico values(733, "tatiana","brandigamo","pediatra",null);
insert into medico values(774, "alfonso ","chamorro","cardiologia",null);
insert into medico values(888, "pedro pablo","sichanowqui","urologia","lisencia por covid19",true);
insert into medico values(155, "alfedo","gutierres","medico familiar","no atiende pami",true)

SELECT * FROM clinica.pasiente;
insert into PASIENTE 
values(32197, "Aewin","valinor1001","2366","3274-232336","675",null);
insert into PASIENTE values(971649, "Glorfrinder","terminal esquina avenida","3360","3755-447031","778","realizar PCR",TRUE);
insert into PASIENTE values(316619, "KAREN SOPHIA BURGIN","primeros colonos y junin","3640","3754998877","1236",null);
insert into PASIENTE values(3648, "Gimli","JUAN DE ORQUIDEAS 335","3363","3755-866545","1488",null);
insert into PASIENTE values(32197, "Legalos","krauser y villaviejas","3514","3971-544444","1498",null);
insert into PASIENTE values(254651, "Elrond","balneario campo grande","3350","3764-421479","1884",null);
insert into PASIENTE values(369844, "Galadriel","bareiri 170","2207","3943-425561","3212",null);
insert into PASIENTE values(44946, "Josefina","calle primera 201","3363","3755-587912","4112",null);
insert into PASIENTE values(654165, "Jose","arayanes 1205","3360","3755-589478","4551",null);

SELECT * FROM clinica.ingreso;
insert into ingreso values(1,"1/11/2021", "1","2",null,"1884","449",null);
insert into ingreso values(2, "2/11/2021","1","1",null,"1488","226",null);
insert into ingreso values(3, "2/11/2021","2","4","falta completar carnet de vacunacion","1498","226",null);
insert into ingreso values(4, "31/11/2021","1","2",null,"4551","774",true);
insert into ingreso values(5, "5/11/2021","5","9","1236","226",true);
insert into ingreso values(6, "15/11/2021","arayanes 1205","3360","3755-589478","4551",true);
insert into ingreso values(7, "17/11/2021","5","10","675","774",true);
insert into ingreso values(8, "15/11/2021","3","6","778","888",true);
insert into ingreso values(9, "17/11/2021","4","8","SOLISITAR ELECTRO CARDIO GRAMA","4112","332",true);
insert into ingreso values(10, "11/12/2021"," 2","3",NULL,"3212","774",TRUE);

