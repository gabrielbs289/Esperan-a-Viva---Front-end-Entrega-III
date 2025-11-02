/*
 * ESPERANÇA VIVA - SCRIPTS (ENTREGA III)
 *
 * Estrutura Modular:
 * 1. Módulo de Máscaras (Reutilizado)
 * 2. Módulo de Validação Avançada (Requisito III)
 * 3. Módulo de Templating (Projetos) (Requisito III)
 * 4. Módulo de Navegação (Menu Hambúrguer + SPA) (Requisito III)
 * 5. Inicializador
 */

// --- 1. MÓDULO DE MÁSCARAS (Reutilizado) ---
const Mascaras = {
    cpf(v) {
        v.value = v.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    },
    telefone(v) {
        v.value = v.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2');
    },
    cep(v) {
        v.value = v.value.replace(/\D/g, '').replace(/(\d{5})(\d{3})$/, '$1-$2');
    }
};

// --- 2. MÓDULO DE VALIDAÇÃO AVANÇADA (Requisito III) ---
const Validacao = {
    // Função para mostrar/esconder erros
    setErro(inputId, mensagem) {
        const input = document.getElementById(inputId);
        const erroEl = document.getElementById(`error-${inputId}`);
        if (mensagem) {
            erroEl.textContent = mensagem;
            erroEl.classList.add('ativo');
            input.classList.add('invalido');
        } else {
            erroEl.textContent = '';
            erroEl.classList.remove('ativo');
            input.classList.remove('invalido');
        }
    },

    // Regras de consistência
    validarNome(input) {
        if (input.value.trim().indexOf(' ') === -1) {
            this.setErro(input.id, 'Por favor, insira seu nome completo (nome e sobrenome).');
            return false;
        }
        this.setErro(input.id, null);
        return true;
    },
    
    validarCPF(input) {
        // Esta é uma validação simples de formato. Uma real usaria o algoritmo de verificação.
        if (input.value.length !== 14) {
            this.setErro(input.id, 'CPF deve ter 11 dígitos.');
            return false;
        }
        this.setErro(input.id, null);
        return true;
    },

    validarEmail(input) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(input.value)) {
            this.setErro(input.id, 'Formato de e-mail inválido.');
            return false;
        }
        this.setErro(input.id, null);
        return true;
    },

    validarCampoGenerico(input) {
        if (!input.value.trim()) {
            this.setErro(input.id, 'Este campo é obrigatório.');
            return false;
        }
        this.setErro(input.id, null);
        return true;
    },

    // Função principal para inicializar os listeners do formulário
    initForm(container) {
        const form = container.querySelector('#form-cadastro');
        if (!form) return;

        const campos = {
            nome: (input) => this.validarNome(input),
            email: (input) => this.validarEmail(input),
            cpf: (input) => this.validarCPF(input),
            telefone: (input) => this.validarCampoGenerico(input),
            data: (input) => this.validarCampoGenerico(input),
            cep: (input) => this.validarCampoGenerico(input),
            endereco: (input) => this.validarCampoGenerico(input),
            cidade: (input) => this.validarCampoGenerico(input),
            estado: (input) => this.validarCampoGenerico(input),
        };

        // Adiciona listeners de 'blur' (quando o usuário sai do campo)
        for (const [id, func] of Object.entries(campos)) {
            const input = form.querySelector(`#${id}`);
            if(input) {
                input.addEventListener('blur', () => func(input));
            }
        }
        
        // Adiciona máscaras
        form.querySelector('#cpf')?.addEventListener('input', (e) => Mascaras.cpf(e.target));
        form.querySelector('#telefone')?.addEventListener('input', (e) => Mascaras.telefone(e.target));
        form.querySelector('#cep')?.addEventListener('input', (e) => Mascaras.cep(e.target));

        // Listener de Submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const mensagem = container.querySelector('#mensagem');
            mensagem.innerHTML = '';
            mensagem.className = '';

            // Valida todos os campos
            let formValido = true;
            for (const [id, func] of Object.entries(campos)) {
                const input = form.querySelector(`#${id}`);
                if (!func(input)) {
                    formValido = false;
                }
            }
            // Validação dos radio buttons
            if (!form.querySelector('input[name="tipo"]:checked')) {
                formValido = false;
            }

            if (formValido) {
                mensagem.textContent = 'Cadastro enviado com sucesso (simulado). Obrigado!';
                mensagem.classList.add('alert', 'alert-sucesso');
                form.reset();
                // Limpa todos os erros
                for (const id of Object.keys(campos)) {
                    this.setErro(id, null);
                }
            } else {
                mensagem.textContent = 'Por favor, corrija os erros destacados no formulário.';
                mensagem.classList.add('alert', 'alert-erro');
            }
        });
    }
};

