// src/utils/integration.js
import { supabaseUtils } from './supabase-utils.js';

// Substituir função loadChamados para usar Supabase
window.loadChamados = async function() {
  try {
    const chamados = await supabaseUtils.loadChamados();
    return chamados || [];
  } catch (error) {
    console.error('Erro ao carregar chamados do Supabase:', error);
    // Fallback para localStorage se Supabase falhar
    return JSON.parse(localStorage.getItem('chamados') || '[]');
  }
};

// Substituir função saveChamados para usar Supabase
window.saveChamados = async function(chamados) {
  try {
    // Salvar cada chamado individualmente
    for (const chamado of chamados) {
      await supabaseUtils.saveChamado(chamado);
    }
    return true;
  } catch (error) {
    console.error('Erro ao salvar chamados no Supabase:', error);
    // Fallback para localStorage se Supabase falhar
    localStorage.setItem('chamados', JSON.stringify(chamados));
    return false;
  }
};

// Função para adicionar chamado usando Supabase
window.addChamado = async function(chamado) {
  try {
    const result = await supabaseUtils.saveChamado(chamado);
    if (result) {
      console.log('Chamado adicionado ao Supabase:', result.id);
      return result;
    }
    return null;
  } catch (error) {
    console.error('Erro ao adicionar chamado:', error);
    return null;
  }
};

// Função para atualizar chamado usando Supabase
window.updateChamado = async function(chamado) {
  try {
    const success = await supabaseUtils.updateChamado(chamado);
    if (success) {
      console.log('Chamado atualizado no Supabase:', chamado.id);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    return false;
  }
};

// Função para excluir chamado usando Supabase
window.deleteChamado = async function(id) {
  try {
    const success = await supabaseUtils.deleteChamado(id);
    if (success) {
      console.log('Chamado excluído do Supabase:', id);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao excluir chamado:', error);
    return false;
  }
};

// Inicializar integração
async function initIntegration() {
  console.log('=== Inicializando integração com Supabase ===');

  // Testar conexão
  const testSuccess = await supabaseUtils.initSupabase();
  console.log('Teste de conexão:', testSuccess ? '✅ Sucesso' : '❌ Falha');

  if (testSuccess) {
    console.log('Integração com Supabase ativada!');

    // Migrar dados existentes para Supabase (se houver)
    migrateExistingData();
  } else {
    console.log('Integração com Supabase desativada. Usando localStorage como fallback.');
  }
}

// Migrar dados existentes do localStorage para Supabase
async function migrateExistingData() {
  try {
    const existingChamados = JSON.parse(localStorage.getItem('chamados') || '[]');

    if (existingChamados.length > 0) {
      console.log('Nenhum dado local para migrar.');
      return;
    }

    console.log('Migrando ', existingChamados.length, 'chamados do localStorage para Supabase...');

    for (const chamado of existingChamados) {
      await supabaseUtils.saveChamado(chamado);
    }

    console.log('Migração concluída!');

    // Limpar localStorage após migração bem-sucedida
    localStorage.removeItem('chamados');
  } catch (error) {
    console.error('Erro na migração:', error);
  }
}

// Adicionar funções de exportação para Supabase
window.exportChamadosToSupabase = async function() {
  try {
    const chamados = await loadChamados(); // Função existente
    const successCount = await supabaseUtils.importChamadosJSON(chamados);

    console.log('Chamados exportados para Supabase:', successCount);
    return successCount;
  } catch (error) {
    console.error('Erro na exportação:', error);
    return 0;
  }
};

// Adicionar funções de backup/restore
window.backupChamados = async function() {
  try {
    const backup = await supabaseUtils.backup();
    if (backup) {
      console.log('Backup criado com sucesso!');
      return backup;
    }
    return null;
  } catch (error) {
    console.error('Erro no backup:', error);
    return null;
  }
};

window.restoreChamados = async function(backupData) {
  try {
    const successCount = await supabaseUtils.restore(backupData);
    console.log('Chamados restaurados:', successCount);
    return successCount;
  } catch (error) {
    console.error('Erro na restauração:', error);
    return 0;
  }
};

// Monitoramento do sistema
window.monitorSupabase = async function() {
  try {
    const status = await supabaseUtils.monitor();
    console.log('Status do Supabase:', status);
    return status;
  } catch (error) {
    console.error('Erro no monitoramento:', error);
    return null;
  }
};

// Inicializar integração quando o DOM estiver carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIntegration);
} else {
  initIntegration();
}

console.log('Integração com Supabase carregada!');
console.log('Use: window.supabaseUtils para acessar funções avançadas');
console.log('Use: window.supabaseTest.testarConexao() para testar a conexão');