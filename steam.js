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
  // Initialize Firebase
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
      //Guardo los datos capturados usando el id de cada control
      var usuarioid = document.getElementById("Input1").value;
      var nickname = document.getElementById("Input2").value;
      var password = document.getElementById("Input3").value;
      var name = document.getElementById("Input4").value;
      var surname = document.getElementById("Input5").value;
      var correo = document.getElementById("Input6").value;
      var localidad = document.getElementById("Input7").value;
  
      //validaciones
      if (usuarioid.length > 0) {
          //creo un objeto que guarda los datos
          var usuario = {
              usuarioid, //matricula:usuarioid
              nickname,
              password,
              name,
              surname,
              correo,
              localidad,
          }
  
          //console.log(alumno);
  
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
          //firebase.database().ref('users/' + userId).set({
      //    username: name,
      //    email: email,
      //    profile_picture : imageUrl
      //  });
      //https://firebase.google.com/docs/database/web/read-and-write?hl=es
  
    
      //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
      //automaticamente
      //const key = firebase.database().ref().child('Alumnos').push().key;
      //data[`Alumnos/${key}`]= alumno;
      //firebase.database().ref().update(data).then(()=>{
      //  alert('Agregado exitosamente');
      //})
  }
  
  function read(){
      document.getElementById("Table1").innerHTML='';
  
      var ref = firebase.database().ref('Usuarios');
  /**   
     ref.on('value', function(snapshot) {
          snapshot.forEach(row=>{
              printRow(row.val());
          })
      });
   */
     
      ref.on("child_added", function(snapshot) {
          printRow(snapshot.val());
      });
  
  }
  
  function printRow(usuario){
      
      if(usuario!=null){
          var table = document.getElementById("Table1"); 
  
          //creamos un nuevo elemento en la tabla en la ultima posicion
          var row = table.insertRow(-1);
  
          //Insertamos cada una de las celdas/columnas del registro
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);
          var cell9 = row.insertCell(8);
          
          //Agregamos la informacion a cada una de las columnas del registro
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
  
  
  //Para consulta de localidad
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
      
      //creamos un nuevo elemento en la tabla en la ultima posicion
      var row = table.insertRow(-1);
  
      //Insertamos cada una de las celdas/columnas del registro
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      
      //Agregamos la informacion a cada una de las columnas del registro
      cell1.innerHTML = usuario.usuarioid;
      cell2.innerHTML = usuario.nickname; 
      cell3.innerHTML = usuario.password;
      cell4.innerHTML = usuario.name;
      cell5.innerHTML = usuario.surname;
      cell6.innerHTML = usuario.correo;
      cell7.innerHTML = usuario.localidad; 
     
  }