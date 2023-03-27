let btnAgregar = document.querySelector('#btnAgregar');
//btnAgregar.addEventListener('click', agregar);
let btnDuracion = document.querySelector('#btnDuracion');
btnDuracion.addEventListener('click', duracion);
let btnBuscar = document.querySelector('#btnBuscar');

let pistas = [];

load();

//Metodo para buscar una pista por identificador
btnBuscar.addEventListener('click', () => {
  console.log('Función Buscar');
  let identificador = parseInt(document.querySelector('#identificador').value);
  if (identificador) {
    load(identificador);
  }
  document.querySelector('#identificador').value = '';
});

//Metodo para agregar pistas
btnAgregar.addEventListener('click', async () => {
  console.log('Función Agregar');
  let identificador = parseInt(document.querySelector('#identificador').value);
  let titulo = document.querySelector('#titulo').value;
  let duracion = parseInt(document.querySelector('#duracion').value);
  let interprete = document.querySelector('#interprete').value;
  let renglon = {
    identificador: identificador,
    titulo: titulo,
    duracion: duracion,
    interprete: interprete,
  };
  if (agregarSRV(renglon)) {
    pistas.push(renglon);
    mostrarPistas();
  }
});

async function agregarSRV(datos) {
  let respuesta = await fetch('/pistas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return (await respuesta.text()) == 'ok';
}

function agregar() {
  console.log('Función Agregar');
  let identificador = parseInt(document.querySelector('#identificador').value);
  let titulo = document.querySelector('#titulo').value;
  let duracion = parseInt(document.querySelector('#duracion').value);
  let interprete = document.querySelector('#interprete').value;
  let renglon = {
    identificador: identificador,
    titulo: titulo,
    duracion: duracion,
    interprete: interprete,
  };
  pistas.push(renglon);
  mostrarPistas();
}
function duracion() {
  console.log('Función Duración');
  let total = 0;
  for (let i = 0; i < pistas.length; i++) {
    total += pistas[i].duracion;
  }
  let max = pistas[0].duracion;
  for (let r of pistas) {
    if (max < r.duracion) max = r.duracion;
  }
  document.querySelector('#total').innerHTML = `
    <p>Duración Total: ${total}</p>
    <p>Duración Máxima: ${max}</p>
    `;
}

/*load();
btnAgregar.addEventListener("click", () => { ... });
btnDuracion.addEventListener("click", () => { ... });
function mostrarPistas() { ... }
async function load() {
pistas = [];
let respuesta = await fetch("/pistas");
if (respuesta.ok) {
pistas = await respuesta.json();
}
mostrarPistas()
}*/

function mostrarPistas() {
  let html = '';
  for (let r of pistas) {
    html += `
      <tr>
      <td><input type="text" value="${r.identificador}" id="indentificador${r.identificador}"></td>
      <td><input type="text" value="${r.titulo}" id="titulo${r.identificador}"></td>
      <td><input type="text" value="${r.duracion}" id="duracion${r.identificador}"></td>
      <td><input type="text" value="${r.interprete}" id="interprete${r.identificador}"></td>
      <td><button class="btnUpdPista" ident="${r.identificador}">Actualizar</button></td>
      <td><button class="btnDelPista" identificador="${r.identificador}">Borrar</button></td>
      </tr>
      `;
  }
  document.querySelector('#tblPistas').innerHTML = html;
  let botonesBorrar = document.querySelectorAll('.btnDelPista');
  botonesBorrar.forEach((e) => {
    e.addEventListener('click', btnBorrarClick);
  });
  let botonesActualizar = document.querySelectorAll('.btnUpdPista');
  botonesActualizar.forEach((e) => {
    e.addEventListener('click', btnActualizarClick);
  });
}



async function btnActualizarClick() {
  let id = this.getAttribute("ident");
  let renglon = {
  identificador: document.getElementById(`indentificador${id}`).value,
  titulo: document.getElementById(`titulo${id}`).value,
  duracion: document.getElementById(`duracion${id}`).value,
  interprete: document.getElementById(`interprete${id}`).value,
  }
  let respuesta = await fetch(`/pistas/${id}`, {
  method :'PUT',
  headers: { 'Content-Type' : 'application/json' },
  
  body : JSON.stringify(renglon)
  });
  load();
  }

/*async function load() {
    let container = document.querySelector('#tblPistas');
    container.innerHTML = "<h1>Loading...</h1>";
    try {
    let response = await fetch('./mock.json');
    if (response.ok) {
    pistasJson = await response.json();
    pistas = pistasJson.audios
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    mostrarPistas();
    }
    else
        container.innerHTML = "<h1>404 Error - Failed URL!</h1>";
  }catch(response){
    container.innerHTML = "<h1>500 Connection error</h1>"
  }
    }*/

async function btnBorrarClick() {
  let id = this.getAttribute('identificador');
  let respuesta = await fetch(`/pistas/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  load();
}

async function load(identificador) {
  pistas = [];
  let url = '';
  if (identificador) url = `/pistas/${identificador}`;
  else url = '/pistas';
  let respuesta = await fetch(url);
  if (respuesta.ok) {
    if (identificador) pistas.push(await respuesta.json());
    else pistas = await respuesta.json();
  }
  mostrarPistas();
}

async function aServidor(datos, accion) {
  let respuesta;
  switch (accion) {
    case 'A': {
      //ALTA
      respuesta = await fetch('/pista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      break;
    }
  }
  return (await respuesta.text()) == 'ok';
}

/*async function load() {
      pistas = [];
      let respuesta = await fetch("/pistas");
      if (respuesta.ok) {
      pistas = await respuesta.json();
      }
      mostrarPistas()
      }*/
