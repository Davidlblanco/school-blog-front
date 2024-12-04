School Blog Front

Esta aplicação foi feita como trabalho de poss graduação da fiap. Trata-se de um blog onde professores interagem com alunos.

1 Como rodar a aplicação em modo de desenvolvimento

npm i
npm run dev

2 Deploy

Ao comitar na master o frontend fará deploy no github pages:

link para github pages(ainda nao existe)

3 Fluxos da aplicação

-   ao entrar no app é verificado se a pagina possui um cookie "school-blog-jwt", este cookie contem o jwt que da permissão para as requisições no backend. Caso seja 'ADMIN', o usuário terá acesso a tudo caso seja 'TEACHER' ou 'STUDENT' terá acesso apenas aos respectivos componentes.
-   Como as requisições necessitam do jwt, mesmo que alguem tente burlar o front, não seria possível ver informações que não são pertinentes pois todas as requisições são feitas com jwt

    -   Componentes

./App.tsx é o componente principal ele engloba os componentes ./contexts/MainProvider.tsx e ./isLoggedIn.tsx
./contexts/MainProvider.tsx é o contexto global da aplicação, ali se concentram todas as variaveis úteis que serão compartilhadas entre componentes
./isLoggedIn.tsx emgloba ContentHolder e Login caso o contexto diga que o usuario está logado é reinderizado o ContentHolder caso não a tela de login

./components/ContentHolder este componente é o componente pai da parte logada, ele engloba o router e determina qual componente aparecerá em cada rota

A aplicação tem 3 roles, tudo o que tem a ver com cadastro de usuário é disponibilizado apenas para o role 'ADMIN'. Caso voce tente entrar numa tela não permitida ao seu role o componente AccessDenied.tsx é reinderizado

Os componentes permitidos apenas para 'ADMIN' são:
./components/CreateUpdateUser >> cria e atualiza usuários no sistema e é assessado pela rota: /admin/UpdateUser/:id no caso de update /admin/CreateUser no caso de create

./components/ListUsers >> lista usuários do sistema e é assessado pela rota: /admin/ListUsers

Os componentes disponíveis para 'ADMIN' e 'TEACHER' são:
./components/List >> lista os artigos do blog para os roles 'ADMIN' e 'TEACHER' nessa lista é possivel visualizar os botões update e remove, alem do icone que demonstra se o artigo está ativo
disponivel em: '/'

.components/updateArticle.tsx >> este componente é o formulário que cria ou atualiza artigos, disponivel em: '/updateArticle/:id' ou '/createArticle'

Os componentes disponíveis para 'STUDENT','ADMIN' e 'TEACHER' são:
./components/List >> Os botões de editar e remover são escondidos e os artigos inativos não serão listados para 'STUDENT' '/'

./components/View.tsx >> visualização de artigos '/:id'

./components/MyAccount.tsx >> este componente permite que cada usuário atualize os seus proprios dados cadastrais.'/myAccount'

./utils >> ferramentas, variaveis e Hooks feitos especificamente para o projeto
