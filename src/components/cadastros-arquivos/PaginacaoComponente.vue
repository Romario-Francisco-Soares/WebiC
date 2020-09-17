<template>
  <div id="paginacaocomponente">
    <button @click="voltarPagina()">Ant</button>
    <li id="btnExibirPaginacao" @click="exibirPaginacaoMultipla()">
      {{ paginaAtual }}
      <ul :class="paginacaoMultipla" v-for="(pagina) in paginasMultiplas" :key="pagina.value">
        <li @click="irPaginaMultipa(pagina)">{{pagina}}</li>
      </ul>
    </li>
    <li>de</li>
    <li>{{ totalPaginas() }}</li>
    <button @click="proximaPagina()">Prox</button>
  </div>
</template>

<script>
import { bus } from "../../main";

export default {
  name: "paginacaocomponente",
  data() {
    return {
      tamanhoPagina: null,
      numeroPagina: 0,
      paginaAtual: 1,
      totalClientes: null,
      paginacaoMultipla: { exibir: false },
      paginasMultiplas: [1, 3, 6],
    };
  },
  methods: {
    totalPaginas() {
      if (this.totalClientes == 1) {
        return 1;
      } else {
        return Math.ceil(this.totalClientes / this.tamanhoPagina);
      }
    },
    voltarPagina() {
      if (this.numeroPagina > 0) {
        this.numeroPagina -= 1;
        this.paginaAtual -= 1;
        this.emitirNumeroPagina();
      }
    },
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas()) {
        this.numeroPagina += 1;
        this.paginaAtual += 1;
        this.emitirNumeroPagina();
      }
    },
    exibirPaginacaoMultipla() {
      this.paginacaoMultipla.exibir = !this.paginacaoMultipla.exibir;
    },
    irPaginaMultipa(pagina) {
      this.paginaAtual = pagina;
      this.numeroPagina = pagina - 1;
      this.emitirNumeroPagina();
    },
    emitirNumeroPagina() {
      this.$emit("eventoMudarPagina", this.numeroPagina);
    },
    /*
    atualizarArrayPaginasMultiplas() {
      let b = Math.ceil(this.totalClientes / this.tamanhoPagina);
      alert(b);
      for (let a = 1; a <= b; ) {
        a + 3;
        this.paginasMultiplas.push(a);
      }
    }*/
  },
  mounted() {
    bus.$on("eventoTotalClientes", (tamanhoArray) => {
      this.totalClientes = tamanhoArray;
      // this.atualizarArrayPaginasMultiplas();
    });
    bus.$on("paginaClientePesquisado", (data) => {
      this.paginaAtual = data;
      this.numeroPagina = 0;
    });
    bus.$on("eventoTamanhoPagina", (tamanhoPagina) => {
      this.tamanhoPagina = tamanhoPagina;
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

#paginacaocomponente {
  display: flex;
  width: 25%;
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

li {
  list-style-type: none;
  color: #333;
}
#btnExibirPaginacao {
  width: 25px;
  height: 22px;
  padding: 3px;
  align-content: center;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0px 0px 2px 0.3px rgba(34, 34, 34, 0.5);
}
#paginacaocomponente li:first-child {
  width: 20px;
  padding: 6px;
  text-align: center;
  background-color: #fdfdfd;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0px 0px 2px 0.3px rgba(34, 34, 34, 0.5);
}
button:hover {
  cursor: pointer;
}

ul {
  display: none;
  position: relative;
  border-radius: 7px;
}

ul li {
  margin-top: -60px;
  margin-left: -3px;
}
.exibir {
  display: block;
}
@media screen and (min-width: 710px) and (max-width: 880px) {
  li {
    font-size: 1rem;
  }
  #paginacaocomponente {
    width: 35%;
  }
}
</style>
