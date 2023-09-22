const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodJug: [],
      valueSearch:``,
      filtrados:[],
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
      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtroSearch() {
      this.filtrados = this.prodJug.filter(producto =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      );
    },
  },
}).mount("#app");
