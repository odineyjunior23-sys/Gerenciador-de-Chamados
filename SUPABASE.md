# Documentação - Integração com Supabase

## 🚀 Funcionalidades Implementadas

### ✅ Operações com Chamados
- **Criar chamados** - `window.addChamado(chamado)`
- **Listar chamados** - `window.loadChamados()`
- **Atualizar chamados** - `window.updateChamado(chamado)`
- **Excluir chamados** - `window.deleteChamado(id)`

### ✅ Utilitários Avançados
- **Contagem por status** - `window.supabaseUtils.countByStatus()`
- **Buscar por região** - `window.supabaseUtils.buscarPorRegiao(regiao)`
- **Buscar por urgência** - `window.supabaseUtils.buscarPorUrgencia(urgencia)`
- **Busca avançada** - `window.supabaseUtils.buscar(query, filtros)`

### ✅ Exportação e Backup
- **Exportar para CSV** - `window.supabaseUtils.exportCSV()`
- **Exportar para JSON** - `window.supabaseUtils.exportJSON()`
- **Importar de JSON** - `window.supabaseUtils.importJSON()`
- **Criar backup** - `window.backupChamados()`
- **Restaurar backup** - `window.restoreChamados(backupData)`

### ✅ Monitoramento
- **Status do sistema** - `window.monitorSupabase()`
- **Teste de conexão** - `window.supabaseTest.testarConexao()`

## 📋 Como Usar

### 1. Testar Conexão
```javascript
// No console do navegador
window.supabaseTest.testarConexao();
```

### 2. Criar Chamado
```javascript
const novoChamado = {
  title: 'Problema com internet',
  description: 'A internet está muito lenta',
  status: 'a-fazer',
  regiao: 'Centro',
  urgency: 'alta'
};

const result = await window.addChamado(novoChamado);
console.log('Chamado criado:', result);
```

### 3. Listar Chamados
```javascript
const chamados = await window.loadChamados();
console.log('Chamados:', chamados);
```

### 4. Atualizar Chamado
```javascript
const chamado = await window.loadChamados();
chamado[0].status = 'concluido';
const success = await window.updateChamado(chamado[0]);
console.log('Atualizado:', success);
```

### 5. Contar por Status
```javascript
const counts = await window.supabaseUtils.countByStatus();
console.log('Contagem:', counts);
```

### 6. Backup e Restore
```javascript
// Criar backup
const backup = await window.backupChamados();
console.log('Backup:', backup);

// Restaurar backup
const success = await window.restoreChamados(backup);
console.log('Restaurado:', success);
```

## 🔧 Funções Disponíveis

### Operações Básicas
```javascript
// Adicionar chamado
window.addChamado(chamadoObject);

// Carregar chamados
window.loadChamados();

// Atualizar chamado
window.updateChamado(chamadoObject);

// Excluir chamado
window.deleteChamado(id);
```

### Utilitários Avançados
```javascript
// Contar chamados por status
window.supabaseUtils.countByStatus();

// Buscar chamados por região
window.supabaseUtils.buscarPorRegiao('Centro');

// Buscar chamados por urgência
window.supabaseUtils.buscarPorUrgencia('alta');

// Busca avançada
window.supabaseUtils.buscar('problema com', { status: 'a-fazer' });
```

### Exportação
```javascript
// Exportar para CSV
const csv = await window.supabaseUtils.exportCSV();

// Exportar para JSON
const json = await window.supabaseUtils.exportJSON();

// Importar de JSON
const success = await window.supabaseUtils.importJSON(jsonArray);
```

### Backup/Restore
```javascript
// Criar backup completo
const backup = await window.backupChamados();

// Restaurar backup
const success = await window.restoreChamados(backup);
```

### Monitoramento
```javascript
// Testar conexão
window.supabaseTest.testarConexao();

// Monitorar sistema
const status = await window.monitorSupabase();
```

## 🔍 Debug e Testes

### Testar Conexão
Abra o console do navegador e execute:
```javascript
window.supabaseTest.testarConexao();
```

### Criar Dados de Teste
```javascript
window.supabaseTest.criarDadosTeste();
```

### Limpar Dados de Teste
```javascript
window.supabaseTest.limparDadosTeste();
```

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas
1. **tickets** - Chamados principais
   - id (UUID)
   - title (texto)
   - description (texto)
   - status (texto)
   - user_id (UUID)
   - regiao (texto)
   - urgency (texto)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **ticket_responses** - Respostas aos chamados
   - id (UUID)
   - ticket_id (UUID)
   - user_id (UUID)
   - content (texto)
   - created_at (timestamp)

### Índices Criados
- idx_tickets_status
- idx_tickets_user_id
- idx_tickets_created_at

## 🚨 Tratamento de Erros

O sistema possui tratamento automático:
- **Fallback para localStorage** se o Supabase falhar
- **Logs detalhados** no console
- **Validação de dados** antes de operações
- **Rollback automático** em caso de falha

## 🔧 Personalização

### Adicionar novas funcionalidades
```javascript
// No arquivo src/utils/supabase-utils.js
export async function novaFuncionalidade(parametros) {
  try {
    // Implementação
    return resultado;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}
```

### Modificar funções existentes
```javascript
// No arquivo src/utils/integration.js
window.loadChamados = async function() {
  // Sua implementação personalizada
};
```

## 📚 Exemplos de Uso

### Painel de Controle
```javascript
async function dashboard() {
  const [chamados, counts, status] = await Promise.all([
    window.loadChamados(),
    window.supabaseUtils.countByStatus(),
    window.monitorSupabase()
  ]);

  console.log('Total de chamados:', chamados.length);
  console.log('Status:', counts);
  console.log('Sistema:', status);
}
```

### Relatórios
```javascript
async function gerarRelatorio() {
  const tickets = await window.supabaseUtils.buscar('', { status: 'concluido' });
  const csv = await window.supabaseUtils.exportCSV();
  
  // Salvar ou enviar o CSV
  console.log('Relatório gerado:', csv);
}
```

## 🚀 Próximos Passos

1. **Testar a conexão** - Abra o console e execute `window.supabaseTest.testarConexao()`
2. **Criar chamados de teste** - Execute `window.supabaseTest.criarDadosTeste()`
3. **Verificar dados** - Acesse seu painel do Supabase para ver os registros
4. **Implementar no frontend** - Use as funções nas suas interfaces existentes

---

**✅ Integração completa com Supabase!**

Todas as funcionalidades estão prontas para uso. O sistema agora usa o Supabase como banco de dados principal com fallback automático para localStorage em caso de falha.