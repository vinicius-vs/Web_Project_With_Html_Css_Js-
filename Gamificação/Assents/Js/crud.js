var lista = [];

function salvar() {
    let id;
    let perecivel;
    let nome = document.getElementById("nome").value;
    let medida = document.getElementById("medida").value;
    let quantidade = parseFloat(document.getElementById("quantidade").value);
    let preco = parseFloat(document.getElementById("preco").value);
    let check = document.getElementById("perecivel");
    if (check.checked) {
        perecivel = "sim";
    } else {
        perecivel = "não";
    }
    let data = document.getElementById("fabricacao").value
    produto = {

        "id": id, "nome": nome, "medida": medida, "quantidade": quantidade
        , "preco": preco, "perecivel": perecivel, "data": data
    };
    if (location.search.slice(1) === "") {
        criar(produto);
    } else {
        produto.id = parseInt(location.search.slice(1));
        editar(produto);
    }
}
function carregarVariavelLista() {
    lista = JSON.parse(localStorage.getItem("produtos"));
}
function carregarTabela() {
    let tabela = document.getElementById("lista");
    if (tabela != null) {
        let corpo = tabela.getElementsByTagName("tbody")[0];
        corpo.innerHTML = "";
        lista.forEach(produto => {
            corpo.innerHTML += `<tr>
                <td>${produto.nome}</td>
                <td>${produto.medida}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.preco}</td>
                <td>${produto.perecivel}</td>
                <td>${produto.data}</td>
                <td class="Option"><a href="cadastro.html?${produto.id}" onclick="editar(${produto.id})">Editar</a>|<a onclick="deletar(${produto.id})">Deletar</a></td>
            </tr>`
        });
    }
}
function criar(model) {
    if (lista.length == 0) {
        model.id = 1;
    } else {
        lista.forEach(c => {
            model.id = c["id"]
        })
        model.id = model.id + 1;
    }
    lista.push(model);
    localStorage.setItem("produtos", JSON.stringify(lista));
}
function deletar(id) {
    let model = lista.findIndex(c => c.id == id)
    lista.splice(model, 1);
    carregarTabela();
    localStorage.setItem("produtos", JSON.stringify(lista));
}
function read(id) {
    carregarVariavelLista();
    return lista.find(c => c.id == id);
}
function editar(model) {
    lista[lista.findIndex(c => c.id == model.id)] = model;
    localStorage.setItem("produtos", JSON.stringify(lista));
}
function carregarElemtos(id) {
    let elementos = read(id);
    document.getElementById("nome").value = elementos.nome;
    document.getElementById("medida").value = elementos.medida;
    document.getElementById("quantidade").value = parseFloat(elementos.quantidade);
    document.getElementById("preco").value = parseFloat(elementos.preco);
    if (elementos.perecivel == "sim") {
        document.getElementById("perecivel").checked = true;
    }
    document.getElementById("fabricacao").value = elementos.data;
}
window.onload = function () {
    if (localStorage.getItem("produtos") != null) {
        carregarVariavelLista();
        carregarTabela();
        console.log(lista)
    }
    let id = location.search.slice(1);
    if (id != "") {
        carregarElemtos(id)
    }
}
