

const colors = document.querySelectorAll(".color");

colors.forEach(color=>{
    color.addEventListener("click", ()=>{
        colors.forEach(c=>c.classList.remove("active"));
        color.classList.add("active");
    });
});
// Cambio de color de ropa
function cambiar(imagen, boton) {
  document.getElementById("ropa").src = imagen;

  document.querySelectorAll(".color").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");
}

function cambiarColor(boton, imagen) {

  const producto = boton.closest(".producto");
  const ropa = producto.querySelector(".ropa");

  ropa.src = imagen;

  producto.querySelectorAll(".color").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");
}
function cambiar(boton, imagen) {

  const producto = boton.closest(".producto");
  const ropa = producto.querySelector(".ropa");

  ropa.src = imagen;

  producto.querySelectorAll(".color").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");
}
// Agregar al carrito


function renderCarrito(){
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;

    const li = document.createElement("li");
    li.textContent = `${p.nombre} x${p.cantidad}`;
    lista.appendChild(li);
  });

  totalEl.textContent = "Total: RD$ " + total;
}

document.getElementById("btnComprar").addEventListener("click", () => {

  if(carrito.length === 0){
    alert("🛒 Tu carrito está vacío");
    return;
  }
alert("Seguro que deseas confirmar tu compra?")
  alert("✅ Compra realizada con éxito");

  carrito.length = 0;
  renderCarrito();
});
// abrir carrito
document.addEventListener("DOMContentLoaded", () => {

  const btnCarrito = document.getElementById("btnCarrito");
  const panel = document.getElementById("panelCarrito");

  if(btnCarrito && panel){
    btnCarrito.addEventListener("click", () => {
      panel.classList.toggle("abierto");
    });
  }

});

const carrito = [];
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const btnCarrito = document.getElementById("btnCarrito");
const panelCarrito = document.getElementById("panelCarrito");

let total = 0;

btnCarrito.addEventListener("click", () => {
  panelCarrito.classList.toggle("activo");
});

document.querySelectorAll(".producto").forEach((producto) => {

  const boton = producto.querySelector(".add-carrito");

  boton.addEventListener("click", () => {

    const nombre = producto.querySelector("h4").textContent;
    const precioTexto = producto.querySelector("p").textContent;
    const precio = parseInt(precioTexto.replace("RD$","").replace(",",""));

    carrito.push({nombre, precio});

    actualizarCarrito();

  });

});

function actualizarCarrito(){

  listaCarrito.innerHTML = "";
  total = 0;

  carrito.forEach((producto, index) => {

    total += producto.precio;

    const li = document.createElement("li");

    li.innerHTML = `
      ${producto.nombre} - RD$ ${producto.precio}
      <button onclick="eliminarProducto(${index})">❌</button>
    `;

    listaCarrito.appendChild(li);

  });

  totalCarrito.textContent = "Total: RD$ " + total;

}

function eliminarProducto(index){

  carrito.splice(index,1);
  actualizarCarrito();

}


// Boton de pago por paypal



paypal.Buttons({

createOrder: function(data, actions) {

  return actions.order.create({
    purchase_units: [{
      amount: {
        value: (total / 58).toFixed(2) // convierte RD$ a USD aprox
      }
    }]
  });

},

onApprove: function(data, actions) {
  return actions.order.capture().then(function(details) {

    alert("Pago completado por " + details.payer.name.given_name);

    carrito.length = 0;
    actualizarCarrito();

  });
}

}).render('#paypal-button-container');

// Conteo real de paypal

