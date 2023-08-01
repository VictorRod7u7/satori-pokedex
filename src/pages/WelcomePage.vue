<template>
  <img class="imgLogo" alt="Vue logo" src="../assets/SatoriLogo.jpg" />

  <!-- Mensaje de bienvenida -->

  <div class="hello mt-4">
    <h2>Prueba Técnica Satori Tech</h2>

    <!-- div con botón para usar vue-router y redirigir al pokedex-->
    <div>
      <br />
      <router-link to="/pokedex" class="btn btn-primary mt-5 txtB">
        <img src="../assets/pokemonC.png" alt="" class="imgStyle" />
        Mostrar Pokémon
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.txtB {
  color: white;
}

.imgStyle {
  width: 70px;
  height: 70px;
}
</style>
