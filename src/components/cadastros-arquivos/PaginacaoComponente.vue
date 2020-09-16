<template>
  <div id="paginacaocomponente">
    <button @click="voltarPagina()">Ant</button>
    <li>{{ paginaAtual }} de {{ totalPaginas() }}</li>
    <button @click="proximaPagina()">Prox</button>
  </div>
</template>

<script>
import { bus } from "../../main";

export default {
  name: "paginacaocomponente",
  data() {
    return {
      tamanhoPagina: 3,
      numeroPagina: 0,
      paginaAtual: 1,
      totalClientes: 1,
    };
  },
  methods: {
    totalPaginas() {
      if (this.totalClientes == 1) {
        return 1;
      } else {
        return Math.ceil(this.totalClientes / this.tamanhoPagina - 1);
      }
    },
    voltarPagina() {
      if (this.numeroPagina > 0) {
        this.numeroPagina -= 1;
        this.paginaAtual -= 1;
        this.$emit("eventoMudarPagina", this.numeroPagina);
      }
    },
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas()) {
        this.numeroPagina += 1;
        this.paginaAtual += 1;
        this.$emit("eventoMudarPagina", this.numeroPagina);
      }
    },
  },
  mounted() {
    bus.$on("eventoTotalClientes", (tamanhoArray) => {
      this.totalClientes = tamanhoArray;
    });
    bus.$on("paginaClientePesquisado", (data) => {
      this.paginaAtual = data;
      this.numeroPagina = 0;
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");

* {
  font-family: "Work Sans", sans-serif;
  font-size: 1.1rem;
}

li {
  list-style-type: none;
  color: #333;
}

div {
  display: flex;
  width: 20%;
  height: 45px;
  justify-content: space-around;
  align-items: center;
  border-radius: 7px;
  box-shadow: 0px 0px 3px 0.1px #22222247;
  background-color: none;
}

button {
  background: none;
  border: none;
  padding: 10px;
  color: #333;
}

button:hover {
  cursor: pointer;
}
</style>
