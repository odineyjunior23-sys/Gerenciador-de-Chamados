// src/utils/test-supabase.js
import { initSupabase, loadChamadosFromSupabase } from './supabase-utils.js';

// Testar conexão com Supabase
async function testarConexaoSupabase() {
  console.log('=== Testando conexão com Supabase ===');

  // Inicializar Supabase
  const initSuccess = await initSupabase();
  console.log('Inicialização:', initSuccess ? '✅ Sucesso' : '❌ Falha');

  if (!initSuccess) {
    console.error('Não foi possível conectar ao Supabase. Verifique suas credenciais.');
    return;
  }

  // Testar operações básicas
  console.log('\n=== Testando operações básicas ===');

  // Testar carga de chamados
  try {
    const chamados = await loadChamadosFromSupabase();
    console.log('Carregar chamados:✅ Sucesso');
    console.log('Total de chamados encontrados:', chamados.length);

    if (chamados.length > 0) {
      console.log('Exemplo de chamado:', chamados[0]);
    } else {
      console.log('Nenhum chamado encontrado. Tabela pode estar vazia.');
    }
  } catch (error) {
    console.error('Erro ao carregar chamados:', error);
  }

  // Testar funções de utilidade
  console.log('\n=== Testando funções de utilidade ===');

  try {
    const counts = await window.supabaseUtils.countByStatus();
    console.log('Contagem por status:✅ Sucesso');
    console.log('Counts:', counts);
  } catch (error) {
    console.error('Erro ao contar por status:', error);
  }

  try {
    const tickets = await window.supabaseUtils.buscarPorRegiao('Centro');
    console.log('Buscar por região:✅ Sucesso');
    console.log('Chamados na região Centro:', tickets.length);
  } catch (error) {
    console.error('Erro ao buscar por região:', error);
  }

  console.log('\n=== Teste concluído ===');
}

// Função para criar dados de teste
async function criarDadosTeste() {
  console.log('=== Criando dados de teste ===');

  const chamadosTeste = [
    {
      title: 'Problema com internet',
      description: 'A internet está muito lenta e desconectando frequentemente.',
      status: 'a-fazer',
      regiao: 'Centro',
      urgency: 'alta'
    },
    {
      title: 'Vazamento de água',
      description: 'Há um vazamento de água na rua principal.',
      status: 'pendente',
      regiao: 'Sul',
      urgency: 'muito-alta'
    },
    {
      title: 'Buraco na via',
      description: 'Grande buraco na avenida principal causando acidentes.',
      status: 'concluido',
      regiao: 'Norte',
      urgency: 'media'
    }
  ];

  try {
    for (const chamado of chamadosTeste) {
      const result = await window.supabaseUtils.saveChamado(chamado);
      if (result) {
        console.log('Chamado criado:', result.id, result.title);
      }
    }
    console.log('Dados de teste criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar dados de teste:', error);
  }
}

// Função para limpar dados de teste
async function limparDadosTeste() {
  console.log('=== Limpando dados de teste ===');

  try {
    const success = await window.supabaseUtils.saveChamado({
      title: 'Limpeza de teste',
      description: 'Removendo chamados de teste',
      status: 'a-fazer',
      regiao: 'Centro'
    });

    if (success) {
      console.log('Dados de teste limpos com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
}

// Exportar para uso no index.html
window.supabaseTest = {
  testarConexao: testarConexaoSupabase,
  criarDadosTeste: criarDadosTeste,
  limparDadosTeste: limparDadosTeste
};

// Inicializar teste automaticamente
if (window.location.search.includes('test-supabase')) {
  testarConexaoSupabase();
}

console.log('Supabase Utils carregado com sucesso!');
console.log('Use: window.supabaseUtils para acessar as funções');
console.log('Use: window.supabaseTest.testarConexao() para testar a conexão');