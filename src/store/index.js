import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productos: [],
    carrito: [],
    ventas: [],
  },
  getters: {
    cantidadCarrito(state) {
      return state.carrito.length;
    },
    productosFiltrados(state) {
      // Obtener solamente los productos con stock mayor a cero.
      const productos = state.productos.filter((pizza) => pizza.stock > 0);
      return !productos ? [] : productos;
    },
    totalCarrito(state) {
      const carrito = state.carrito;
      if (carrito.length === 0) return 0;
      const suma = carrito.reduce((acc, x) => acc + x.subtotal, 0);
      return suma;
    },
  },
  mutations: {
    cargarData(state, payload) {
      state.productos = payload;
    },
    agregarPizza(state, payload) {
      const agregar = payload.id;
      const cantidad = 1;
      const nombre = payload.nombre;
      const precio = payload.precio;
      const subtotal = precio * cantidad;

      const finder = state.carrito.find((obj) => obj.id === agregar);

      if (!finder) {
        const obj = {
          id: agregar,
          cantidad,
          nombre,
          precio,
          subtotal,
        };
        state.carrito.push(obj);
      } else {
        finder.cantidad = cantidad + finder.cantidad;
        finder.subtotal = finder.cantidad * precio;
      }
    },
    comprar(state) {
      const respuesta = confirm("¿Quieres comprar ahora?");
      const current = new Date();
      const date =
        current.getDate() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getFullYear();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      const dateTime = date + " " + time;

      // La venta debe ser un objeto que tenga las siguientes propiedades:
      // ID, Nombre, Precio Subtotal, Cantidad Vendida.
      if (respuesta) {
        //const venta = state.carrito.map((obj) => {
        // Cantidad, ID, Precio, Nombre, Subtotal
        //const obj2 = {
        //id: obj.id,
        //nombre: obj.nombre,
        //precioSubtotal: obj.subtotal,
        //cantidadVendida: obj.cantidad,
        //fechaventa: dateTime,
        //};
        //return obj2;
        //});

        //state.ventas = venta;

        state.carrito.forEach((x) => {
          const pizza = state.productos.find((pz) => pz.id === x.id);
          if (pizza) {
            const venta = {
              id: x.id,
              nombre: x.nombre,
              precioSubtotal: x.subtotal,
              cantidadVendida: x.cantidad,
              fechaventa: dateTime,
            };
            state.ventas.push(venta);
          }
        });

        // Descontar el stock en el arreglo productos según
        // la cantidad en el carrito.
        state.productos.forEach((producto) => {
          const id = producto.id;
          state.carrito.forEach((el) => {
            if (el.id === id) {
              producto.stock = producto.stock - el.cantidad;
              if (producto.stock < 1) producto.stock = 0;
            }
          });
        });

        // Borra el carrito de compras una vez confirmada la compra.
        state.carrito = [];
      }
    },
  },
  actions: {
    async getData({ commit }) {
      const url =
        "https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria";
      try {
        const req = await axios(url);
        const pizzas = req.data;
        const pizzasStock = pizzas.map((obj) => {
          obj.stock = 10;
          return obj;
        });
        commit("cargarData", pizzasStock);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
