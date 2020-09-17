<template>
  <div id="novocadastrocomponente">
    <button @click="abrirModal()">Novo Cadastro</button>
  </div>
</template>

<script>
export default {
  name: "novocadastrocomponente",
  methods: {
    abrirModal() {
      this.$emit("eventoAbrirModal");
    },
  },
};
</script>
<style scoped>
#novocadastrocomponente {
  width: 20%;
}

button {
  width: 100%;
  height: 50px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  color: #444;
  font-weight: 500;
  background-color: rgb(69, 245, 190);
  box-shadow: 0px 0px 5px 0.3px rgba(34, 34, 34, 0.3);
  transition: all 0.4s ease;
}

button:hover {
  background-color: rgba(79, 245, 190, 0.8);
  cursor: pointer;
}
@media screen and (min-width: 710px) and (max-width: 880px) {
  #novocadastrocomponente button {
    height: 45px;
    font-size: 1rem;
  }
}
</style>