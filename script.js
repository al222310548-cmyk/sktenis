const productos=[

{ id:1,nombre:"Nike Air Max",precio:1200,imagen:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"},

{ id:2,nombre:"Adidas Ultraboost",precio:1500,imagen:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"},

{ id:3,nombre:"Puma RS-X",precio:1100,imagen:"https://images.unsplash.com/photo-1608231387042-66d1773070a5"},

{ id:4,nombre:"New Balance 550",precio:1340,imagen:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"},

{ id:5,nombre:"Nike Jordan",precio:1800,imagen:"https://images.unsplash.com/photo-1519741497674-611481863552"},

{ id:6,nombre:"Adidas NMD",precio:1160,imagen:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"},

{ id:7,nombre:"Nike Dunk",precio:1470,imagen:"https://images.unsplash.com/photo-1528701800489-20be9c5e1b2f"},

{ id:8,nombre:"Adidas Superstar",precio:1470,imagen:"https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"},

{ id:9,nombre:"Puma Future Rider",precio:1300,imagen:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"}

]

let carrito=JSON.parse(localStorage.getItem("carrito"))||[]
let usuarioActivo=JSON.parse(localStorage.getItem("usuarioActivo"))
let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[]

const catalogo=document.getElementById("catalogo")
const carritoHTML=document.getElementById("carrito")
const totalHTML=document.getElementById("total")
const cartCount=document.getElementById("cartCount")
const userBox=document.getElementById("userBox")

if(usuarioActivo){

userBox.innerHTML=`Hola ${usuarioActivo.user} <button onclick="cerrarSesion()">Cerrar sesión</button>`

}else{

userBox.innerHTML=`<button onclick="abrirRegistro()">Crear cuenta</button> <button onclick="abrirLogin()">Login</button>`

}

function abrirRegistro(){

document.getElementById("registerModal").classList.remove("hidden")

}

function cerrarRegistro(){

document.getElementById("registerModal").classList.add("hidden")

}

function abrirLogin(){

document.getElementById("loginModal").classList.remove("hidden")

}

function cerrarLogin(){

document.getElementById("loginModal").classList.add("hidden")

}

function cerrarSesion(){

localStorage.removeItem("usuarioActivo")

location.reload()

}

function togglePassword(){

let p1=document.getElementById("regPass")
let p2=document.getElementById("regPass2")

p1.type = p1.type==="password" ? "text":"password"
p2.type = p2.type==="password" ? "text":"password"

}

function registrar(){

let user=document.getElementById("regUser").value
let email=document.getElementById("regEmail").value
let pass=document.getElementById("regPass").value
let pass2=document.getElementById("regPass2").value
let captcha=document.getElementById("regCaptcha").value

let emailRegex=/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
let passRegex=/^(?=.*[0-9])(?=.*[@#$!]).{6,}$/

if(!emailRegex.test(email)){

alert("Correo inválido")
return

}

if(!passRegex.test(pass)){

alert("La contraseña necesita número y símbolo (@#$!)")
return

}

if(pass!==pass2){

alert("Las contraseñas no coinciden")
return

}

if(captcha!=="1234"){

alert("Código incorrecto")
return

}

usuarios.push({user,email,pass})

localStorage.setItem("usuarios",JSON.stringify(usuarios))

alert("Cuenta creada")

cerrarRegistro()

}

function login(){

let user=document.getElementById("loginUser").value
let pass=document.getElementById("loginPass").value

let encontrado=usuarios.find(u=>u.user===user && u.pass===pass)

if(!encontrado){

alert("Usuario incorrecto")
return

}

localStorage.setItem("usuarioActivo",JSON.stringify(encontrado))

location.reload()

}

function mostrarProductos(lista=productos){

catalogo.innerHTML=""

lista.forEach(p=>{

const div=document.createElement("div")

div.classList.add("product")

div.innerHTML=`

<img src="${p.imagen}">
<h3>${p.nombre}</h3>
<p>$${p.precio}</p>
<button onclick="agregarCarrito(${p.id})">Agregar</button>

`

catalogo.appendChild(div)

})

}

function agregarCarrito(id){

const producto=productos.find(p=>p.id===id)

carrito.push(producto)

localStorage.setItem("carrito",JSON.stringify(carrito))

actualizarCarrito()

}

function actualizarCarrito(){

carritoHTML.innerHTML=""

let total=0

carrito.forEach((p,i)=>{

let div=document.createElement("div")

div.innerHTML=`

${p.nombre} - $${p.precio}

<button onclick="eliminar(${i})">X</button>

`

carritoHTML.appendChild(div)

total+=p.precio

})

totalHTML.innerText="Total: $"+total

cartCount.innerText=carrito.length

}

function eliminar(i){

carrito.splice(i,1)

localStorage.setItem("carrito",JSON.stringify(carrito))

actualizarCarrito()

}

function toggleCart(){

document.getElementById("cartPanel").classList.toggle("hidden")

}

function comprar(){

if(!usuarioActivo){

alert("Debes iniciar sesión")

abrirLogin()

return

}

alert("Compra realizada gracias "+usuarioActivo.user)

carrito=[]

localStorage.removeItem("carrito")

actualizarCarrito()

}

function buscar(){

let texto=document.getElementById("buscador").value.toLowerCase()

let filtrados=productos.filter(p=>p.nombre.toLowerCase().includes(texto))

mostrarProductos(filtrados)

}

mostrarProductos()

actualizarCarrito()