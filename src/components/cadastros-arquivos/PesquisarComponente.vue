<template>
  <div id="pesquisarcomponente">
    <input type="text" v-model="valorPesquisado" placeholder="Filtrar Cliente" />
    <button @click="verificarValorPesquisado(valorPesquisado)">
      <img src="../../assets/procuraricone.svg" />
    </button>
  </div>
</template>

<script>
import { bus } from "../../main";
export default {
  name: "pesquisarcomponente",
  data() {
    return {
      valorPesquisado: null,
    };
  },
  methods: {
    verificarValorPesquisado(data) {
      if (data == "" || data == " " || data == null) {
        bus.$emit("eventoPesquisaSemValor", 1);
      } else {
        this.pesquisarValor();
      }
    },
    pesquisarValor() {
      this.$emit("eventoFiltrarCliente", this.valorPesquisado);
    },
  },
};
</script>
<style scoped>
#pesquisarcomponente {
  display: flex;
  width: 60%;
  height: 50px;
  flex-flow: row nowrap;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 0.3px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
}

#pesquisarcomponente input {
  width: 80%;
  font-size: 1.2rem;
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
  width: 20%;
  border: none;
  border-radius: 0px 10px 10px 0px;
  background-color: rgb(69, 245, 190);
  transition: all 0.4s ease;
}

#pesquisarcomponente button:hover {
  background-color: rgba(79, 245, 190, 0.8);
  cursor: pointer;
}

#pesquisarcomponente button img {
  width: 25px;
  margin-top: 5px;
}
@media screen and (min-width: 710px) and (max-width: 880px) {
  #pesquisarcomponente {
    height: 45px;
  }
  #pesquisarcomponente button img {
    width: 20px;
  }
  #pesquisarcomponente button {
    width: 25%;
  }
  #pesquisarcomponente input {
    font-size: 1rem;
  }
}
</style>