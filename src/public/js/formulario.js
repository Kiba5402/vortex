let nombres = document.getElementById('nombres');
let apellidos = document.getElementById('apellidos');
let salario = document.getElementById('salario');
let tipoId = document.getElementById('tipoId');
let numId = document.getElementById('numId');
let email = document.getElementById('email');
let fecha = document.getElementById('fecha');
let tels = document.getElementById('divNums');

let arrayTel = [];

function guardaFn() {
    console.log(tipoId.value);
    if (nombres.value.trim() != "" && apellidos.value.trim() != "" &&
        salario.value.trim() != "" && numId.value.trim() != "" &&
        tipoId.value != -1) {
        viewObli(true);
        if (validaEmail()) {
            //enviamos los datospara guardar
            guardar();
        }
    } else {
        console.log("faltan datos");
        validaEmail();
        viewObli(false);
    }
}

function validaEmail() {
    if (email.value.trim() !== '') {
        let msg = document.getElementById('correoMsg');
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email.value).toLowerCase())) {
            msg.style.visibility = 'visible';
            return false;
        } else {
            msg.style.visibility = 'hidden';
            return true;
        }
    } else {
        return true;
    }
}

function viewObli(flag) {
    let ast = document.getElementsByClassName('obligatorio');
    console.log(ast);
    for (let i = 0; i < ast.length; i++) {
        if (flag) {
            ast[i].style.visibility = 'hidden';
        } else {
            ast[i].style.visibility = 'visible';
        }
    }
}

//funcion escucha del input de cantidad
function onlyNumber(event) {
    console.log(event);
    let regex = /[^0-9]/g;
    let match = event.key.match(regex);
    console.log(match);
    if (match !== null && (event.keyCode !== 37 && event.keyCode !== 39 && event.keyCode !== 8)) {
        return false;
    }
    return true;
}

//funcion que formatea el salario a
//medida que lo ingresamos
function formatSueldoForm(obj) {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
    let str = obj.value.split("$").join("");
    str = str.split(".").join("");
    let sueldoA = formatter.format(str);
    obj.value = sueldoA.substring(0, sueldoA.length - 3);
}

//funcion que nos ayuda a activar el
//boton de agregar telefono
function listenTels(obj) {
    let btn = document.getElementById('addTel');
    if (obj.value.trim() != '' && obj.value.length >= 7) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', true);
    }
}

//funcion para agregar numeros al div 
function addTelFn() {
    let input = document.getElementById('telefonoInput');
    let val = input.value;
    if (arrayTel.indexOf(val) == -1 && arrayTel.length < 3) {
        arrayTel.push(val);
        renderNewTel(true);
    }
}

function borrarTelProv(num) {
    let index = arrayTel.indexOf(num);
    arrayTel.splice(index, 1);
    let div = document.getElementById('telTemp' + num);
    div.remove();
}

function renderNewTel(flag) {
    let input = document.getElementById('telefonoInput');
    let divG = document.getElementById('divNums');
    let div = document.createElement('div');
    let divNum = document.createElement('div');
    let divBorrar = document.createElement('div');
    let divEditar = document.createElement('div');
    divNum.innerHTML = input.value;
    divBorrar.innerHTML = `<a class="badge badge-danger" onclick="borrarTelProv(${input.value})">Borrar</a>`;
    divEditar.innerHTML = flag ? '<span class="badge badge-secondary">Editar</span>' : `<a class="badge badge-primary">Editar</a>`;
    div.appendChild(divNum);
    div.appendChild(divEditar);
    div.appendChild(divBorrar);
    div.setAttribute('class', 'row linea');
    div.setAttribute('id', 'telTemp' + input.value);
    divNum.setAttribute('class', 'col-4');
    divBorrar.setAttribute('class', 'col-4');
    divEditar.setAttribute('class', 'col-4');
    divG.appendChild(div);
}

