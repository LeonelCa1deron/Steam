![](itt.jpg) ![](syc.png) ![](tecnm.png)

## Tecnológico Nacional de México
## Instituto Tecnológico de Tijuana
## Subdirección Académica
## Departamento de Sistemas y Computación

## FEB - JUN 2023

## Carrera:
#### Ingeniería en Sistemas Computacionales

## Materia y Serie:
#### Programación Web | AEB-1055

## Tarea2: JS + Firebase

## Unidad I

## Alumno y Número de Control:
#### Calderón Gastelum Sergio Leonel - 18212153

## Docente:
#### Dra. Daniela Adriana Sánchez Vizcarra.

## Fecha de Entrega:
#### Viernes, 24 de febrero de 2022

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1cBIYkrtG6iJMkzcB07ubgnW37rRvo3zRA&usqp=CAU)

---

# Introducción
Para esta práctica, se hará uso de una base de datos en la nube haciendo uso de la plataforma de firebase. Con firebase nos permitirá
reflejar los datos que se almacenen en nuestra tabla de la práctica en JS y por medio de la API_Key que se genera al crear un nuevo proyecto en la plataforma nos permitirá guardar de igual forma los datos en la nube. El objetivo de esta práctica es básicamente hacer funcionar tanto el almacenamiento de los datos en la tabla creada como almacenarlas en la base de datos por firebase, en este caso implementaremos 7 campos los cuales el usuario deberá ingresar para poder guardarlos con éxito mediante la temática de Steam (Plataforma de videojuegos).

![](https://1000logos.net/wp-content/uploads/2023/01/Steam-Logo-2002.png)

---

# Contenido
## Pantallas Principales
![](registros.PNG)
Figura 1. Pantalla de index.html, se realizan los registros de los usuarios de la tabla.

![](consultatij.PNG)
Figura 2. Pantalla de consulta.html, se buscan los usuarios registrados en base a la localidad (Tijuana).

![](consultaens.PNG)
Figura 3. Pantalla de consulta.html, se buscan los usuarios registrados en base a la localidad (Ensenada).

![](firebase.PNG)
Figura 4. Pantalla de la base de datos en Firebase con los datos de la tabla en el JS.

## Código Principal
#### Código de steam.js
var firebaseConfig = {
    apiKey: "AIzaSyBDc4SmjRFqkEfyZdcSBRRclbjzs1aZtMQ",
    authDomain: "steam-5036b.firebaseapp.com",
    databaseURL: "https://steam-5036b-default-rtdb.firebaseio.com",
    projectId: "steam-5036b",
    storageBucket: "steam-5036b.appspot.com",
    messagingSenderId: "815593724683",
    appId: "1:815593724683:web:bfa04d2065b5d5de6fe00e",
    measurementId: "G-PHNQGT8ED0"
  };
  firebase.initializeApp(firebaseConfig);
  
  
  function resetFields(){
      document.getElementById("Input1").value='';
      document.getElementById("Input2").value='';
      document.getElementById("Input3").value='';
      document.getElementById("Input4").value='';
      document.getElementById("Input5").value='';
      document.getElementById("Input6").value='';
      document.getElementById("Input7").value='Selecciona';
  }
  function createR() {
      document.getElementById("Input1").disabled = false;

      var usuarioid = document.getElementById("Input1").value;
      var nickname = document.getElementById("Input2").value;
      var password = document.getElementById("Input3").value;
      var name = document.getElementById("Input4").value;
      var surname = document.getElementById("Input5").value;
      var correo = document.getElementById("Input6").value;
      var localidad = document.getElementById("Input7").value;
  
      if (usuarioid.length > 0) {
          var usuario = {
              usuarioid,
              nickname,
              password,
              name,
              surname,
              correo,
              localidad,
          }
  
          firebase.database().ref('Usuarios/' + usuarioid).update(usuario).then(() => {
             resetFields();
          }).then(()=>{
             read();
          });
  
          swal("Listo!", "Agregado correctamente", "success");
  
          
      } 
      else {
          swal("Error", "Llena todos los campos","warning");
      }
  
      document.getElementById("Input1").disabled = false;
  }
  
  function read(){
      document.getElementById("Table1").innerHTML='';
  
      var ref = firebase.database().ref('Usuarios');
     
      ref.on("child_added", function(snapshot) {
          printRow(snapshot.val());
      });
  
  }
  
  function printRow(usuario){
      
      if(usuario!=null){
          var table = document.getElementById("Table1"); 
  
          var row = table.insertRow(-1);
  
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);
          var cell9 = row.insertCell(8);
          
          cell1.innerHTML = usuario.usuarioid;
          cell2.innerHTML = usuario.nickname; 
          cell3.innerHTML = usuario.password;
          cell4.innerHTML = usuario.name;
          cell5.innerHTML = usuario.surname;
          cell6.innerHTML = usuario.correo;
          cell7.innerHTML = usuario.localidad; 
          cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${usuario.usuarioid})">Eliminar</button>`;
          cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+usuario.usuarioid+')">Modificar</button>';
      }
  }
  
  function deleteR(usuarioid){
      firebase.database().ref('Usuarios/' + usuarioid).set(null).then(() => {
        read();
      }).then(()=>{
         swal("Listo!", "Eliminado correctamente", "success");
      });
  }
  
  function seekR(usuarioid){
      var ref = firebase.database().ref('Usuarios/' + usuarioid);
      ref.on('value', function(snapshot) {
        updateR(snapshot.val());
      });
  }
  
  function updateR(usuario){
      if(usuario!=null)
      {
          document.getElementById("Input1").value=usuario.usuarioid;
          document.getElementById("Input1").disabled = true;
          document.getElementById("Input2").value=usuario.nickname;
          document.getElementById("Input3").value=usuario.password;
          document.getElementById("Input4").value=usuario.name;
          document.getElementById("Input5").value=usuario.surname;
          document.getElementById("Input6").value=usuario.correo;
          document.getElementById("Input7").value=usuario.localidad;
      }
  }
  
  function readQ(){
      document.getElementById("Table2").innerHTML='';
      var c = document.getElementById("Input8").value;
  
      var ref = firebase.database().ref("Usuarios");
      ref.orderByChild("localidad").equalTo(c).on("child_added", function(snapshot) {
          printRowQ(snapshot.val());
      });
  
  }
  
  
  function printRowQ(usuario){
  
      var table = document.getElementById("Table2"); 
      
      var row = table.insertRow(-1);
  
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      
      cell1.innerHTML = usuario.usuarioid;
      cell2.innerHTML = usuario.nickname; 
      cell3.innerHTML = usuario.password;
      cell4.innerHTML = usuario.name;
      cell5.innerHTML = usuario.surname;
      cell6.innerHTML = usuario.correo;
      cell7.innerHTML = usuario.localidad; 
     
  }

