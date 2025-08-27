// Função pura para validar email
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Atualizar lista de clientes no DOM
export function renderizarClientes(clientes, listaEl, handleExcluir) {
  listaEl.innerHTML = "";

  if (clientes.length === 0) {
    listaEl.innerHTML = "<li>Nenhum cliente cadastrado ainda.</li>";
    return;
  }

  clientes
    .map(cliente => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${cliente.nome}</strong> (${cliente.email})
        <button data-id="${cliente._id}">Excluir</button>
      `;
      return item;
    })
    .forEach(item => {
      listaEl.appendChild(item);
    });

  // Adiciona evento nos botões
  listaEl.querySelectorAll("button").forEach(btn =>
    btn.addEventListener("click", e => {
      handleExcluir(e.target.dataset.id);
    })
  );
}
