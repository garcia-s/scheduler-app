# scheduler-app
 A scheduler app just because

----------------------------------------
	Dependencias
---------------------------------------

Necesitas instalar flutter SDK, postgresql y nodejs

Android: Instalar android studio y drivers

Linux: Instalar las librerias necesarias para flutter.

Windows: Visual Studio para Win32 (UWP no disponible aun)

Chrome OS/Fucsia: No disponible (yet).

MacOS/IOS: Ser idiota y tener mucho dinero.


-------------------------------------------------
Firebase Pros/Cons
-------------------------------------------------
P: Reduce significativamente la cantidad de codigo de backend

C: Aumenta el costo de mantenimiento

P: Implementacion de datos en tiempo real sencilla

C: Carece de implementacion nativa para MacOS/Linux/windows

P: Maneja bien el trabajo sin conexion.

C: Necesita ser online-first sin posibilidad de deployment local.

P: Facil integracion con google cloud computing.

C: No se puede protejer detras de un vpn.

P: Facil implementacion de telemetria de errores para Android y IOS.

C: Sin telemetria de errores para Windows/Linux/Mac OS.



--------------------------------------------------
Arquitectura basade en WebSocket Pros/Cons
--------------------------------------------------

P:Puedo reutilizar codigo de otras aplicaciones.

C:Podria complicar de forma severa el backend de la aplicacion.

P: Facil migracion de distintos componentes (DB, Server, Server OS, Backend framework).

C: Dificulta la integracion y las pruebas de unidades (Jest y Mocha hacen bastante dificil el testing en eventemmitters)

P: Facil Escalabilidad  (Load balancers, migracion a uWebsocket.js, migracion de la base de datos).

C: Implementacion de seguridad compleja y con posibles brechas de segurdad.

P: Implementacion personalizada de politica CORS.

C: Implementacion personalizada de politica CORS. (I hate you CORS).

C: No se puede usar sessiones permanentes (Podria implementarse un sistema de tokens o id de sessiones,
pero el almacenamiento del token complica las cosas. flutter_secure_storage es una opcion pero 
implementar seguridad biometrica para guardar un token de session en vez de las credenciales de 
acceso es bastante ridiculo).

C: Posible multiplexing manual al escalar (Socketio hace multiplexing pero ws, y uWebsocket.js no).

--------------------------------------------------
Arquitectura  HTTP 2.0 (SSE) Pros/Cons
----------------------------------------------

P: Desarrollo rapido sin perdida de las caracteristicas de envio de datos en tiempo real (Unilateral con Server sent events)

C: La conexion se cierra automaticamente y hay que implementar un ticker para mantenerla abierta.

P: Facil implementacion de Authenticacion (Bearer JWT).

C: Sin acceso a cookies fuera del navegador, asi que se tiene que implemetar authenticacion basada en tokens. (Mismo Problema que con WS)

C: Perdida de comuncacion bilateral.

C: Multiplexing manual.


----------------------------------------------------
Otras opciones
----------------------------------------------------

GraphQL?
GRPC?

