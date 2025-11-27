# Image Carousel System Design

## **Question**

Design an image carousel component that displays a list of images one at a time, allowing the user to browse through them with pagination buttons.

### **How are the images specified?**

It will be a configuration option on the component and the list of images have to be specified before initializing the component.

### **What devices should the component support?**

Desktop, tablet, and mobile.

### **How will the pagination buttons behave when the user is at the start/end of the image list?**

It should cycle through infinitely.

### **Will there be animation when transitioning between images?**

Yes the images should animate with horizontal translation.

## Solution

<img width="894" height="655" alt="image" src="https://github.com/user-attachments/assets/e839f368-ad79-4b48-a38d-eff2621ba83d" />


Manejamos multiples partes en nuestra solucion:

- **View model**: contiene toda la logica y manejos de estado, funcionando como el core de nuestro componente.

- **Image**: muestra la imagen seleccionada.

- **prev/next buttons**: Se comunica con el view model para indicar si ir a la siguiente imagen o volver a la anterior.

- **Dots pagination**: Se comunica con el view model para indicar en que pagina estamos y que pagina fue clickeada.

## Data model

Solamente el view model contendra la logica del manejo de estados y data, ningun otro componente o parte del carousel contendra data y son parte de la view.

El data model puede contener los siguientes campos:

- **Configuration**: una lista de imagenes con la url y el alt value, la transicion y el size de la imagen.

- **State**: el index de la imagen actual y la posibilidad de modificarlo mediante los buttons.

## Interface definition (API)

Cuando nos referimos a API en este caso hablamos de las opciones/configuraciones que son pasadas al componente para ser customizado.

Una api basica puede ser la siguiente:

- Image list
- Transition duration
- Height
- Width

y lo visualizariamos de la sigueinte manera:

```jsx
<ImageCarousel
  images={[
    { src: "https://example.com/images/foo.jpg", alt: "A foo" },
    { src: "https://example.com/images/bar.jpg", alt: "A bar" },
  ]}
  transitionDuration={300}
  height={500}
  width={800}
/>
```

Una api mas avanzada puede presentar opciones como por ejemplo:

- Autoplay
- Delay
- Event listeners (onLoad, onPageSelect, onNextClick, onPrevClick).
- theming
- loop

Luego tenemos la API interna que seria la siguiente:

- `prevImage()`: muestra la imagen previa.
- `nextImage()`: muestra la siguiente imagen.
- `showImage(index)`: muestra una imagen especifica.

lo importante de que estos comportamientos esten encapsulados en una api interna es por que pueden ser llamados desde multiples lugares (elementos de UI o timers por ejemplo) y pueden contener un agregado de logica dependiendo de donde estos se utilicen.

Una practica interesante es que estas APIs internas pueden ser implementadas como acciones de Redux/Flux y usar dichas arquitecturas (no siempre es necesario).

## **Optimizations and deep dive**

Aqui tenemos que decidir y dibujar como sera el layout en nuestro caso sera un layout horizontal con un scroll offset de 600px aprox.

![image.png](attachment:4aa8a978-fa54-4dbf-9633-59ae2522d2b5:image.png)

Aqui pese a que luce simple no lo es tanto, debemos tener en cuenta que pueden surgir problematicas repentinas como por ejemplo que las imagenes tengan diferentes sizes, y esto tiene un work-around, mediante CSS nosotros podemos en lugar de usar la etiqueta img dar uso a la proprty background-image permitiendonos moldear la imagen con contain o cover.

_Source: [**background-size - CSS: Cascading Style Sheets | MDN**](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)_

Estas dos opciones previas tienen sus pros y contras pero si indagamos un poco mas encontraremos la property object-fit la cual a su vez contiene contain y cover y trabaja con las etiquetas image y video, este camino es el elegido por excelencia ya que es 100 veces mas semantico que usar un div y ponerle una imagen

### Vertically-center buttons

tomemos esto con simpleza, se puede resolver con un position absolute y un transform: translateY(-50%) y seria suficiente.

## User Experience

La experiencia de usuario al hacer el design de estos componentes deja de ser negociable, debemos tener en cuenta ciertos factores como por ejemplo:

- **scroll snapping**: habilitamos la barra de scroll horizontal para no bloquear a usuarios en diversos dispositivos o con alguna discapacidad.

- **interactive elements should be larger enough**: los botones de prev/next y paginado deben poseer un rango clickeable lo suficientemente grande para el usuario almenos deben tener 44px de alto y ancho

- **Redesign prev/next buttons**: si se busca una navegacion rapida quiza lo mejor es tener estos botones juntos.

## Performance

La performance es crucial, y mas en estos casos donde debemos hacer el design escalable y funcional por ello las imagenes que no esten en pantalla NO deben ser cargadas, esto puede lograrse de forma simple:

```jsx
<img loading="lazy"> //con esta etiqueta cargaremos de forma perezosa las imagenes
```

Otra tecnica muy usada es el preloading en el que se pre-cargan las posibles siguientes imagenes con el siguiente codigo:

```jsx
const preloadImage = new Image();
preloadImage.src = url;
```

**Pero cual es la mejor tecnica?**

Ni una ni otra sino una combinacion de ambas, la mejor experiencia de usuario es aquella que se adapta a lo que el usuario necesita a medida que utiliza nuestros componentes, Airbnb por ejemplo usa este patron hibrido:

- Al renderizar el componente solo carga la primer imagen (el resto es lazy)
- Si el usuario muestra intenciones de navegar como por ejemplo hace tab al button de next o hace hover sobre la imagen se hace un pre-load de las siguientes 3 imagenes.
- Si el usuario continua clickeando next se pre-cargan 3 imagenes mas.

Otro punto clave es la calidad de la imagen, no vamos o no debemos renderizar imagenes full HD en dispositivos que presenten una gran demanda en la carga de la misma, esto puede resolverse permitiendo al usuario proveer diferentes imagenes para los diferentes dispositivos usando la etiqueta picture o el atributo srcset en img

## Internacionalizacion y accesibilidad

En este componente la traduccion no es el core pero es importante para los botones accionables y sus respectivos aria-labels, a su vez todo lo correspondiente a adaptaciones mobiles como el scroll-snapping, las etiquetas para los screen readers y el soporte de atajos de teclado son importantes.