//funcion que recopila la informacion a guardar
function guardar() {

    var ajaxP = new XMLHttpRequest();
    let url = `${protocol}//${urlG}/insert`;

    let datos = recopDatosEnv();
    console.log(datos);

    ajaxP.open('POST', url, true);

    ajaxP.setRequestHeader("Content-Type", "application/json");
    ajaxP.send(JSON.stringify(datos));

    ajaxP.onreadystatechange = function() {
        let btnA = document.getElementById('btnGuarda');
        btnA.setAttribute('disabled', true);
        if (this.readyState == 4 && this.status == 200) {
            try {
                let resp = JSON.parse(this.responseText);
                if (resp.InsertEmp && resp.InsertTels) {
                    let msg = document.getElementById('empAdd');
                    msg.style.display = 'block';
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}

//funcion que recopila los datos desd elos input
function recopDatosEnv() {
    let str = salario.value.split("$").join("");
    str = str.split(".").join("");
    return {
        "nombres": nombres.value,
        "apellidos": apellidos.value,
        "tipo_id": tipoId.value,
        "numero_id": numId.value,
        "correo": email.value,
        "fecha_ingreso": fecha.value,
        "salario": str.trim(),
        "telefonos": creaTelList(numId.value)
    };
}

//funcion que crea el arreglo de numeros
function creaTelList(idEmp) {
    let resp = [];
    if (arrayTel.length > 0) {
        for (let i = 0; i < arrayTel.length; i++) {
            resp.push({
                "id_empleado": idEmp,
                "telefono": arrayTel[i]
            });
        }
        return resp;
    }
    return resp;
}

//funcion principal para la edicion de empleados
function editaEmp(idEmp) {
    console.log('se editara', idEmp);
    //datos de tabla
    let tipoDoc = document.getElementById('tipoDoc' + idEmp);
    let numDoc = document.getElementById('numDoc' + idEmp);
    let nombre = document.getElementById('nombre' + idEmp);
    let apellidos = document.getElementById('apellido' + idEmp);
    let correo = document.getElementById('correo' + idEmp);
    let fecha = document.getElementById('fecha' + idEmp);
    let salario = document.getElementById('salario' + idEmp);

    //elementos de formulario
    let tipoDocF = document.getElementById('tipoId');
    let numDocF = document.getElementById('numId');
    let nombreF = document.getElementById('nombres');
    let apellidosF = document.getElementById('apellidos');
    let correoF = document.getElementById('email');
    let fechaF = document.getElementById('fecha');
    let salarioF = document.getElementById('salario');
    let telsF = document.getElementById('telefonoInput');
    //asignamos los valores a los elementos
    //del formulario
    numDocF.value = numDoc.innerHTML;
    numDocF.setAttribute('original', numDoc.innerHTML);

    nombreF.value = nombre.innerHTML;
    nombreF.setAttribute('original', nombre.innerHTML);

    apellidosF.value = apellidos.innerHTML;
    apellidosF.setAttribute('original', apellidos.innerHTML);

    correoF.value = correo.innerHTML;
    correoF.setAttribute('original', correo.innerHTML);

    fechaF.value = fecha.innerHTML;
    fechaF.setAttribute('original', fecha.innerHTML);

    let str = salario.innerHTML.split("$").join("");
    str = str.split(".").join("");
    str = str.split("&nbsp;").join("");
    salarioF.value = str;
    salarioF.setAttribute('original', str);
    salarioF.onkeyup();

    let cheked = document.querySelector('option[value="' + (tipoDoc.innerHTML == 'CC' ? 2 : 1) + '"]');
    cheked.setAttribute('selected', true);
    tipoDocF.setAttribute('original', tipoDoc.innerHTML);

    telsF.setAttribute('disabled', true);
    document.getElementById('btnEdita').removeAttribute('disabled');
    document.getElementById('btnGuarda').setAttribute('disabled', true);
}

//funcion que recopila los datos a actualizar
function editaFn() {

    var ajaxP = new XMLHttpRequest();
    let url = `${protocol}//${urlG}/updateEmp`;

    let datos = creaDataEditaFn();
    console.log(datos);

    ajaxP.open('PUT', url, true);

    ajaxP.setRequestHeader("Content-Type", "application/json");
    ajaxP.send(JSON.stringify(datos));

    ajaxP.onreadystatechange = function() {
        /*         let btnA = document.getElementById('btnGuarda');
                btnA.setAttribute('disabled', true); */
        if (this.readyState == 4 && this.status == 200) {
            try {
                let resp = JSON.parse(this.responseText);
                if (resp.InsertEmp) {
                    let btnA = document.getElementById('btnEdita');
                    btnA.setAttribute('disabled', true);
                    let msg = document.getElementById('empUpd');
                    msg.style.display = 'block';
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}

function creaDataEditaFn() {

    //elementos de formulario
    let nombres = document.getElementById('nombres');
    let nombresUpd = (nombres.value != nombres.getAttribute('original')) ? nombres.value : null;

    let apellidos = document.getElementById('apellidos');
    let apellidosUpd = (apellidos.value != apellidos.getAttribute('original')) ? apellidos.value : null;

    let salario = document.getElementById('salario');
    let str = salario.value.split("$").join("");
    str = str.split(".").join("");
    str = str.split("&nbsp;").join("");
    let salarioUpd = (str != salario.getAttribute('original')) ? str.trim() : null;

    let correo = document.getElementById('email');
    let correoUpd = (correo.value != correo.getAttribute('original')) ? correo.value : null;

    let fecha = document.getElementById('fecha');
    let fechaUpd = (fecha.value != fecha.getAttribute('original')) ? fecha.value : null;

    let tipoId = document.getElementById('tipoId');
    let valTipo = tipoId.value == 1 ? 'NIT' : 'CC';
    let tipoIdUpd = (valTipo != tipoId.getAttribute('original')) ? tipoId.value : null;

    let datos = {
        "nombres": nombresUpd,
        "apellidos": apellidosUpd,
        "tipo_id": tipoIdUpd,
        "numero_id": document.getElementById('numId').value,
        "correo": correoUpd,
        "fecha_ingreso": fechaUpd,
        "salario": salarioUpd,
        "telefonos": []
    }

    return datos;
}