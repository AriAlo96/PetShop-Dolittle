const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodFarm: [],
      valueSearch:``,
      filtrados:[],
      carrito:[],
      stock:0,
      precioTotal:0,
 
    };
  },

  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
      .then((respuesta) => respuesta.json())
      .then((info) => {
        this.productos = info;
        this.prodFarm = this.productos.filter(
          (producto) => producto.categoria == "farmacia"
        );
        this.filtrados = this.prodFarm;
        console.log(this.productos);
        console.log(this.prodFarm);

        // local Storage
        this.carrito = JSON.parse(localStorage.getItem("carrito")) || []
        console.log(this.carrito)

       JSON.stringify(this.carrito)
       console.log(this.carrito)

      //     console.table(this.carrito)

      //  this.stock = this.prodFarm.map(elemento => elemento.disponibles - this.carrito)
      // console.log(this.stock)

      for (producto of this.carrito){
        console.log (producto)
        this.precioTotal += producto.precio

      }

      console.log(this.precioTotal)


        for (producto of this.carrito) {
          console.log(producto);
          this.precioIndividual += producto.precio;
        }
        console.log(this.precioIndividual);
      })
      .catch((err) => console.log(err));
  },
  methods:{
    filtroSearch() {
      this.filtrados = this.prodFarm.filter((producto) =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      )},

      addCar(producto){
        if(!this.carrito.includes(producto._id)){
          this.carrito.push(producto) 
          localStorage.setItem("carrito",JSON.stringify(this.carrito))
        }
        
        producto.disponibles -= 1
        this.precioTotal += producto.precio
           producto.disponibles
      },

      sacarCar(producto){ 
        // console.log(producto)
        
        // this.carrito = this.carrito.filter( productos => productos != producto)
        let indice = this.carrito.findIndex(productoCarrito => productoCarrito._id == producto._id )
          this.carrito.splice(indice, 1)

        // this.carrito = this.carrito.filter( productos => productos != producto)
  
        localStorage.setItem("carrito",JSON.stringify(this.carrito)) 
       
         producto.disponibles += 1
        this.precioTotal -= producto.precio
       }
  },
}).mount("#app");
