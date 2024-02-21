# Blog FIAP

Blog feito em aula para a disciplina de Front-End da FIAP.

## Funcionalidades

- **Tema Claro/Escuro**: Alternância entre tema claro e escuro para melhorar a experiência de leitura em diferentes condições de iluminação.
- **Pesquisa de Posts**: Funcionalidade de pesquisa que permite aos usuários encontrar posts por títulos ou descrições.
- **Filtragem por Categoria**: Os usuários podem filtrar posts por categorias para encontrar rapidamente o conteúdo de seu interesse.
- **Navegação para Posts Relacionados**: Dentro de um post, os usuários podem navegar para outros posts relacionados.
- **Responsividade**: Design responsivo que garante uma boa visualização em dispositivos móveis e desktops.

## Tecnologias Utilizadas

- React.js para a construção da interface do usuário.
- Contentful como CMS para gerenciamento de conteúdo.
- Bootstrap para estilização e layout responsivo.
- React Router para roteamento no lado do cliente.
- `@contentful/rich-text-html-renderer` para renderizar conteúdo rico do Contentful.

## Como Executar Localmente

Para rodar o projeto localmente, siga estes passos:

1. Clone o repositório:
    
```bash
git clone URL_DO_REPOSITORIO
```

2. Navegue até o diretório do projeto:
    
```bash
cd blog-fiap
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente:
- Crie um arquivo `constants` na raiz do projeto.
- Adicione as seguintes variáveis (ajuste os valores conforme necessário):
  ```
  spaceId=seu_space_id
  accessToken=seu_access_token
  ```
5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará acessível em `http://localhost:3000`.

## Contribuindo

Instruções sobre como contribuir para o projeto, se aplicável.

