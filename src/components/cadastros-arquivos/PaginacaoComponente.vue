<template>
  <div id="paginacaocomponente">
    <button @click="voltarPagina()">Ant</button>
    <li class="btnPaginacaoMultipla" @click="exibirPaginacaoMultipla()">{{ paginaAtual }}</li>
    <div :class="paginacaoMultipla">
      <li class="avancarMultipla btnPaginacaoMultipla" @click="ultimasOpcoesMultipas()">-</li>
      <ul v-for="(pagina) in opcoesPaginasVisiveis" :key="pagina.value">
        <li class="btnPaginacaoMultipla" @click="irPaginaMultipa(pagina)">{{pagina}}</li>
      </ul>
      <li class="avancarMultipla btnPaginacaoMultipla" @click="proximasOpcoesMultipas()">+</li>
    </div>

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
      paginacaoMultipla: { esconder: true, posicaoPaginacao: false },
      opcoesPaginasVisiveis: [],
      opcoesPaginas: [1, 3, 6, 9, 12, 15],
      paginaMultiplaAtual: 0,
      opacoesDisponiveis: 3,
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
    emitirNumeroPagina() {
      this.$emit("eventoMudarPagina", this.numeroPagina);
    },
    // Aqui começa as opões de Paginação Multiplas
    exibirPaginacaoMultipla() {
      this.paginacaoMultipla.esconder = !this.paginacaoMultipla.esconder;
      this.paginacaoMultipla.posicaoPaginacao = !this.paginacaoMultipla
        .posicaoPaginacao;
    },
    irPaginaMultipa(pagina) {
      this.paginaAtual = pagina;
      this.numeroPagina = pagina - 1;
      this.emitirNumeroPagina();
    },
    ultimasOpcoesMultipas() {
      if (this.paginaMultiplaAtual > 0) {
        this.paginaMultiplaAtual -= 1;
        this.mostrarOpcoesMultipas();
      }
    },
    proximasOpcoesMultipas() {
      if (
        this.paginaMultiplaAtual <
        Math.ceil(this.opcoesPaginas.length / this.opacoesDisponiveis)
      ) {
        this.paginaMultiplaAtual += 1;
        this.mostrarOpcoesMultipas();
      }
    },
    mostrarOpcoesMultipas() {
      this.opcoesPaginasVisiveis = this.opcoesPaginas.slice(
        this.paginaMultiplaAtual * this.opacoesDisponiveis,
        this.paginaMultiplaAtual * this.opacoesDisponiveis +
          this.opacoesDisponiveis
      );
    },
    /*
    atualizarArrayopcoesPaginas() {
      let b = Math.ceil(this.totalClientes / this.tamanhoPagina);
      alert(b);
      for (let a = 1; a <= b; ) {
        a + 3;
        this.opcoesPaginas.push(a);
      }
    }*/
  },
  mounted() {
    bus.$on("eventoTotalClientes", (tamanhoArray) => {
      this.totalClientes = tamanhoArray;
    });
    bus.$on("paginaClientePesquisado", (data) => {
      this.paginaAtual = data;
      this.numeroPagina = 0;
    });
    bus.$on("eventoTamanhoPagina", (tamanhoPagina) => {
      this.tamanhoPagina = tamanhoPagina;
    });
    this.mostrarOpcoesMultipas();
    bus.$on("eventoPesquisaSemValor", (data) => {
      this.paginaAtual = data;
      this.numeroPagina = 0;
      this.emitirNumeroPagina();
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
.btnPaginacaoMultipla {
  width: 25px;
  height: 20px;
  padding: 3px;
  align-content: center;
  text-align: center;
  position: static;
  cursor: pointer;
  border-radius: 3px;
  background-color: #fdfdfd;
  box-shadow: 0px 0px 2px 0.3px rgba(34, 34, 34, 0.5);
}
button:hover {
  cursor: pointer;
}
ul li,
.avancarMultipla {
  margin-top: -51px;
}
.posicaoPaginacao {
  display: flex;
  position: fixed;
  width: 170px;
  justify-content: space-around;
}
.esconder {
  display: none;
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
