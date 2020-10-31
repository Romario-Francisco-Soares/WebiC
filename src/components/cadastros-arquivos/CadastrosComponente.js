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
          nome: "Kaleb",
          idade: 41,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 1,
          nome: "augusto",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 3,
          nome: "Ricardo",
          idade: 25,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 4,
          nome: "Fernanda",
          idade: 19,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 6,
          nome: "joana",
          idade: 21,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 5,
          nome: "Diego",
          idade: 26,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 7,
          nome: "Alexandra",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 8,
          nome: "Tamires",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 9,
          nome: "Carol",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        },
        {
          id: 10,
          nome: "Francilis",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        },
        {
          id: 11,
          nome: "Brian",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        }, {
          id: 12,
          nome: "Amanda",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        }, {
          id: 13,
          nome: "Daiane",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        }, {
          id: 14,
          nome: "Pedro",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        }, {
          id: 15,
          nome: "Batista",
          idade: 22,
          sexo: "masculino",
          status: "ativo",
        }, {
          id: 16,
          nome: "Carla8",
          idade: 21,
          sexo: "feminino",
          status: "ativo",
        }, {
          id: 17,
          nome: "Thaiane2",
          idade: 26,
          sexo: "masculino",
          status: "ativo",
        }, {
          id: 18,
          nome: "Karoline10",
          idade: 23,
          sexo: "feminino",
          status: "ativo",
        },
      ],
      proximoId: 11,
      mostrarModal: false,
      clientesVisiveis: [],
      paginaAtual: 0,
      tamanhoPagina: 5,
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
      this.adicionarCliente(data);
      this.fecharModal();
    },
    exibirClienteModal(cliente) {
      bus.$emit("eventoExibirCliente", cliente);
      this.excluirCliente(cliente);
      this.abrirModal();
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
    bus.$emit('eventoTotalClientes', this.clientes.length);
    bus.$emit('eventoTamanhoPagina', this.tamanhoPagina);
  }
};