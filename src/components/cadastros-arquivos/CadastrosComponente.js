import {
  bus
} from "../../main";
import novocadastrocomponente from "../cadastros-arquivos/NovoCadastroComponente.vue";
import modalcadastroscomponente from "../cadastros-arquivos/ModalCadastroComponente.vue";
import pesquisarcomponente from "../cadastros-arquivos/PesquisarComponente.vue";
import paginacaocomponente from "../cadastros-arquivos/PaginacaoComponente.vue";

export default {
  name: "cadastroscomponente",
  components: {
    novocadastrocomponente,
    modalcadastroscomponente,
    pesquisarcomponente,
    paginacaocomponente,
  },
  data() {
    return {
      clientes: [{
          id: 0,
          nome: "cliente1",
          idade: 41,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 1,
          nome: "cliente2",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 3,
          nome: "cliente3",
          idade: 25,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 4,
          nome: "cliente4",
          idade: 19,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 6,
          nome: "cliente5",
          idade: 21,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 5,
          nome: "cliente6",
          idade: 26,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 7,
          nome: "cliente7",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        }, {
          id: 8,
          nome: "cliente8",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        }, {
          id: 9,
          nome: "cliente9",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        }, {
          id: 10,
          nome: "cliente10",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        }, {
          id: 11,
          nome: "cliente10",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        },
      ],
      proximoId: 11,
      mostrarModal: false,
      clientesVisiveis: [],
      paginaAtual: 0,
      tamanhoPagina: 4,
    };
  },
  methods: {
    abrirModal() {
      this.mostrarModal = true;
      this.proximoIdCliente();
    },
    fecharModal() {
      this.mostrarModal = false;
    },
    excluirCliente(clienteData) {
      this.clientes = this.clientes.filter((cliente) => cliente != clienteData);
      this.mostrarTodosClientes();
    },
    editarCliente(data) {
      this.clientes = this.clientes.filter((cliente) => cliente != data);
      this.adicionarCliente(data);
      this.fecharModal();
      this.mudarPagina(2);
    },
    exibirClienteModal(cliente) {
      this.abrirModal();
      bus.$emit("eventoExibirCliente", cliente);
    },
    mudarPagina(numeroPagina) {
      this.paginaAtual = numeroPagina;
      this.mostrarTodosClientes();
    },
    proximoIdCliente() {
      this.proximoId += 1;
      bus.$emit("eventoProximoIdCliente", this.proximoId);
    },
    adicionarCliente(data) {
      this.clientes.push(data);
      this.mostrarTodosClientes()
    },
    mostrarTodosClientes() {
      this.clientesVisiveis = this.clientes.slice(
        this.paginaAtual * this.tamanhoPagina,
        this.paginaAtual * this.tamanhoPagina + this.tamanhoPagina,
        bus.$emit('eventoTotalClientes', this.clientes.length));
    },
    mostrarClienteFiltrado(data) {
      this.clientesVisiveis = this.clientes.filter(
        (cliente) => cliente.nome == data,
        bus.$emit('eventoTotalClientes', 1),
        bus.$emit('paginaClientePesquisado', 1));
    },
    filtrarCliente(data = null) {
      if (data == "" || data == " " || data == null) {
        this.mostrarTodosClientes()
      } else {
        this.mostrarClienteFiltrado(data)
      }
    }
  },
  mounted() {
    this.mostrarTodosClientes();
    bus.$emit('eventoTotalClientes', this.clientes.length)
  }
};