#### Código de index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Steam</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-database.js"></script>
    <script src="steam.js"></script>
    <link rel = "shortcut icon" type = "image" href="Steam.png"/>
</head>

<body onload="read()" background="Background.jpg"> 
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Steam</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Usuarios<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./consulta.html">Localidad</a>
                </li>
            </ul>

        </div>
    </nav>

    <div class="container p-3 my-3">
        <div class="row">

            <div class="col-md-4">
                <h3 style="text-align:center">Registro de Usuarios</h3>

                <form action="#">
                    <div class="form-group ">
                        <label for="Input1">ID de Usuario</label>
                        <input type="text " class="form-control " id="Input1" placeholder="ID de Usuario">
                    </div>
                    <div class="form-group">
                        <label for="Input2">Nickname</label>
                        <input type="text" class="form-control" id="Input2" placeholder="Nickname">
                    </div>
                    <div class="form-group">
                        <label for="Input3">Password</label>
                        <input type="password" class="form-control" id="Input3" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="Input4">Name</label>
                        <input type="text" class="form-control" id="Input4" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="Input5">Surname</label>
                        <input type="text" class="form-control" id="Input5" placeholder="Surname">
                    </div>
                    <div class="form-group">
                        <label for="Input6">Email</label>
                        <input type="email" class="form-control" id="Input6" aria-describedby="emailHelp" placeholder="Enter Email">
                    </div>
                    <div class="form-group ">
                        <label for="Input7">Localidad</label>
                        <select class="form-control " id="Input7">
                            <option value="Selecciona">Selecciona</option>
                            <option value="Tijuana">Tijuana</option>
                            <option value="Ensenada">Ensenada</option>
                            <option value="Mexicali">Mexicali</option>
                            <option value="Tecate">Tecate</option>
                            <option value="Rosarito">Rosarito</option>
                        </select>
                    </div>
                    <button type="submit " class="btn btn-primary" onclick="createR()">Registrar</button>
                    <button type="reset " class="btn btn-secondary" onclick="resetFields()">Limpiar</button>
                </form>



            </div>
            <div class="col-md-8">
                <h3 style="text-align:center">Usuarios</h3>

                <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID-Usuario</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Password</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Localidad</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id='Table1'>


                    </tbody>
                  </table>
                
            </div>

        </div>
    </div>

</body>


</html>

#### Código de consulta.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Steam</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-database.js"></script>
    <script src="steam.js"></script>
    <link rel = "shortcut icon" type = "image" href="Steam.png"/>
</head>

<body onload="readQ()" background="Background.jpg"> 
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Steam</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="./index.html">Usuarios<span class="sr-only">Usuarios</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Localidad<span class="sr-only">(current)</span></a>
                </li>
            </ul>

        </div>
    </nav>

    <div class="container p-3 my-3">
        <div class="row">
            
            <div class="form-group">
                <label for="Input8">Localidad</label>
                <select class="form-control " id="Input8"  onchange="readQ()">
                    <option value="Selecciona">Selecciona</option>
                    <option value="Tijuana">Tijuana</option>
                    <option value="Ensenada">Ensenada</option>
                    <option value="Mexicali">Mexicali</option>
                    <option value="Tecate">Tecate</option>
                    <option value="Rosarito">Rosarito</option>
                </select>
            </div>  
            <div class="col-md-12">
                <h3 style="text-align:center">Usuarios</h3>

                <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID-Usuario</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Password</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Localidad</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id='Table2'>


                    </tbody>
                  </table>
                
            </div>

        </div>
    </div>

</body>


</html>

## Enlace del repositorio

# Conclusión