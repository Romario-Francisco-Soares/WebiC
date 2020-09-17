<template>
  <div id="modalCadastroComponente">
    <div id="container">
      <input type="text" v-model="clienteEdicao.nome" placeholder="Nome" />
      <input type="number" v-model="clienteEdicao.idade" placeholder="Idade" />
      <select v-model="clienteEdicao.sexo">
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>
      <select v-show="editar" type="text" v-model="clienteEdicao.status">
        <option value="ativo">Ativo</option>
        <option value="dasativo">Dasativo</option>
      </select>
      <div id="btnAcoesModal">
        <button @click="fecharModal">Cancelar</button>
        <button v-show="!editar" @click="verificarPreenchimentoCampos">Cadastrar</button>
        <button v-show="editar" @click="editarCliente">Editar</button>
      </div>
      <span v-show="preenchimentoIncorreto">Por favor, verifique os campos</span>
    </div>
    <div id="backgroundModal" @click="fecharModal" />
  </div>
</template> 

<script>
import { bus } from "../../main";

export default {
  name: "modalcadastrocomponente",
  data() {
    return {
      cliente: {
        id: null,
        nome: null,
        idade: null,
        sexo: null,
        status: "ativo",
      },
      editar: false,
      clienteEdicao: "",
      preenchimentoIncorreto: false,
    };
  },
  methods: {
    inicializarArrays() {
      this.clienteEdicao = this.cliente;
    },
    atualizarArrayCliente() {
      this.cliente = this.clienteEdicao;
    },
    fecharModal() {
      this.$emit("eventoFecharModal");
      this.limpaCamposCliente();
      this.editar = false;
      this.preenchimentoIncorreto = false;
    },
    verificarPreenchimentoCampos() {
      if (
        this.clienteEdicao.nome == null ||
        this.clienteEdicao.idade == null ||
        this.clienteEdicao.sexo == null
      ) {
        this.preenchimentoIncorreto = true;
      } else {
        this.preenchimentoIncorreto = false;
        this.atualizarArrayCliente();
        this.adicionarCliente();
      }
    },
    adicionarCliente() {
      this.$emit("eventoAdicionarCliente", this.cliente);
      this.limpaCamposCliente();
    },
    editarCliente() {
      this.atualizarArrayCliente();
      this.$emit("eventoEditarCliente", this.cliente);
      this.limpaCamposCliente();
      this.editar = false;
    },
    limpaCamposCliente() {
      this.clienteEdicao = {
        id: null,
        nome: null,
        idade: null,
        sexo: null,
        status: "ativo",
      };
    },
  },
  created() {
    bus.$on("eventoProximoIdCliente", (novoIdCliente) => {
      this.clienteEdicao.id = novoIdCliente;
    });
    bus.$on("eventoExibirCliente", (cliente) => {
      this.clienteEdicao = cliente;
      this.editar = true;
    });
  },
  mounted() {
    this.inicializarArrays();
  },
};
</script>
<style scoped>
#container {
  display: flex;
  width: 550px;
  margin: 9vw auto;
  padding: 2%;
  flex-flow: column;
  box-sizing: border-box;
  border-radius: 10px;
  color: #333333;
  background-color: #fdfdfd;
  box-shadow: 0px 0px 5px 0.3px rgba(34, 34, 34, 0.415);
  transition: all 0.4s ease;
}
#container span {
  color: rgb(238, 90, 90);
  font-size: 1.2rem;
  margin: 10px auto 0 auto;
  text-align: center;
}
#backgroundModal {
  display: flex;
  width: 100%;
  height: 150%;
  margin-top: -700px;
  position: fixed;
  z-index: -1;
  background-color: #33333386;
}

input,
select,
option {
  width: 95%;
  height: 50px;
  margin: 0 auto 25px auto;
  padding: 0 20px;
  font-size: 1.2rem;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0.3px rgba(34, 34, 34, 0.3);
}

#btnAcoesModal {
  display: flex;
}

button {
  width: 47%;
  height: 50px;
  margin: 0 auto;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  background-color: rgb(69, 245, 190);
  box-shadow: 0px 0px 5px 0.3px rgba(34, 34, 34, 0.3);
  transition: all 0.4s ease;
}

button:hover {
  background-color: rgba(79, 245, 190, 0.8);
  cursor: pointer;
}
</style>