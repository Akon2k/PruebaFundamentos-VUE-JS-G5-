<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6 my-5 pt-5"></div>
        <h1>
          LO SIENTO LA PIZZA SE LA COMIEROM, POR ESO NO SE HA ENCONTRADO :)
        </h1>
        <h2>Estamos trabajando prontamente, para pillar la pizza</h2>
        <img v-bind="pizzaerror" alt="CajaPizza" />
      </div>
    </div>
  </div>
</template>

<script>
// assets
import pizza404 from "@/assets/img/caja-pizza.jpg";

export default {
  name: "404",
  data() {
    return {
  pizzaerror: pizza404,
    };
  },
};
</script>
