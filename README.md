# Sabrina Carpenter • Gestão de Álbuns (Frontend & Backend Integrados)

Projeto desenvolvido para a **Avaliação do 4º Bimestre** da disciplina. Trata-se de uma aplicação web completa integrada a uma API RESTful em **Java Spring Boot**, persistência em banco de dados **PostgreSQL** e interface frontend desenvolvida com auxílio de **Inteligência Artificial (IA)**.

---

## 📌 Prompt Utilizado para Geração do Frontend com IA

> Este foi o prompt elaborado e submetido à Inteligência Artificial para concepção e geração da interface:

```text
Atue como uma desenvolvedora Frontend especialista em UX/UI e integração com APIs RESTful em Java Spring Boot.
Preciso desenvolver uma interface web moderna, responsiva e elegante para o meu projeto acadêmico de cadastro de álbuns da cantora Sabrina Carpenter (projeto 'sabrina-albuns').

CONTEXTO DO BACKEND JAVA:
- Backend desenvolvido em Spring Boot rodando na porta 8080 (http://localhost:8080/album).
- Banco de dados PostgreSQL (cadastro_album) com Hibernate JPA.
- A entidade Album possui os campos:
  * id (Integer - gerado automaticamente)
  * nomeAlbum (String - obrigatório)
  * anoLancamento (Integer)
  * gravadora (String)
  * genero (String)
  * numeroFaixas (Integer)

ENDPOINTS E VERBOS HTTP IMPLEMENTADOS QUE O FRONTEND DEVE CONSUMIR:
1. POST http://localhost:8080/album -> Envia no corpo da requisição (Body) em formato JSON os dados do novo álbum para cadastrar no banco. Retorna status 200 OK.
2. GET http://localhost:8080/album?nome={nome} -> Envia o nome do álbum por Query Param na URL para buscar os dados de um álbum específico. Retorna o JSON do álbum com status 200 OK.
3. GET http://localhost:8080/album/todos -> Retorna a lista em JSON com todos os álbuns cadastrados no banco.
4. PUT http://localhost:8080/album?id={id} -> Envia o ID na URL e o JSON atualizado no Body para atualizar as informações do álbum existente. Retorna status 200 OK.
5. DELETE http://localhost:8080/album?nome={nome} -> Envia o nome do álbum por Query Param para removê-lo do banco de dados. Retorna status 200 OK.

REQUISITOS DA INTERFACE FRONTEND (HTML5, CSS3 e JavaScript Vanilla):
1. Design e Usabilidade:
   - Identidade visual sofisticada e moderna inspirada na estética de Sabrina Carpenter (tons elegantes de café/espresso, creme latte e rosa champanhe).
   - Tipografia limpa combinando fontes Serif e Sans-Serif.
   - Totalmente responsivo para computador e celular.
2. Componentes da Interface:
   - Header/Hero com título temático, indicador visual de status de conexão com a API (Porta 8080) e contador dinâmico de álbuns.
   - Barra de ações com busca por nome (GET), botão para listar todos os álbuns e botão de 'Novo Álbum' (POST).
   - Grade de cards modernos exibindo os álbuns cadastrados com badges para ano e gênero, detalhes de gravadora, faixas e botões de ação: 'Editar (PUT)' e 'Excluir (DELETE)'.
   - Modal/Formulário para cadastro e edição dos álbuns com validações.
   - Notificações flutuantes (Toasts) informando o sucesso ou erro de cada requisição HTTP, destacando visualmente o verbo utilizado.
3. Integração com Backend:
   - Utilizar a API Fetch nativa do JavaScript com funções assíncronas (async/await) e tratamento de erros (try/catch).
   - Garantir compatibilidade CORS no backend (@CrossOrigin(origins = "*")).
   - Incluir um botão ou modal de apoio didático explicando o fluxo HTTP para a apresentação individual ao professor.
```

---

## 🚀 Como Executar a Aplicação

### 1. Iniciar o Backend no IntelliJ
1. Abra a pasta do projeto no IntelliJ IDEA.
2. Certifique-se de que o PostgreSQL está em execução com o banco `cadastro_album`.
3. Execute a classe principal `SabrinaAlbunsApplication.java` (clique no botão verde ▶️).
4. O servidor iniciará na porta `8080`.

### 2. Abrir o Frontend
Como os arquivos do frontend foram organizados na pasta `src/main/resources/static/`, o próprio Spring Boot serve a interface automaticamente:
* Basta abrir seu navegador em: **[http://localhost:8080/](http://localhost:8080/)**
* *(Alternativamente, você também pode abrir o arquivo `frontend/index.html` diretamente no navegador ou via Live Server).*

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Java 25, Spring Boot 4.1.1, Spring Data JPA, Hibernate, Maven, Lombok
- **Banco de Dados:** PostgreSQL 18
- **Frontend:** HTML5 semântico, CSS3 moderno (Variáveis CSS, Flexbox, Grid, Animações), JavaScript ES6+ (Fetch API, Async/Await)
- **Ferramentas de Teste:** Postman, pgAdmin 4, cURL

---

## 📋 Resumo das Operações e Verbos HTTP

| Operação | Verbo HTTP | Endpoint | Envio de Dados | Resposta |
| :--- | :--- | :--- | :--- | :--- |
| **Cadastrar Álbum** | `POST` | `/album` | JSON no Body | `200 OK` |
| **Buscar Álbum por Nome** | `GET` | `/album?nome=...` | Query Param na URL | `200 OK` + JSON |
| **Listar Todos os Álbuns** | `GET` | `/album/todos` | Nenhum | `200 OK` + Lista JSON |
| **Atualizar Álbum** | `PUT` | `/album?id=...` | ID na URL + JSON no Body | `200 OK` |
| **Excluir Álbum** | `DELETE` | `/album?nome=...` | Query Param na URL | `200 OK` |

---

## 🎤 Roteiro para a Apresentação Individual ao Professor

Durante a apresentação, você pode explicar os 6 pontos-chave:

1. **Como o frontend realiza uma requisição HTTP:**  
   *"Utilizamos o método assíncrono `fetch()` do JavaScript. Ele dispara uma requisição HTTP para a porta 8080 onde o Spring Boot está ouvindo."*
2. **Utilização dos verbos HTTP:**  
   *"Usamos `POST` para criar novos registros, `GET` para consultar dados, `PUT` para alterar informações e `DELETE` para remover um álbum."*
3. **Como os dados são enviados:**  
   *"No `POST` e `PUT`, os dados do formulário são empacotados em formato JSON e enviados no corpo (`body`) da requisição. No `GET` e `DELETE`, enviamos parâmetros na própria URL (`query parameters`)."*
4. **Como o backend processa e responde:**  
   *"O `AlbumController` mapeia a rota, chama as regras de negócio no `AlbumService`, que usa o `AlbumRepository` com o Hibernate para executar o SQL no PostgreSQL e devolver um `ResponseEntity.ok()` com status 200."*
5. **Como o frontend recebe e apresenta os dados:**  
   *"O JavaScript aguarda a resposta com `await response.json()`, percorre a lista de álbuns e monta dinamicamente os cards na tela alterando o DOM, além de disparar notificações de feedback (Toasts)."*
6. **Orientação do Prompt de IA:**  
   *"O prompt foi detalhado informando exatamente quais endpoints já existiam no Java, os tipos dos dados, o design desejado e os verbos HTTP correspondentes para que a IA gerasse o código sem inconsistências com o backend."*
