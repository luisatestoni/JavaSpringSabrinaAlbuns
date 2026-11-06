/**
 * Sabrina Carpenter • Frontend de Gestão de Álbuns
 * Comunicação direta com a API Spring Boot (porta 8080)
 */

const API_BASE_URL = 'http://localhost:8080/album';
let todosOsAlbunsCache = [];

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    listarTodosOsAlbuns();

    // Filtro em tempo real (insensível a maiúsculas/minúsculas)
    const inputBusca = document.getElementById('inputBusca');
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            filtrarCardsNaTela(e.target.value);
        });
    }
});

/**
 * 1. LISTAR TODOS OS ÁLBUNS (GET /album/todos)
 */
async function listarTodosOsAlbuns() {
    const loading = document.getElementById('loadingIndicator');
    const grid = document.getElementById('albumsGrid');
    const emptyState = document.getElementById('emptyState');
    const countBadge = document.getElementById('totalAlbunsCount');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('backendStatus');

    loading.classList.remove('hidden');
    grid.innerHTML = '';
    emptyState.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Falha ao buscar lista de álbuns.`);
        }

        todosOsAlbunsCache = await response.json();
        loading.classList.add('hidden');

        // Atualiza status de conexão
        statusDot.style.backgroundColor = '#4caf50';
        statusDot.style.boxShadow = '0 0 8px #4caf50';
        statusText.textContent = 'Backend: Conectado (Porta 8080)';
        countBadge.textContent = todosOsAlbunsCache.length;

        renderizarCards(todosOsAlbunsCache);

    } catch (error) {
        console.error('Erro na requisição GET:', error);
        loading.classList.add('hidden');
        statusDot.style.backgroundColor = '#f44336';
        statusDot.style.boxShadow = '0 0 8px #f44336';
        statusText.textContent = 'Backend: Desconectado ou com erro';
        mostrarToast('Não foi possível conectar ao backend Spring Boot (porta 8080). Certifique-se de que a aplicação está rodando.', 'error');
    }
}

/**
 * Renderiza uma lista de álbuns na grade
 */
function renderizarCards(albuns) {
    const grid = document.getElementById('albumsGrid');
    const emptyState = document.getElementById('emptyState');
    grid.innerHTML = '';

    if (!albuns || albuns.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    albuns.forEach(album => {
        const card = criarCardAlbum(album);
        grid.appendChild(card);
    });
}

/**
 * Filtro em tempo real no cliente (sem case sensitivity)
 */
function filtrarCardsNaTela(termo) {
    if (!termo || !termo.trim()) {
        renderizarCards(todosOsAlbunsCache);
        return;
    }

    const termoFormatado = termo.trim().toLowerCase();
    const filtrados = todosOsAlbunsCache.filter(album => 
        (album.nomeAlbum && album.nomeAlbum.toLowerCase().includes(termoFormatado)) ||
        (album.genero && album.genero.toLowerCase().includes(termoFormatado)) ||
        (album.gravadora && album.gravadora.toLowerCase().includes(termoFormatado))
    );

    renderizarCards(filtrados);
}

/**
 * Cria o elemento HTML de um Card de Álbum
 */
function criarCardAlbum(album) {
    const card = document.createElement('div');
    card.className = 'album-card';

    card.innerHTML = `
        <div>
            <div class="card-top">
                <div class="card-badges">
                    <span class="badge-year">📅 ${album.anoLancamento || 'N/A'}</span>
                    <span class="badge-genre">🎵 ${album.genero || 'Pop'}</span>
                </div>
                <span class="album-id">#ID: ${album.id}</span>
            </div>

            <h3 class="album-title">${album.nomeAlbum}</h3>

            <ul class="album-details">
                <li><strong>Gravadora:</strong> ${album.gravadora || 'Não informada'}</li>
                <li><strong>Faixas:</strong> ${album.numeroFaixas || 0} músicas</li>
            </ul>
        </div>

        <div class="card-actions">
            <button class="btn btn-outline btn-sm" onclick='prepararEdicao(${JSON.stringify(album)})'>
                ✏️ Editar (PUT)
            </button>
            <button class="btn btn-danger btn-sm" onclick="confirmarExclusao('${escapeHtml(album.nomeAlbum)}')">
                🗑️ Excluir (DELETE)
            </button>
        </div>
    `;

    return card;
}

/**
 * 2. BUSCAR ÁLBUM POR NOME (GET /album?nome=...)
 */
async function buscarAlbumPorNome() {
    const input = document.getElementById('inputBusca');
    const nome = input.value.trim();

    if (!nome) {
        mostrarToast('Digite o nome do álbum para buscar.', 'info');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}?nome=${encodeURIComponent(nome)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Álbum "${nome}" não foi encontrado no banco.`);
        }

        const album = await response.json();
        exibirResultadoBusca(album);
        filtrarCardsNaTela(nome);
        mostrarToast(`[GET 200 OK] Álbum "${album.nomeAlbum}" encontrado!`, 'success');

    } catch (error) {
        console.error('Erro na busca por nome:', error);
        mostrarToast(error.message, 'error');
    }
}

function tratarEnterBusca(event) {
    if (event.key === 'Enter') {
        buscarAlbumPorNome();
    }
}

