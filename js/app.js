//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = []; //el array va vacío para poder hacer la compra 


cargarEventListeners();

function cargarEventListeners() {
     // colocar el curso al hacer click en "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     //muestra los cursos del localstorage
     document.addEventListener('DOMContentLoaded', () =>{
          articulosCarrito = JSON.parse(localStorage.getItem('carrito')) ||[];
          carritoHTML();
     });

     // vacia el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}




// Función añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
    
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }

        //revisa si el elemento ya existte en el carrito
     //if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
         const existe = articulosCarrito.some( curso => curso.id == infoCurso.id );
        //actualiza la cantidad de cursos en el carrito  
        if (existe){
        const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++; //acumulador
                     return curso;//retorna el objeto actualizado
                } else {
                     return curso;//retorna los objetos que no son duplicados
             }
          })
          //agrega elementos al carrito
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)
    

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     
     if(e.target.classList.contains('borrar-curso') ) {
         //obtenemos el id del curso a eliminar
          const cursoId = e.target.getAttribute('data-id')
          // Elimina del arreglo de articuloCarrito por el data id
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();//iterar sobre el carrito y mostrar su HTML
     }
}


// Muestra el curso en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const{ imagen, titulo, precio, cantidad, id } = curso;
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${imagen}" width=100>
               </td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad} </td>
               <td>
                 <a href="#" class="borrar-curso" data-id="${id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     //agregar el carrito de compras al storage
     sincronizarStorage();

}


function sincronizarStorage(){
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta para eliminar lo que tenga el carrito
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     //aca cuando el carrito tenga algo dentro se ejecuta
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}