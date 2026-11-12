const form = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const inputBusca = document.getElementById('input-busca');
const filtroPrioridade = document.getElementById('filtro-prioridade');
const listaTarefas = document.getElementById('tarefas');

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const texto = inputTarefa.value.trim();
    if (texto === '') return;

    const item = document.createElement('li');
    item.classList.add('media');
    item.dataset.prioridade = 'media';

    const topo = document.createElement('div');
    topo.className = 'topo';

    const span = document.createElement('span');
    span.textContent = texto;
    span.addEventListener('click', function() {
        item.classList.toggle('concluida');
    });

    const divAcoes = document.createElement('div');
    divAcoes.className = 'botoes-acao';

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-editar';
    btnEditar.addEventListener('click', function() {
        const novoTexto = prompt('Editar tarefa:', span.textContent);
        if (novoTexto !== null && novoTexto.trim() !== '') {
            span.textContent = novoTexto.trim();
        }
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.addEventListener('click', function() {
        item.remove();
    });

    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnExcluir);

    topo.appendChild(span);
    topo.appendChild(divAcoes);

    const divPrioridade = document.createElement('div');
    divPrioridade.className = 'botoes-prioridade';

    const btnAlta = document.createElement('button');
    btnAlta.textContent = 'Alta';
    btnAlta.className = 'btn-prio';

    const btnMedia = document.createElement('button');
    btnMedia.textContent = 'Média';
    btnMedia.className = 'btn-prio ativa-media';

    const btnBaixa = document.createElement('button');
    btnBaixa.textContent = 'Baixa';
    btnBaixa.className = 'btn-prio';

    btnAlta.addEventListener('click', function() {
        item.classList.remove('alta', 'media', 'baixa');
        item.classList.add('alta');
        item.dataset.prioridade = 'alta';

        btnAlta.classList.add('ativa-alta');
        btnMedia.classList.remove('ativa-media');
        btnBaixa.classList.remove('ativa-baixa');
        filtrarTarefas();
    });

    btnMedia.addEventListener('click', function() {
        item.classList.remove('alta', 'media', 'baixa');
        item.classList.add('media');
        item.dataset.prioridade = 'media';

        btnMedia.classList.add('ativa-media');
        btnAlta.classList.remove('ativa-alta');
        btnBaixa.classList.remove('ativa-baixa');
        filtrarTarefas();
    });

    btnBaixa.addEventListener('click', function() {
        item.classList.remove('alta', 'media', 'baixa');
        item.classList.add('baixa');
        item.dataset.prioridade = 'baixa';

        btnBaixa.classList.add('ativa-baixa');
        btnAlta.classList.remove('ativa-alta');
        btnMedia.classList.remove('ativa-media');
        filtrarTarefas();
    });

    divPrioridade.appendChild(btnAlta);
    divPrioridade.appendChild(btnMedia);
    divPrioridade.appendChild(btnBaixa);

    item.appendChild(topo);
    item.appendChild(divPrioridade);
    listaTarefas.appendChild(item);

    inputTarefa.value = '';
    inputTarefa.focus();
});

function filtrarTarefas() {
    const busca = inputBusca.value.toLowerCase();
    const filtro = filtroPrioridade.value;
    const itens = listaTarefas.getElementsByTagName('li');

    for (let i = 0; i < itens.length; i++) {
        const textoTarefa = itens[i].querySelector('span').textContent.toLowerCase();
        const prioridadeTarefa = itens[i].dataset.prioridade;

        const mostraTexto = textoTarefa.includes(busca);
        const mostraPrioridade = (filtro === 'todas' || prioridadeTarefa === filtro);

        if (mostraTexto && mostraPrioridade) {
            itens[i].style.display = 'flex';
        } else {
            itens[i].style.display = 'none';
        }
    }
}

inputBusca.addEventListener('input', filtrarTarefas);
filtroPrioridade.addEventListener('change', filtrarTarefas);