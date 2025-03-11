# Documentação do Projeto

## Visão Geral

Este projeto é uma aplicação React desenvolvida com Vite e Tailwind CSS, consistindo em três tarefas principais:

1. **Lista de Tarefas** - Um gerenciador de tarefas com armazenamento local
2. **Consumidor API** - Uma interface para visualização de dados de usuários da API JSONPlaceholder
3. **Dashboard** - Um painel administrativo com funcionalidades de gerenciamento de usuários

## Estrutura do Projeto

### Componentes Principais

- **App.jsx** - Componente raiz que gerencia a navegação entre as três tarefas
- **ListaTarefas.jsx** - Gerenciador de tarefas com armazenamento local
- **ConsumidorAPI.jsx** - Interface para visualização de dados da API
- **Dashboard.jsx** - Painel administrativo com gerenciamento de usuários

### Componentes Reutilizáveis

- **LoadingSpinner.jsx** - Componente de carregamento reutilizável
- **ErrorMessage.jsx** - Componente para exibição de mensagens de erro
- **Dashboard/**
  - **SideMenu.jsx** - Menu lateral do Dashboard
  - **UsuarioForm.jsx** - Formulário para adicionar novos usuários
  - **UsuariosTable.jsx** - Tabela de usuários para telas médias e grandes
  - **UsuariosCards.jsx** - Cards de usuários para telas pequenas

### Hooks Personalizados

- **useTarefas.js** - Hook para gerenciar o estado e operações das tarefas
- **useUsuarios.js** - Hook para gerenciar o estado e operações dos usuários

## Funcionalidades Principais

### Lista de Tarefas

- Adicionar, remover e marcar tarefas como concluídas
- Armazenamento local usando localStorage
- Exibição de estatísticas (total de tarefas e concluídas)

```jsx
// Exemplo de uso do hook useTarefas
const { 
  tarefas, 
  carregando, 
  adicionarTarefa, 
  removerTarefa, 
  alternarConclusao, 
  formatarData,
  tarefasConcluidas,
  totalTarefas
} = useTarefas();
```

### Consumidor API

- Busca e exibição de dados de usuários da API JSONPlaceholder
- Filtro de pesquisa para encontrar usuários
- Exibição em cards com informações detalhadas

```jsx
// Exemplo de uso do hook useUsuarios
const { 
  usuarios, 
  carregando, 
  erro, 
  buscarUsuarios, 
  filtrarUsuarios 
} = useUsuarios();
```

### Dashboard

- Menu lateral responsivo
- Gerenciamento de usuários (adicionar, excluir)
- Visualização adaptativa (tabela em telas grandes, cards em telas pequenas)
- Formulário de adição com validação

```jsx
// Exemplo de uso do hook useUsuarios no Dashboard
const { 
  usuarios, 
  carregando, 
  erro, 
  buscarUsuarios, 
  adicionarUsuario, 
  excluirUsuario 
} = useUsuarios();
```

## Responsividade

A aplicação foi projetada para ser totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

### Componentes Responsivos

- **ListaTarefas**:
  - Formulário de adição se adapta a telas pequenas (empilhamento vertical)
  - Botão "Adicionar" ocupa largura total em telas pequenas

```jsx
<div className="flex flex-col sm:flex-row">
  <input
    className="flex-1 px-4 py-2 border rounded-lg sm:rounded-r-none sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
  >
    <Plus size={20} />
    <span>Adicionar</span>
  </button>
</div>
```

- **Dashboard**:
  - Menu lateral colapsável em telas pequenas
  - Botão "Adicionar Usuário" adaptativo (texto reduzido em telas pequenas)
  - Visualização alternativa (tabela/cards) baseada no tamanho da tela

```jsx
<button
  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm whitespace-nowrap ml-2"
>
  <Plus size={18} />
  <span className="hidden sm:inline">Adicionar Usuário</span>
  <span className="sm:hidden">Adicionar</span>
</button>
```

- **UsuarioForm**:
  - Botões empilhados verticalmente em telas pequenas
  - Largura total dos botões em telas pequenas

```jsx
<div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2 sm:space-x-3 sm:gap-0">
  <button
    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
  >
    Cancelar
  </button>
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto mt-2 sm:mt-0"
  >
    Adicionar
  </button>
</div>
```

## Otimizações de Performance

- **Lazy Loading** - Carregamento sob demanda dos componentes principais
- **Suspense** - Exibição de indicador de carregamento durante o carregamento dos componentes
- **Componentes Menores** - Divisão em componentes menores para melhor manutenção e performance

```jsx
// Lazy loading dos componentes
const ListaTarefas = lazy(() => import("./components/ListaTarefas"));
const ConsumidorAPI = lazy(() => import("./components/ConsumidorAPI"));
const Dashboard = lazy(() => import("./components/Dashboard"));

// Uso com Suspense
<Suspense fallback={<LoadingSpinner />}>
  {paginaAtual === "tarefas" && <ListaTarefas />}
  {paginaAtual === "usuarios" && <ConsumidorAPI />}
  {paginaAtual === "dashboard" && <Dashboard />}
</Suspense>
```

## Boas Práticas Implementadas

1. **Separação de Responsabilidades** - Lógica de negócio separada da interface do usuário através de hooks personalizados
2. **Componentização** - Componentes pequenos e reutilizáveis
3. **Hooks Personalizados** - Encapsulamento da lógica de estado e efeitos
4. **Lazy Loading** - Carregamento sob demanda para melhor performance
5. **Design Responsivo** - Adaptação a diferentes tamanhos de tela
6. **Validação de Formulários** - Validação de entrada do usuário antes do processamento

## Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **Vite** - Ferramenta de build rápida para desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **localStorage** - API para armazenamento local de dados
- **Fetch API** - Para requisições HTTP

## Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Melhorias Recentes

1. **Refatoração de Componentes** - Separação em componentes menores e mais focados
2. **Criação de Hooks Personalizados** - Separação da lógica de negócio
3. **Melhorias de Responsividade** - Ajustes para melhor adaptação em telas pequenas:
   - Botões adaptáveis em formulários
   - Layout responsivo para o Dashboard
   - Melhor organização de elementos em telas pequenas
