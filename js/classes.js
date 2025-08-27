export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this._id = id;
  }
}

export class ClienteService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async listar() {
    const response = await fetch(`${this.apiUrl}/clientes`);
    if (!response.ok) throw new Error("Erro ao listar clientes");
    return response.json();
  }

  async cadastrar(cliente) {
    const response = await fetch(`${this.apiUrl}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error("Erro ao cadastrar cliente");
    return response.json();
  }

  async excluir(id) {
    const response = await fetch(`${this.apiUrl}/clientes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir cliente");
  }
}
