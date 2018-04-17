Dise¤o de archivos para Sistema Toma de Pedido TECNOAP								
						 		
todos los archivos son planos, posicionales y con campos de longitud fija.								
								
ARCHIVO	REG.	CAMPO	TIPO	Long 	Dec.	DESCRIPCION	MODIFICA	
								
 								
RUBRO	64	numrub	Num	2	0	c¢digo de rubro	01/03/2016	
		nomrub	Alf	35		nombre de rubro	01/03/2016	
		aplicaD	Alf	1		"aplica dto exclusividad y/o vidriera    ""S"" = SI"	01/03/2016	
		libre	Alf	25		libre	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
SUBRUBRO	96	numru1	Num	2	0	c¢digo de rubro	01/03/2016	
		numsu1	Num	3	0	c¢digo de subrubro	01/03/2016	
		nomsub	Alf	50		nombre del subrubro	01/03/2016	 
		tipopro	Num	2	0	Tipo de producto             	01/03/2016	
		destipo	Alf	15	 	Descripci¢n de tipo        	01/03/2016	
		libre	Alf	23		libre	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
ARTICULO	256	numart	Num	5	0	c¢digo de art¡culo	01/03/2016	
		desart	Alf	60		descripci¢n  	01/03/2016	
		rubro	Num	2	0	rubro	01/03/2016	
		subrub  	Num	3	0	subrubro	01/03/2016	
		unimed	Alf	8		unidad de medida	01/03/2016	
		medped	Num	1	0	indicador de validacion medida   0:NO    1:ancho   2:ancho y alto   3:alto	01/03/2016	
		estvta	Num	1	0	indicador de estado de articulo   0:DISP    1:VTA.DISC    2:VTA.INT	01/03/2016	
		stkdsp	Num	7	2	stock disponible	01/03/2016	
		precDI	Num	9	2	precio a distribuidor	01/03/2016	
		precPA	Num	9	2	precio a particulares	01/03/2016	
		precCO	Num	9	2	precio costo rielamericano	01/03/2016	
		soldab	Alf	1		indicador tela se puede soldar , S:si	01/03/2016	
		invert	Alf	1		indicador tela se puede invertir , S:si	01/03/2016	
		camdib	Alf	1		indicador cambia dibujo al invertir, S:si	01/03/2016	
		medida	Num	3	2	medida para longilineos	01/03/2016	
	 	tiposman	Alf	15		tipo de mandos posibles 15 letras posibles	01/03/2016	
	 	altmanSS	Num	4	2	alto normal mando sin sistema	01/03/2016	
	 	hasta1	Num	4	2	excepci¢n1 - hasta xx alto	01/03/2016	
		opera1	Alf	1		excepci¢n1 - realizar operacion R:resta F:fijo	01/03/2016	
		canti1	Num	4	2	excepci¢n1 - valor para operaci¢n	01/03/2016	
		hasta2	Num	4	2	excepci¢n2 - hasta xx alto	01/03/2016	
		opera2	Alf	1		excepci¢n2 - realizar operacion R:resta F:fijo	01/03/2016	
		canti2	Num	4	2	excepci¢n2 - valor para operaci¢n	01/03/2016	
		hasta3	Num	4	2	excepci¢n3 - hasta xx alto	01/03/2016	
		opera3	Alf	1		excepci¢n3 - realizar operacion R:resta F:fijo	01/03/2016	
		canti3	Num	4	2	excepci¢n3 - valor para operaci¢n	01/03/2016	
		hasta4	Num	4	2	excepci¢n4 - hasta xx alto	01/03/2016	
		opera4	Alf	1		excepci¢n4 - realizar operacion R:resta F:fijo	01/03/2016	
		canti4	Num	4	2	excepci¢n4 - valor para operaci¢n	01/03/2016	
		pedirzoc	Alf	1		"N: no pedir zocalos lisos, en descripcion tiene la palabra ""liso"" "	01/03/2016	
		nivel	Alf	2		Nivel para tipo de producto y organizar Cascada	07/04/2016	
		destipo	Alf	15	 	Descripci¢n de tipo        	07/04/2016	
		metmin	Alf	1		"""S"" indica se Debe Aplicar c lculo facturaci¢n con Metro M¡nimo "	07/04/2016	
		libre	Alf	53		libre	07/04/2016	
		KY1	Num	5	0	uso interno RA	18/03/2016	
		KY2 	Num	3	0	uso interno RA	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
CLIENTES	256	numcli	Num	6	0	n£mero de cliente o vendedor	01/03/2016	
		nomcli	Alf	25		nombre	01/03/2016	
		fantasia	Alf	25		nombre de comercio o fantasia	01/03/2016	
		domcli	Alf	25		domicilio	01/03/2016	
		loccli	Alf	25		localidad	01/03/2016	
		provcli	Alf	25		provincia	01/03/2016	
		codpos	Num	4	0	c¢digo postal	01/03/2016	
		telcli	Alf	20		telefono	01/03/2016	
		mailcli	Alf	50		direcci¢n de mail	01/03/2016	
		codven	Num	2	0	codigo de vendedor	01/03/2016	
		tipousr	Alf	1		Tipo usuario,  A:arquitectos   V:vendedores a distribuidor   D:distribuidor	01/03/2016	
		listaP	Alf	1		que lista de precio utiliza,  D:distribuidor  P:particular	01/03/2016	
		dtoexc	Num	4	2	porcentaje de descuento por Exclusividad	01/03/2016	
		dtovid	Num	4	2	porcentaje de descuento por Vidriera	01/03/2016	
		convta	Num	2	0	condicion de venta	01/03/2016	
		vtaint	Num	1	0	codigo de venta interrumpida,  0:habilitado 1:No Operar 	01/03/2016	
 		tipres	Num	1	0	Tipo de responsable iva, 1:RI  2:ex ley 19640  3:CF  5:EX  7:MT	01/03/2016	
		numcuit	Num	11	0	numero de cuit	01/03/2016	
		tasaIB	Num	4	2	tasa para calculo de ingresos brutos	01/03/2016	
		libre	Alf	19		libre	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
				 				
BONIFICA	32	cliente	Num	6	0	n£mero de cliente	01/03/2016	
		tipbon	Alf	1		Tipo de bonificacion R:x rubro  A:x especial x art¡culo	01/03/2016	
		c¢digo	Num	5	0	n£mero correspondiente a Rubro o Art¡culo seg£n corresponda	01/03/2016	
		porbon	Num	2	0	porcentaje de bonificaci¢n en nuestro sistema 99 indica 100% bonificado	01/03/2016	
		libre	Alf	17		libre	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
								
CONSISTENCIA	64	arti1	Num	5	0	c¢digo art¡culo a validar	01/03/2016	
  	 	arti2	Num	5	0	c¢digo art¡culo para combinar	01/03/2016	
		supmx	Num	4	2	superficie m xima	01/03/2016	
		ancmn	Num	4	2	ancho m¡nimo	01/03/2016	
		altmn	Num	4	2	alto m¡nimo	01/03/2016	
		ancmxnor	Num	4	2	ancho M ximo  	01/03/2016	
		altmxnor	Num	4	2	alto M ximo  	01/03/2016	
		ancmxinv	Num	4	2	ancho M ximo tela Invertida	01/03/2016	
		altmxinv	Num	4	2	alto M ximo tela Invertida	01/03/2016	
		tolmaxan	Num	3	2	tolerancia maxima ancho  ejemplo 20% expresado como 1,20	28/04/2016	
		tolmaxal	Num	3	2	tolerancia maxima alto ejemplo 20% expresado como 1,20	28/04/2016	
		tolmaxsp	Num	3	2	tolerancia maxima superficie ejemplo 20% expresado como 1,20	28/04/2016	
		libre	Alf	16		libre	28/04/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
								
VARIANTES	96	codart	Num	5	0	c¢digo art¡culo con variantes de preg y resp?	01/03/2016	
  	 	prenro	Num	2	0	pregunta N§	01/03/2016	
		resnro	Num	2	0	respuesta N§	01/03/2016	
		texvar	Alf	50	0	texto de la variante	01/03/2016	
		Obligtoria	Alf	1	 	variante obligatoria	01/03/2016	
		libre	Alf	35	 	libre	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
								
								
MANDOS	192	codrub	Num	2	0	c¢digo de rubro	01/03/2016	
  	 	orden	Num	2	0	orden para mostrar	01/03/2016	
		codtip	Alf	1	 	c¢digo de tipo	01/03/2016	
		nomtipc	Alf	12	 	nombre corto del tipo	01/03/2016	
		nomtipl	Alf	80	 	nombre larfgo del tipo	01/03/2016	
		libre	Alf	1		libre	01/03/2016	
		altnorSS	Num	4	2	altura normal de mando sin mecanismo	01/03/2016	
		libre	Alf	1		libre	01/03/2016	
		hasta1	Num	4	2	op1. hasta dicha medida	01/03/2016	
		opera1	Alf	1		op1. operacion a realizar R:restar F:valor fijo	01/03/2016	
		medid1	Num	4	2	op1. valor para operaci¢n	01/03/2016	
		libre	Alf	1		libre	01/03/2016	
		hasta2	Num	4	2	op2. hasta dicha medida	01/03/2016	
		opera2	Alf	1		op2. operacion a realizar R:restar F:valor fijo	01/03/2016	
		medid2	Num	4	2	op2. valor para operaci¢n	01/03/2016	
		libre	Alf	1		libre	01/03/2016	
		hasta3	Num	4	2	op3. hasta dicha medida	01/03/2016	
		opera3	Alf	1		op3. operacion a realizar R:restar F:valor fijo	01/03/2016	
		medid3	Num	4	2	op3. valor para operaci¢n	01/03/2016	
		libre	Alf	1		libre	01/03/2016	
		hasta4	Num	4	2	op4. hasta dicha medida	01/03/2016	
		opera4	Alf	1		op4. operacion a realizar R:restar F:valor fijo	01/03/2016	
		medid4	Num	4	2	op4. valor para operaci¢n	01/03/2016	
		observ	Alf	40		observaciones de uso	01/03/2016	
		libre	Alf	9		libre	18/03/2016	
		abm	Alf	1		control abm y reg borrados seg£n codificaci¢n:  C R U D	18/03/2016	
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								
								 
								
								
Dise¤o de archivos para Informar PEDIDO de orden de Fabricacion a Rielamericano								
								
Pueden ser 2 archivos separados o 1 archivo con distintos formatos de registro con un identificador								
								
CABECERA	416	numped	Alf	20	 	n£mero de presupuesto ( cliente + dispositivo + n§ aleatorio )	18/04/2016	
  	 	Cliente	Num	6	0	n£mero de cliente o vendedor RA	18/04/2016	
		Fecha	Num	6	0	Fecha acpetaci¢n	18/04/2016	
		nomclif	Alf	25		nombre cliente final	18/04/2016	
		domclif	Alf	25		domicilio cliente final	18/04/2016	
		locclif	Alf	25		localidad cliente final	18/04/2016	
		provclif	Alf	25		provincia cliente final	18/04/2016	
		codposf	Num	4	0	c¢digo postal cliente final 	18/04/2016	
		telclif	Alf	20		tel‚fono cliente final	18/04/2016	
		mailclif	Alf	50		direcci¢n de mail cliente final	18/04/2016	
		tipresf	Num	1	0	Tipo de responsable iva cliente final	18/04/2016	
		numcuitf	Num	11	0	numero de cuit o documento cliente final 	18/04/2016	
		obra	Alf	40		descripci¢n Obra	18/04/2016	
		observac 	Alf	40		observaciones	18/04/2016	
		SUBNET	Num	11	2	subtotal NETO	18/04/2016	
		desexc	NUN	9	2	descuento exclusividad	18/04/2016	
		desvid	NUN	9	2	descuento vidriera	18/04/2016	
		desesp	NUN	9	2	descuento especial	18/04/2016	
		TOTNET	Num	11	2	total NETO	18/04/2016	
		libre	Alf	69		libre		
				 				
								
								
DETALLE	512	numped	Alf	20	 	n£mero de presupuesto ( cliente + dispositivo + n§ aleatorio )	18/04/2016	
  	 	item	Alf	15	 	descripci¢n Item	18/04/2016	
		subitem	Alf	15	 	descripci¢n subitem	18/04/2016	
		rengl¢n	Num	3	0	n£mero de rengl¢n	18/04/2016	
		articu	Num	5	0	n£mero de art¡culo	18/04/2016	
		descrip	Alf	60		descripci¢n art¡culo	18/04/2016	
		ancho	Num	5	3	ancho solicitado	18/04/2016	
		alto	Num	4	2	alto solicitado	18/04/2016	
		cantidad	Num	5		cantidad solicitada	18/04/2016	
		tipoma  	Alf	1		tipo de mando	18/04/2016	
		descma	Alf	80	 	descripci¢n del mando	18/04/2016	
		altuma	Num	4	2	altura de mando	18/04/2016	
		listaP	Alf	1		lista de precios Utilizada	18/04/2016	
		Plista	Num	9	2	precio de lista Utilizado	18/04/2016	
		Pcosto	Num	9	2	costo informado por RA	18/04/2016	
		Pdescu	Nun	4	2	porcentaje de descuento utilizado	18/04/2016	
		Pganancia	Num	5	2	porcentaje de ganancia aplicado por el distribuidor	18/04/2016	
		observac1 	Alf	50		observacion 1	18/04/2016	
		observac2 	Alf	50		observacion 2	18/04/2016	
		observac3 	Alf	50		observacion 3	18/04/2016	
		observac4 	Alf	50		observacion 4	18/04/2016	
		libre	Alf	67		libre	18/04/2016	
	 	 		 				
