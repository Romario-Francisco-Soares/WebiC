<template>
  <div id="pesquisarcomponente">
    <input type="text" v-model="valorPesquisado" placeholder="Filtrar Cliente" />
    <button @click="pesquisar">
      <img src="../../assets/procuraricone.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: "pesquisarcomponente",
  data() {
    return {
      valorPesquisado: null,
    };
  },
  methods: {
    pesquisar() {
      this.$emit("eventoFiltrarCliente", this.valorPesquisado);
    },
  },
};
</script>
<style scoped>
#pesquisarcomponente {
  display: flex;
  width: 60%;
  flex-flow: row nowrap;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 0.3px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
}

#pesquisarcomponente input {
  height: 55px;
  width: 80%;
  font-size: 1.5rem;
  padding: 0 30px;
  color: #333;
  border: none;
  border-radius: 10px 0px 0 10px;
}

::-webkit-input-placeholder {
  color: #2222223d;
}

:-moz-placeholder {
  color: #2222223d;
}

::-moz-placeholder {
  color: #2222223d;
}

:-ms-input-placeholder {
  color: #2222223d;
}

#pesquisarcomponente button {
  width: 15%;
  border: none;
  border-radius: 0px 10px 10px 0px;
  background-color: rgb(69, 245, 190);
}

#pesquisarcomponente button:hover {
  background-color: rgba(79, 245, 190, 0.8);
  cursor: pointer;
}

#pesquisarcomponente button img {
  width: 25%;
  margin-top: 5px;
}
</style>