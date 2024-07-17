let formulario = document.querySelector("#formulario");
let tabla = document.querySelector("#tabla");

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    // Coeficientes
    let coeficiente_a = document.querySelector("#coeficiente_a");
    let coeficiente_b = document.querySelector("#coeficiente_b");
    let coeficiente_c = document.querySelector("#coeficiente_c");
    
    // Errores
    let error_a = document.querySelector("#error_a");
    let error_b = document.querySelector("#error_b");
    let error_c = document.querySelector("#error_c");

    // Obtener valores de los coeficientes y limpiar espacios
    let a = coeficiente_a.value.trim();
    let b = coeficiente_b.value.trim();
    let c = coeficiente_c.value.trim();
    
    // Variable de control para errores
    let centinela = false; 
    let msge_a = "";
    let msge_b = "";
    let msge_c = "";

    // Validaciones de entrada
    if (!a || isNaN(a)) {
        msge_a = "Debes de ingresar un número válido para el coeficiente a";
        centinela = true;
    }

    if (!b || isNaN(b)) {
        msge_b = "Debes de ingresar un número válido para el coeficiente b";
        centinela = true;
    }

    if (!c || isNaN(c)) {
        msge_c = "Debes de ingresar un número válido para el coeficiente c";
        centinela = true;
    }

    // Mostrar errores en el formulario
    error_a.innerHTML = msge_a;
    error_b.innerHTML = msge_b;
    error_c.innerHTML = msge_c;

    // Validar si hay errores antes de proceder
    if (centinela) {
        return; 
    }

    // Convertir los valores a números
    let aNum = parseFloat(a);
    let bNum = parseFloat(b);
    let cNum = parseFloat(c);

    // Calcular el discriminante
    let discriminante = bNum * bNum - 4 * aNum * cNum;

    // Validar el discriminante
    if (discriminante < 0) {
        alert("La ecuación no tiene solución porque la raiz es negativa");
        return;
    }

    let x1, x2;

    // Calcular x1 y x2
    if (discriminante > 0) {
        x1 = (-bNum + Math.sqrt(discriminante)) / (2 * aNum);
        x2 = (-bNum - Math.sqrt(discriminante)) / (2 * aNum);
    } else if (discriminante === 0) {
        x1 = x2 = -bNum / (2 * aNum);
    }

    // Imprimir los coeficientes y resultados en la tabla
    imprimir(aNum, bNum, cNum, x1, x2);
});

// Función para imprimir la tabla con los coeficientes y resultados
let imprimir = (a, b, c, x1, x2) => {
    let msg = "<table class='container table table-bordered mt-4'>";
    msg += "<thead>";
    msg += "<tr>";
    msg += "<th class='table-dark'>Coeficiente a</th>";
    msg += "<th class='table-dark'>Coeficiente b</th>";
    msg += "<th class='table-dark'>Coeficiente c</th>";
    msg += "<th class='table-dark'>X1</th>";
    msg += "<th class='table-dark'>X2</th>";
    msg += "</tr>";
    msg += "</thead><tbody>";
    
    msg += "<tr>";
    msg += `<td>${a}</td>`;
    msg += `<td>${b}</td>`;
    msg += `<td>${c}</td>`;
    msg += `<td>${x1 !== undefined ? x1.toFixed(2) : 'N/A'}</td>`;
    msg += `<td>${x2 !== undefined ? x2.toFixed(2) : 'N/A'}</td>`;
    msg += "</tr>";
    msg += "</tbody></table>";
    msg += "<button class='btn btn-primary mt-4' onclick='regresar()'>Regresar</button>";
    
    tabla.innerHTML = msg; // Mostrar la tabla en el elemento con id 'tabla'
    document.getElementById('formulario-container').style.display = 'none'; // Ocultar el formulario
};

// Función para regresar al formulario
let regresar = () => {
    document.getElementById('formulario-container').style.display = 'block'; // Mostrar el formulario
    tabla.innerHTML = ''; // Limpiar el contenido de la tabla
    error_a.innerHTML = ''; // Limpiar los mensajes de error
    error_b.innerHTML = ''; // Limpiar los mensajes de error
    error_c.innerHTML = ''; // Limpiar los mensajes de error
};
