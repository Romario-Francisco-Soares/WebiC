<template>
  <div id="cadastrosComponente">
    <div id="container">
      <h1>Clientes Cadastrados</h1>
      <div id="containerModal" v-show="mostrarModal">
        <modalcadastroscomponente
          @eventoFecharModal="fecharModal()"
          @eventoAdicionarCliente="adicionarCliente($event)"
          @eventoEditarCliente="editarCliente($event)"
        />
      </div>
      <div id="containerLinha">
        <pesquisarcomponente
          v-on:keyup.enter="filtrarCliente($event)"
          @eventoFiltrarCliente="filtrarCliente($event)"
        />

        <novocadastrocomponente @eventoAbrirModal="abrirModal()" />
      </div>
      <table>
        <thead>
          <tr>
            <p>Nome</p>
            <p>Idade</p>
            <p>Sexo</p>
            <p>Status</p>
            <p>Ações</p>
          </tr>
        </thead>
        <tbody>
          <td v-for="cliente in clientesVisiveis" :key="cliente.id">
            <tr>
              <p>{{ cliente.nome }}</p>
              <p>{{ cliente.idade }}</p>
              <p>{{ cliente.sexo }}</p>
              <p>{{ cliente.status }}</p>
              <div id="btnAcoes">
                <button @click="exibirClienteModal(cliente)">
                  <img src="../assets/lapisicone.svg" />
                  <p>Editar</p>
                </button>
                <button @click="excluirCliente(cliente)">
                  <img src="../assets/lixeiraicone.svg" />
                  <p>Excluir</p>
                </button>
              </div>
            </tr>
          </td>
          <tr
            id="erroEncontrarCliente"
            v-show="clientesVisiveis == 0"
          >Cliente não encontrado, verifique o nome pesquisado</tr>
        </tbody>
        <tfoot>
          <paginacaocomponente @eventoMudarPagina="mudarPagina($event)" />
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script src="./cadastros-arquivos/CadastrosComponente.js" />

<style src="./cadastros-arquivos/CadastrosComponente.css" scoped />
