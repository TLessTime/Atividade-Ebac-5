// Substitua pela URL da sua API CrudCrud
const API_URL = 'https://www.crudcrud.com/api/SEU_ID_UNICO'; // <-- MUDE AQUI!

const formCadastro = document.getElementById('form-cadastro');
const listaClientes = document.getElementById('lista-clientes');

// --- Função para Cadastrar Cliente ---
formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const novoCliente = {
        nome: nome,
        email: email
    };

    try {
        const response = await fetch(API_URL + '/clientes', { // Assumindo um endpoint '/clientes'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
        });

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar cliente: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Cliente cadastrado:', data);
        alert('Cliente cadastrado com sucesso!');
        formCadastro.reset(); // Limpa o formulário
        listarClientes(); // Atualiza a lista
    } catch (error) {
        console.error('Falha ao cadastrar cliente:', error);
        alert('Falha ao cadastrar cliente. Verifique o console para mais detalhes.');
    }
});

// --- Função para Listar Clientes ---
async function listarClientes() {
    try {
        const response = await fetch(API_URL + '/clientes');

        if (!response.ok) {
            throw new Error(`Erro ao listar clientes: ${response.statusText}`);
        }

        const clientes = await response.json();
        console.log('Clientes recebidos:', clientes);

        listaClientes.innerHTML = ''; // Limpa a lista atual

        if (clientes.length === 0) {
            listaClientes.innerHTML = '<li>Nenhum cliente cadastrado ainda.</li>';
            return;
        }

        clientes.forEach(cliente => {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `
                <strong>${cliente.nome}</strong> (${cliente.email})
                <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
            `;
            listaClientes.appendChild(itemLista);
        });

    } catch (error) {
        console.error('Falha ao listar clientes:', error);
        listaClientes.innerHTML = '<li>Erro ao carregar clientes.</li>';
    }
}

// --- Função para Excluir Cliente ---
async function excluirCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/clientes/${id}`, { // Usa o ID no endpoint
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir cliente: ${response.statusText}`);
        }

        console.log(`Cliente com ID ${id} excluído.`);
        alert('Cliente excluído com sucesso!');
        listarClientes(); // Atualiza a lista após a exclusão
    } catch (error) {
        console.error(`Falha ao excluir cliente ${id}:`, error);
        alert('Falha ao excluir cliente. Verifique o console.');
    }
}

// --- Carregar a lista de clientes ao iniciar a página ---
window.onload = listarClientes;
