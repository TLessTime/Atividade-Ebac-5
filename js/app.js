import { Cliente, ClienteService } from "./classes.js";
import { validarEmail, renderizarClientes } from "./utils.js";

const API_URL = "https://www.crudcrud.com/api/SEU_ID_UNICO"; // <-- substitua aqui
const service = new ClienteService(API_URL);

const formCadastro = document.getElementById("form-cadastro");
const listaClientes = document.getElementById("lista-clientes");

// Função para atualizar lista
async function atualizarLista() {
  try {
    const clientes = await service.listar();
    renderizarClientes(clientes, listaClientes, excluirCliente);
  } catch (error) {
    console.error(error);
    listaClientes.innerHTML = "<li>Erro ao carregar clientes.</li>";
  }
}

// Cadastrar cliente
formCadastro.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!validarEmail(email)) {
    alert("Digite um e-mail válido!");
    return;
  }

  try {
    const cliente = new Cliente(nome, email);
    await service.cadastrar(cliente);
    formCadastro.reset();
    atualizarLista();
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar cliente.");
  }
});

// Excluir cliente
async function excluirCliente(id) {
  if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
  try {
    await service.excluir(id);
    atualizarLista();
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir cliente.");
  }
}

// Inicialização
atualizarLista();