// --- 3. MÓDULO DE TEMPLATING (PROJETOS) (Requisito III) ---
const Templating = {
    // Dados dos projetos
    projetosData: [
        {
            id: 'proj-educar',
            img: 'imagens/projeto1.jpg',
            alt: 'Crianças estudando',
            titulo: 'Educar para o Futuro',
            desc: 'Projeto de reforço escolar para crianças em situação de vulnerabilidade.',
            tags: [
                { texto: 'Educação', classe: 'badge-primario' },
                { texto: 'Voluntariado', classe: '' }
            ]
        },
        {
            id: 'proj-verde',
            img: 'imagens/voluntariado.jpg',
            alt: 'Plantio de árvores',
            titulo: 'Verde Vida',
            desc: 'Ações ambientais com práticas de reflorestamento e mutirões de limpeza.',
            tags: [
                { texto: 'Meio Ambiente', classe: 'badge-secundario' },
                { texto: 'Voluntariado', classe: '' }
            ]
        },
        {
            id: 'proj-saude',
            img: 'imagens/equipe.jpg',
            alt: 'Equipe de saúde',
            titulo: 'Saúde Comunitária',
            desc: 'Atendimentos médicos e odontológicos básicos para a comunidade local.',
            tags: [
                { texto: 'Saúde', classe: 'badge-primario' },
                { texto: 'Doações', classe: '' }
            ]
        }
    ],

    // Template de um Card de Projeto
    criarCard(projeto) {
        // Gera o HTML das tags
        const tagsHtml = projeto.tags.map(tag => 
            `<span class="badge ${tag.classe}">${tag.texto}</span>`
        ).join(' ');

        // Retorna o HTML completo do card
        return `
        <article class="col-md-6 col-lg-4 col-span-12" aria-labelledby="${projeto.id}">
            <div class="card">
                <img src="${projeto.img}" alt="${projeto.alt}" class="card-imagem" />
                <div class="card-corpo">
                    <h3 id="${projeto.id}">${projeto.titulo}</h3>
                    <p>${projeto.desc}</p>
                    ${tagsHtml}
                </div>
                <div class="card-rodape">
                    <a class="nav-link btn" href="cadastro.html">Quero Ajudar</a>
                </div>
            </div>
        </article>
        `;
    },

    // Função para renderizar os projetos na página
    initProjetos(container) {
        const containerProjetos = container.querySelector('#projetos-container');
        if (!containerProjetos) return; // Só executa na página de projetos

        let htmlProjetos = '';
        for (const projeto of this.projetosData) {
            htmlProjetos += this.criarCard(projeto);
        }
        containerProjetos.innerHTML = htmlProjetos;
    }
};

// --- 4. MÓDULO DE NAVEGAÇÃO (Menu Hambúrguer + SPA) ---
const Navegacao = {
    initMenuHamburger() {
        const btnHamburger = document.querySelector('.btn-hamburger');
        const navMobile = document.getElementById('nav-mobile');

        if (btnHamburger && navMobile) {
            btnHamburger.addEventListener('click', () => {
                const estaAtivo = navMobile.classList.toggle('ativo');
                btnHamburger.setAttribute('aria-expanded', estaAtivo);
                btnHamburger.setAttribute('aria-label', estaAtivo ? 'Fechar menu' : 'Abrir menu');
            });
        }
    },

    // Função para atualizar o link ativo no menu
    atualizarLinksAtivos(caminho) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.href.endsWith(caminho)) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    },

    // Função para carregar o conteúdo da página via fetch
    async carregarPagina(url) {
        try {
            const resposta = await fetch(url);
            if (!resposta.ok) throw new Error('Falha ao carregar página');
            
            const textoHtml = await resposta.text();
            
            // Extrai o conteúdo da tag <main> e o <title>
            const parser = new DOMParser();
            const doc = parser.parseFromString(textoHtml, 'text/html');
            const novoConteudo = doc.getElementById('main-content').innerHTML;
            const novoTitulo = doc.querySelector('title').textContent;

            // Injeta o novo conteúdo no DOM e atualiza o título
            document.getElementById('main-content').innerHTML = novoConteudo;
            document.title = novoTitulo;

            // Atualiza o link ativo
            this.atualizarLinksAtivos(url.substring(url.lastIndexOf('/') + 1));
            
            // Esconde o menu mobile após a navegação
            document.getElementById('nav-mobile')?.classList.remove('ativo');
            document.querySelector('.btn-hamburger')?.setAttribute('aria-expanded', 'false');

            // Re-inicializa os scripts da página (MUITO IMPORTANTE)
            App.initPagina(document.getElementById('main-content'));

        } catch (erro) {
            console.error('Erro na SPA:', erro);
            window.location.href = url; // Se falhar, faz um refresh normal
        }
    },

    // Inicializador da SPA
    initSPA() {
        // Captura cliques em todos os links de navegação
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a.nav-link');
            if (link) {
                e.preventDefault(); // Impede o refresh da página
                
                // Se o link for o mesmo, não faz nada
                if (link.href === window.location.href) return; 

                // Atualiza a URL na barra do navegador
                history.pushState(null, '', link.href);
                // Carrega o conteúdo
                this.carregarPagina(link.href);
            }
        });

        // Lida com os botões "Voltar" e "Avançar" do navegador
        window.addEventListener('popstate', () => {
            this.carregarPagina(window.location.href);
        });
    }
};

// --- 5. INICIALIZADOR ---
const App = {
    // Esta função inicializa os scripts específicos da página ATUAL
    initPagina(container) {
        // Inicializa o templating (só vai rodar se achar o container)
        Templating.initProjetos(container);
        // Inicializa a validação (só vai rodar se achar o formulário)
        Validacao.initForm(container);
    },

    // Esta função inicializa os scripts GLOBAIS (só rodam 1 vez)
    initGlobal() {
        Navegacao.initMenuHamburger();
        Navegacao.initSPA();
    }
};

// --- Ponto de Entrada ---
document.addEventListener('DOMContentLoaded', () => {
    App.initGlobal(); // Inicia scripts globais (Menu, SPA)
    App.initPagina(document); // Inicia scripts da página inicial
});
