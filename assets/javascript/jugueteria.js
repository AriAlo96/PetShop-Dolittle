const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodJug: [],
      valueSearch:``,
      filtrados:[],
      carrito:[],
      cantidades:[],
      
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
      .then((respuesta) => respuesta.json())
      .then((info) => {
        this.productos = info;
        this.prodJug = this.productos.filter(
          (producto) => producto.categoria === "jugueteria"
        );
        this.filtrados = this.prodJug
        console.log(this.productos);
        console.log(this.prodJug);

        
        this.carrito = JSON.parse(localStorage.getItem("carrito")) || []
        console.log(this.carrito)

       JSON.stringify(this.carrito)
       console.log(this.carrito)

       
      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtroSearch() {
      this.filtrados = this.prodJug.filter(producto =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      )},

      addCar(producto){
        if(!this.carrito.includes(producto._id) ){
          this.carrito.push(producto)
          localStorage.setItem("carrito",JSON.stringify(this.carrito))
        }

        this.cantidades.push(1)
        console.log(this.carrito)
      },

      sacarCar(producto){ 
        console.log(producto)
        this.carrito = this.carrito.filter( productos => productos != producto)
        localStorage.setItem("carrito",JSON.stringify(this.carrito)) 
         
       }
       

  },
}).mount("#app");
