const protocol = window.location.protocol;
const urlG = window.location.host;

document.addEventListener("DOMContentLoaded", function() {
    // code...
    getEmpleados();
});

//funcion que trae todos los empleados
function getEmpleados() {
    var ajaxP = new XMLHttpRequest();
    let url = `${protocol}//${urlG}/getEmp`;

    ajaxP.open('GET', url, true);

    ajaxP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let resp = JSON.parse(this.responseText);
                renderEmpl(resp);
            } catch (e) {
                console.log(e);
            }
        } else if (this.readyState == 4 && this.status == 201) {
            let cargaD = document.getElementById('cargaData');
            cargaD.style.display = 'none';
            let fordi = document.getElementById('fordiben');
            fordi.style.display = 'table-row';
        }
    }

    ajaxP.send();
}

//funcion que pinta los empleados en la tabla
function renderEmpl(info) {
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    info.forEach(element => {
        //fila
        let row = document.createElement('tr');
        row.setAttribute('id', 'empId' + element.numero_id);
        //columna de tipo de documento
        let colTipo = document.createElement('td');
        colTipo.setAttribute('id', 'tipoDoc' + element.numero_id);
        colTipo.innerHTML = (element.tipo_id == '1') ? 'NIT' : 'CC';
        row.appendChild(colTipo);
        //columna de numero de idetificacion
        let colId = document.createElement('td');
        colId.setAttribute('id', 'numDoc' + element.numero_id);
        colId.innerHTML = element.numero_id;
        row.appendChild(colId);
        //columna de nombre
        let colNombre = document.createElement('td');
        colNombre.setAttribute('id', 'nombre' + element.numero_id);
        colNombre.innerHTML = element.nombres;
        row.appendChild(colNombre);
        //columna de apellidp
        let colApellido = document.createElement('td');
        colApellido.setAttribute('id', 'apellido' + element.numero_id);
        colApellido.innerHTML = element.apellidos;
        row.appendChild(colApellido);
        //columna de correo
        let colEmail = document.createElement('td');
        colEmail.setAttribute('id', 'correo' + element.numero_id);
        colEmail.innerHTML = element.correo;
        row.appendChild(colEmail);
        //columna de fecha ingreso
        let colFechaIng = document.createElement('td');
        colFechaIng.setAttribute('id', 'fecha' + element.numero_id);
        colFechaIng.innerHTML = formaDate(element.fecha_ingreso);
        row.appendChild(colFechaIng);
        //columna de salario
        let colSalario = document.createElement('td');
        colSalario.setAttribute('id', 'salario' + element.numero_id);
        colSalario.innerHTML = formatSueldo(element.salario);
        row.appendChild(colSalario);
        //columna de telefonos
        let colTels = document.createElement('td');
        colTels.setAttribute('id', 'tels' + element.numero_id);
        let objTels = addTels(element.telefonos);
        colTels.appendChild(objTels);
        row.appendChild(colTels);
        //columna de editar
        let colEdit = document.createElement('td');
        colEdit.innerHTML = `<a class="badge badge-info"
        onClick="editaEmp(${element.numero_id})">Editar</a>`;
        row.appendChild(colEdit);
        //columna Borrar
        let colBorrar = document.createElement('td');
        colBorrar.innerHTML = `<a class="badge badge-secondary"
        onClick="borrarEmp(${element.numero_id})">Borrar</a>`;
        row.appendChild(colBorrar);
        //agregamos la fila a la tabla
        tabla.appendChild(row);
    });
}

//funcion que formatea la fecha
function formaDate(date) {
    return date.substring(0, date.indexOf('T'));
}

//funcion que formatea el salario
function formatSueldo(sueldo) {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
    let sueldoA = formatter.format(sueldo);
    return sueldoA.substring(0, sueldoA.length - 3);
}

//funcion que formatea los elementos
//del dom para representar los telefonos
function addTels(tels) {
    let telefonos = document.createElement('span');
    telefonos.innerHTML = 'Sin telefono';
    if (tels.length > 0) {
        telefonos = document.createElement('a');
        telefonos.innerHTML = tels[0].numero_tel;
        if (tels.length > 1) {
            let title = '';
            for (let i = 1; i < tels.length; i++) {
                title += ' * ' + tels[i].numero_tel + ' * ';
            }
            telefonos.setAttribute('title', 'Otros numeros: ' + title);
            telefonos.setAttribute('href', '#ancla');
        }
    }
    return telefonos;
}

//funcion que invoca al api para borrar un 
//empleado
function borrarEmp(idEmp) {

    var ajaxP = new XMLHttpRequest();
    let url = `${protocol}//${urlG}/deleteEmp/${idEmp}`;

    ajaxP.open('DELETE', url, true);

    ajaxP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let resp = JSON.parse(this.responseText);
                if (resp.DeleteEmp) {
                    let msg = document.getElementById('empEl');
                    let row = document.getElementById('empId' + idEmp);
                    msg.style.display = 'block';
                    row.style.display = 'none';
                    setTimeout(() => {
                        msg.style.display = 'none';
                    }, 5000);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    ajaxP.send();
}