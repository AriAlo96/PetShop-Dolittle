const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodFarm: [],
      valueSearch:``,
      filtrados:[],
      carrito:[]
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
        this.filtrados = this.prodFarm
        console.log(this.productos);
        console.log(this.prodFarm);

        this.carrito = JSON.parse(localStorage.getItem("carrito")) || []
        console.log(this.carrito)

       JSON.stringify(this.carrito)
       console.log(this.carrito)

      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtroSearch() {
      this.filtrados = this.prodFarm.filter(producto =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      )},

      addCar(producto){
        if(!this.carrito.includes(producto._id) ){
          this.carrito.push(producto)
          localStorage.setItem("carrito",JSON.stringify(this.carrito))
        }
        console.log(this.carrito)
      },

      sacarCar(producto){ 
        console.log(producto)
        this.carrito = this.carrito.filter( productos => productos != producto)
        localStorage.setItem("carrito",JSON.stringify(this.carrito)) 
         
       }
  },
}).mount("#app");