function exibirResultadoBusca(album) {
    const container = document.getElementById('buscaResultadoContainer');
    const conteudo = document.getElementById('buscaResultadoConteudo');

    conteudo.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
                <h4 style="font-size: 1.3rem; color: var(--espresso); margin-bottom: 6px;">${album.nomeAlbum}</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    <strong>ID:</strong> ${album.id} &bull; 
                    <strong>Ano:</strong> ${album.anoLancamento || 'N/A'} &bull; 
                    <strong>Gênero:</strong> ${album.genero || 'Pop'} &bull; 
                    <strong>Gravadora:</strong> ${album.gravadora || 'N/A'} &bull; 
                    <strong>Faixas:</strong> ${album.numeroFaixas || 0}
                </p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-outline btn-sm" onclick='prepararEdicao(${JSON.stringify(album)})'>
                    ✏️ Editar (PUT)
                </button>
                <button class="btn btn-danger btn-sm" onclick="confirmarExclusao('${escapeHtml(album.nomeAlbum)}')">
                    🗑️ Excluir (DELETE)
                </button>
            </div>
        </div>
    `;

    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function fecharResultadoBusca() {
    document.getElementById('buscaResultadoContainer').classList.add('hidden');
}

/**
 * 3. CADASTRAR OU ATUALIZAR ÁLBUM (POST /album ou PUT /album?id=...)
 */
async function salvarOuAtualizarAlbum(event) {
    event.preventDefault();

    const id = document.getElementById('albumId').value;
    const nomeAlbum = document.getElementById('nomeAlbum').value.trim();
    const anoLancamento = document.getElementById('anoLancamento').value;
    const numeroFaixas = document.getElementById('numeroFaixas').value;
    const genero = document.getElementById('genero').value.trim();
    const gravadora = document.getElementById('gravadora').value.trim();

    if (!nomeAlbum) {
        mostrarToast('O nome do álbum é obrigatório.', 'error');
        return;
    }

    const payload = {
        nomeAlbum: nomeAlbum,
        anoLancamento: anoLancamento ? parseInt(anoLancamento) : null,
        numeroFaixas: numeroFaixas ? parseInt(numeroFaixas) : null,
        genero: genero || null,
        gravadora: gravadora || null
    };

    try {
        let response;

        if (id) {
            // OPERAÇÃO PUT (Atualizar por ID)
            response = await fetch(`${API_BASE_URL}?id=${encodeURIComponent(id)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Erro ao atualizar álbum (${response.status})`);
            mostrarToast(`[PUT 200 OK] Álbum "${nomeAlbum}" atualizado com sucesso!`, 'success');

        } else {
            // OPERAÇÃO POST (Cadastrar novo)
            response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Erro ao cadastrar álbum (${response.status})`);
            mostrarToast(`[POST 200 OK] Álbum "${nomeAlbum}" cadastrado com sucesso!`, 'success');
        }

        fecharModalFormulario();
        fecharResultadoBusca();
        listarTodosOsAlbuns();

    } catch (error) {
        console.error('Erro ao salvar/atualizar:', error);
        mostrarToast(error.message, 'error');
    }
}

/**
 * 4. DELETAR ÁLBUM POR NOME (DELETE /album?nome=...)
 */
async function confirmarExclusao(nomeAlbum) {
    const confirmar = confirm(`Tem certeza de que deseja excluir o álbum "${nomeAlbum}"?\nEsta ação disparará uma requisição DELETE ao backend.`);
    
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_BASE_URL}?nome=${encodeURIComponent(nomeAlbum)}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir álbum (${response.status})`);
        }

        mostrarToast(`[DELETE 200 OK] Álbum "${nomeAlbum}" excluído do banco!`, 'success');
        fecharResultadoBusca();
        listarTodosOsAlbuns();

    } catch (error) {
        console.error('Erro na exclusão:', error);
        mostrarToast(error.message, 'error');
    }
}

/**
 * Controle de Modais e Formulário
 */
function abrirModalFormulario() {
    document.getElementById('albumForm').reset();
    document.getElementById('albumId').value = '';
    document.getElementById('modalTitulo').textContent = 'Cadastrar Novo Álbum';
    document.getElementById('btnSubmitForm').textContent = 'Salvar Álbum (POST)';
    document.getElementById('modalFormulario').classList.remove('hidden');
}

function fecharModalFormulario() {
    document.getElementById('modalFormulario').classList.add('hidden');
}

function prepararEdicao(album) {
    document.getElementById('albumId').value = album.id;
    document.getElementById('nomeAlbum').value = album.nomeAlbum || '';
    document.getElementById('anoLancamento').value = album.anoLancamento || '';
    document.getElementById('numeroFaixas').value = album.numeroFaixas || '';
    document.getElementById('genero').value = album.genero || '';
    document.getElementById('gravadora').value = album.gravadora || '';

    document.getElementById('modalTitulo').textContent = `Editar Álbum (ID: ${album.id})`;
    document.getElementById('btnSubmitForm').textContent = 'Atualizar Álbum (PUT)';
    document.getElementById('modalFormulario').classList.remove('hidden');
}

function abrirModalExplicacao() {
    document.getElementById('modalExplicacao').classList.remove('hidden');
}

function fecharModalExplicacao() {
    document.getElementById('modalExplicacao').classList.add('hidden');
}

/**
 * Sistema de Toasts (Notificações Flutuantes)
 */
function mostrarToast(mensagem, tipo = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;

    let icone = 'ℹ️';
    if (tipo === 'success') icone = '✅';
    if (tipo === 'error') icone = '⚠️';

    toast.innerHTML = `<span>${icone}</span> <span>${mensagem}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
