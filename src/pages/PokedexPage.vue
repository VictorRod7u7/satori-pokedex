<template>
  <div class="d-flex justify-content-center">
    <div class="card divD">
      <img
        v-if="imagePokemon"
        :src="imagePokemon"
        class="card-img-top"
        :alt="`imagen del pokemon ${namePokemon}`"
      />

      <h5 class="card-title">{{ namePokemon }}</h5>
      <p class="card-text">
        <strong>Puntos de Vida:</strong> {{ hp }}
        <br />
        <strong>Ataque:</strong> {{ attack }}
        <br />
        <strong>Defensa:</strong> {{ defense }}
      </p>
      <a @click="getRandomPokemon" class="btn btn-dark">Random</a>
    </div>
  </div>

  <div class="d-flex justify-content-center mt-2">
    <p class="cronometro">{{ formattedTime }}</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      namePokemon: "",
      imagePokemon: null,
      hp: 0,
      attack: 0,
      defense: 0,
      counter: 30,
      intervalId: null,
      totalPokemonCount: 0,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.counter / 60);
      const seconds = this.counter % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  methods: {
    async fetchTotalPokemonCount() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        this.totalPokemonCount = response.data.count;
      } catch (error) {
        console.error("Error fetching total Pokémon count:", error);
      }
    },

    async getRandomPokemon() {
      try {
        // Generar un número aleatorio dentro del límite del total de Pokémon
        const randomOffset = Math.floor(Math.random() * this.totalPokemonCount);

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${randomOffset}`
        );

        const randomPokemon = response.data.results[0];
        this.namePokemon = randomPokemon.name;
        this.getPokemonDetails(randomPokemon.url);
        this.counter = 30; // Reiniciar el contador a 30 segundos
      } catch (error) {
        console.error("Error fetching random Pokémon:", error);
      }
    },

    async getPokemonDetails(url) {
      try {
        const response = await axios.get(url);
        this.imagePokemon = response.data.sprites.front_default;
        this.hp = response.data.stats.find(
          (stat) => stat.stat.name === "hp"
        ).base_stat;
        this.attack = response.data.stats.find(
          (stat) => stat.stat.name === "attack"
        ).base_stat;
        this.defense = response.data.stats.find(
          (stat) => stat.stat.name === "defense"
        ).base_stat;

        // Imprimir la información del Pokémon en la consola
        console.log("Información del Pokémon:", response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    },

    startTimer() {
      // Detener el intervalo anterior si existe
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      // Iniciar un nuevo intervalo
      this.intervalId = setInterval(() => {
        this.counter--;
      }, 1000);
    },
  },
  async mounted() {
    // Obtener el total de Pokémon disponibles en la API
    await this.fetchTotalPokemonCount();

    this.getRandomPokemon();
    this.startTimer();

    // Llamar a getRandomPokemon() y reiniciar el contador cada 30 segundos
    setInterval(() => {
      this.getRandomPokemon();
      this.startTimer();
    }, 30000);
  },
};
</script>

<style>
.divD {
  height: 290%;
  width: 16%;
  background-color: #2a363b;
  color: #e84a5f;
  font-weight: bold;
}

.cronometro {
  font-size: 18px;
  color: #e84a5f;
}
</style>
