const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodFarm: [],
      valueSearch:``,
      filtrados:[],
    };
  },
  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
      .then((respuesta) => respuesta.json())
      .then((info) => {
        this.productos = info;
        this.prodFarm = this.productos.filter(
          (producto) => producto.categoria === "farmacia"
        );
        this.filtrados = this.prodFarm
        console.log(this.productos);
        console.log(this.prodFarm);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtroSearch() {
      this.filtrados = this.prodFarm.filter(producto =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      );
    },
  },
}).mount("#app");
