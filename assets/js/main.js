/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== POPULAR SWIPER ===============*/
let swiperPopular = new Swiper(".popular__container", {
    loop: true,
    spaceBetween: 10,
    slidesPerview: 2,
    grabCursor: true,

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
       
        768: {
          slidesPerView: 3,
        },
        1024: {
            slidesPerView: 'auto',  
          spaceBetween: 48,
        },
    },
  });
 
/*=============== MIXITUP FILTER FEATURED ===============*/
let mixerFeatured = mixitup('.featured__content', {
    selectors: {
        target: '.featured__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active featured */ 
const linkFeatured = document.querySelectorAll('.featured__item')
function activeFeatured(){
    linkFeatured.forEach(l=> l.classList.remove('active-featured'))
    this.classList.add('active-featured')
}
linkFeatured.forEach(l=> l.addEventListener(  'click',activeFeatured  ))

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
       const sections = document.querySelectorAll('section[id]')

       function scrollActive(){
           const scrollY = window.pageYOffset
       
           sections.forEach(current =>{
               const sectionHeight = current.offsetHeight,
                     sectionTop = current.offsetTop - 58,
                     sectionId = current.getAttribute('id')
       
               if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                   document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
               }else{
                   document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
               }
           })
       }
       window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION -- animaciones de la pagina ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,

})

sr.reveal(`.home__title, .popular__container, .features__img, .featured__filters`)
sr.reveal(`.home__subtitle`, {delay: 500})
sr.reveal(`.home__elec`, {delay: 600})
sr.reveal(`.home__img`, {delay: 800})
sr.reveal(`.home__car-data`, {delay: 900, interval: 100, origin: 'bottom'})
sr.reveal(`.home__button`, {delay: 1000,  origin: 'bottom'})
sr.reveal(`.about__group, .offer__data`, { origin: 'left'})
sr.reveal(`.about__data, .offer__img`, { origin: 'right'})
sr.reveal(`.features__map`, {delay:600, origin: 'bottom'})
sr.reveal(`.features__card`, { interval: 300})
sr.reveal(`.featured__card, .logos__content`, { interval: 100})






//Logica para el carrito
let productosCarrito = [];


/** funcion que muestra u oculta carrito*/
let btn_cart = document.getElementById('btnCart');
let hide_cuadritoCar = document.getElementById('cuadrito'); 
btn_cart.addEventListener('click', toggleCart);
function toggleCart() {
    hide_cuadritoCar.classList.toggle('mostrarCuadritoCart');
}


const carrito = document.querySelector('#cuadrito');

const listaCarrito = document.querySelector('#lista_carrito tbody');

const btnVaciar = document.querySelector('#vaciar_carrito');

const listaAutos = document.querySelector('#featured');

cargarEventListeiner();

function cargarEventListeiner(){
    listaAutos.addEventListener('click', agregarProducto);

    //Elimina un curso
    carrito.addEventListener('click', elimina_ONE_Producto);

    //vacia carrito
    btnVaciar.addEventListener('click', () => {
        productosCarrito = []; //reseteado
        limpiarHTML();
        sincronizarLocalStorage();
    });

    //localstorage
    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });
}


//subfunciones

function elimina_ONE_Producto(e){
    if (e.target.classList.contains('bx','bx-x-circle')){
        
        const idAuto =  e.target.getAttribute('data-id');

        //si hay coincidencia lo elimina del array
        productosCarrito = productosCarrito.filter(auto => auto.id !== idAuto);
        //vuelve a imprimir el array
        carritoHTML();
        
    }
}


function agregarProducto(e){
    e.preventDefault();
    if (e.target.classList.contains('bx','bx-cart-add') ){
        autoSeleccionado = e.target.parentElement.parentElement; 
        //console.log(e.target.parentElement.parentElement);
        leerDatosAuto(autoSeleccionado);
    }
    
}

function leerDatosAuto(p_auto){
    //objeto
    infoAuto={
       id: p_auto.querySelector('.featured__button').getAttribute('data-id'),
       marca: p_auto.querySelector('h1').textContent,
       modelo: p_auto.querySelector('h3').textContent,
       precio: p_auto.querySelector('.featured__price').textContent,

       cantidad: 1
    }

    /**verifica primero si el producto ya se encuentra en el carrito (si esta solo aumenta cantidad)*/
    const existe = productosCarrito.some(p_auto => p_auto.id == infoAuto.id);
    
    if (existe){
        //map busca coincidencia dentro del array
        const losAutos = productosCarrito.map(p_auto =>{
            if (p_auto.id == infoAuto.id){
                p_auto.cantidad++
                return p_auto;
            }else return p_auto
        } );
         //... significa q se carga de manera progresiva
         productosCarrito = [... losAutos]
    }else{
         //... significa que cargque el arreglo de manera progresiva
         productosCarrito = [... productosCarrito, infoAuto]
    }



   
    
    carritoHTML();
}

function carritoHTML(){
    //para q no se muestren progresivamente (debe ser progresivo antes, porq es la manera de mostrar)
    limpiarHTML();
    productosCarrito.forEach(e =>{
        const row = document.createElement('tr');

        row.innerHTML = 
        `
            <th>${e.marca}</th>
            <th>${e.modelo}</th>                
            <th>${e.precio}</th>    
            <th>${e.cantidad}</th>
            <th><i class='bx bx-x-circle' data-id="${e.id}"></i></th>  
            
        `;

        //se grega dinamicamente esa ifno al carrito
        listaCarrito.appendChild(row);
    });

    //se guarda la info del carrito en el local storage
    sincronizarLocalStorage();
}

function limpiarHTML(){
    
    while (listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    //listaCarrito.innerHTML = "";
}

function sincronizarLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}