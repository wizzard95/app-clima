/**  Se selecciona el campo de entrada (<input>) con el id obtener-ciudad. 
*Este es donde el usuario introduce el nombre de la ciudad para obtener los datos del clima.*/
let inputCiudad = document.querySelector("#obtener-ciudad");

/**Se define un objeto apiData con dos propiedades:

    url: la base de la URL de la API de OpenWeatherMap para obtener el clima por ciudad.
    key: la clave de API necesaria para autenticarse y obtener los datos. */
let apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};
/**Se seleccionan varios elementos del DOM (etiquetas HTML con clases específicas) 
 * que mostrarán la información del clima: */
let nombreCiudad = document.querySelector(".nombreCiudad");
let temperatura = document.querySelector(".grados");
let condiciones = document.querySelector(".condiciones-climaticas");
let humedad = document.querySelector(".humedad");
let fechaHoy = document.querySelector(".fecha");

/** Se establece un valor predeterminado ("los angeles, cl") en el campo de entrada de la ciudad, 
*se llama inmediatamente a la función fetchDataFromApi() para obtener los datos del clima de esa ciudad.
Después de la llamada, se limpia el campo de entrada (se pone vacío).*/
inputCiudad.value = " los angeles, cl";
fetchDataFromApi();
inputCiudad.value = "";


/**e agrega un evento para detectar cuando el usuario presiona la tecla Enter en el campo de entrada.
*Si se presiona Enter,se llama a fetchDataFromApi() para obtener los datos del clima de la ciudad ingresada. */
inputCiudad.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        fetchDataFromApi();
    }
});

/**Esta función hace una llamada a la API de OpenWeatherMap.

insertedCity: toma el valor del campo de entrada (inputCiudad.value).
fetch: se construye una URL con el nombre de la ciudad y la clave de la API.
Luego, se envía la solicitud para obtener los datos.
Cuando se recibe la respuesta (res), se convierte en JSON y se pasa a la función addDataToDom() para actualizar el DOM. */
function fetchDataFromApi() {
    let insertedCity = inputCiudad.value;
    fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`)
        .then((res) => res.json())
        .then((data) => addDataToDom(data));
}

/**Esta función actualiza el DOM con los datos obtenidos de la API:

    nombreCiudad: muestra el nombre de la ciudad y el país.
    temperatura: convierte la temperatura de Kelvin a Celsius y la muestra con un redondeo.
    condiciones: muestra la descripción del clima (por ejemplo, "clear sky").
    humedad: muestra el porcentaje de humedad.
    fechaHoy: muestra la fecha actual, usando la función getDate(). */
function addDataToDom(data) {
    nombreCiudad.innerHTML = `${data.name}, ${data.sys.country}`;
    temperatura.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
    condiciones.innerHTML = data.weather[0].description;
    humedad.innerHTML = `Humedad: ${data.main.humidity}%`;
    fechaHoy.innerHTML = getDate();
}

/**La función getDate() devuelve una cadena con la fecha actual en formato día mes año.

    new Date(): obtiene la fecha y hora actuales.
    newTime.getMonth(): devuelve el número del mes (0-11), que se utiliza para acceder al array meses y obtener el nombre del mes correspondiente.
    Finalmente, devuelve una cadena con el formato: día, mes y año. */
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function getDate() {
    let newTime = new Date();
    let mes = meses[newTime.getMonth()];
    return `${newTime.getDate()} ${mes} ${newTime.getFullYear()}`;
}
