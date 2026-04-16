// src/utils/supabase-utils.js
import { supabase } from '../services/supabase.js';

// Carregar chamados do Supabase
export async function loadChamadosFromSupabase() {
  try {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar chamados:', error);
      return [];
    }

    return tickets || [];
  } catch (error) {
    console.error('Erro inesperado:', error);
    return [];
  }
}

// Salvar chamado no Supabase
export async function saveChamadoToSupabase(chamado) {
  try {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert({
        title: chamado.title,
        description: chamado.description,
        status: chamado.status || 'a-fazer',
        user_id: chamado.user_id || 'user-123',
        regiao: chamado.regiao || 'Centro'
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar chamado:', error);
      return null;
    }

    return ticket;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return null;
  }
}

// Atualizar chamado no Supabase
export async function updateChamadoToSupabase(chamado) {
  try {
    const { error } = await supabase
      .from('tickets')
      .update({
        title: chamado.title,
        description: chamado.description,
        status: chamado.status,
        regiao: chamado.regiao
      })
      .eq('id', chamado.id);

    if (error) {
      console.error('Erro ao atualizar chamado:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return false;
  }
}

// Excluir chamado do Supabase
export async function deleteChamadoFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir chamado:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return false;
  }
}

// Carregar respostas de chamados
export async function loadRespostasFromSupabase(ticketId) {
  try {
    const { data: responses, error } = await supabase
      .from('ticket_responses')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar respostas:', error);
      return [];
    }

    return responses || [];
  } catch (error) {
    console.error('Erro inesperado:', error);
    return [];
  }
}

// Salvar resposta de chamado
export async function saveRespostaToSupabase(ticketId, content, userId = 'user-123') {
  try {
    const { data: response, error } = await supabase
      .from('ticket_responses')
      .insert({
        ticket_id: ticketId,
        user_id: userId,
        content: content
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar resposta:', error);
      return null;
    }

    return response;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return null;
  }
}

// Inicializar o Supabase (testar conexão)
export async function initSupabase() {
  try {
    const { data, error } = await supabase.from('tickets').select().limit(1);

    if (error) {
      console.error('Erro na inicialização:', error);
      return false;
    }

    console.log('Supabase inicializado com sucesso! Registros encontrados:', data?.length || 0);
    return true;
  } catch (error) {
    console.error('Erro inesperado na inicialização:', error);
    return false;
  }
}

// Verificar se tabela existe
export async function checkTableExists(tableName) {
  try {
    const { data, error } = await supabase.rpc('check_table_exists', { table_name: tableName });

    if (error) {
      console.error('Erro ao verificar tabela:', error);
      return false;
    }

    return data?.exists || false;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return false;
  }
}

// Criar índice se não existir
export async function createIndexIfNotExists(indexName, tableName, column) {
  try {
    const { error } = await supabase.rpc('create_index_if_not_exists', {
      index_name: indexName,
      table_name: tableName,
      column_name: column
    });

    if (error) {
      console.error('Erro ao criar índice:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return false;
  }
}

// Contar chamados por status
export async function countChamadosByStatus() {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('status, count(*)')
      .group('status');

    if (error) {
      console.error('Erro ao contar chamados:', error);
      return {};
    }

    const counts = {};
    data.forEach(item => {
      counts[item.status] = parseInt(item.count);
    });

    return counts;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return {};
  }
}

// Buscar chamados por região
export async function buscarChamadosPorRegiao(regiao) {
  try {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('regiao', regiao)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar por região:', error);
      return [];
    }

    return tickets || [];
  } catch (error) {
    console.error('Erro inesperado:', error);
    return [];
  }
}

// Buscar chamados por urgência
export async function buscarChamadosPorUrgencia(urgencia) {
  try {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('urgency', urgencia)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar por urgência:', error);
      return [];
    }

    return tickets || [];
  } catch (error) {
    console.error('Erro inesperado:', error);
    return [];
  }
}

// Atualizar status do chamado
export async function updateStatusChamado(id, novoStatus) {
  try {
    const { error } = await supabase
      .from('tickets')
      .update({ status: novoStatus })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return false;
  }
}

// Função de busca avançada
export async function buscarChamados(query, filters = {}) {
  try {
    let builder = supabase.from('tickets').select('*').order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters.status) builder = builder.eq('status', filters.status);
    if (filters.regiao) builder = builder.eq('regiao', filters.regiao);
    if (filters.urgency) builder = builder.eq('urgency', filters.urgency);
    if (filters.user_id) builder = builder.eq('user_id', filters.user_id);

    // Aplicar busca
    if (query) {
      builder = builder.or(`title.ilike.%${query}%, description.ilike.%${query}%`);
    }

    const { data: tickets, error } = await builder;

    if (error) {
      console.error('Erro na busca:', error);
      return [];
    }

    return tickets || [];
  } catch (error) {
    console.error('Erro inesperado:', error);
    return [];
  }
}

// Exportar chamados para CSV
export async function exportarChamadosCSV() {
  try {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao exportar:', error);
      return null;
    }

    if (!tickets || tickets.length === 0) return null;

    // Criar CSV
    let csv = 'ID,Título,Descrição,Status,Região,Urgência,Data\n';
    tickets.forEach(ticket => {
      const line = [
        ticket.id,
        ticket.title.replace(/"/g, '""'),
        ticket.description?.replace(/"/g, '""') || '',
        ticket.status,
        ticket.regiao || '',
        ticket.urgency || '',
        ticket.created_at
      ].join('","');
      csv += `"${line}"\n`;
    });

    return csv;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return null;
  }
}

// Exportar chamados para JSON
export async function exportarChamadosJSON() {
  try {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao exportar:', error);
      return null;
    }

    return tickets || [];
  } catch (error) {
    console.error('Erro inesperado:', error);
    return null;
  }
}

// Importar chamados de JSON
export async function importarChamadosJSON(chamados) {
  try {
    if (!Array.isArray(chamados) || chamados.length === 0) {
      return 0;
    }

    const results = [];
    for (const chamado of chamados) {
      const { data: ticket, error } = await supabase
        .from('tickets')
        .insert({
          title: chamado.title,
          description: chamado.description,
          status: chamado.status || 'a-fazer',
          user_id: chamado.user_id || 'user-123',
          regiao: chamado.regiao || 'Centro',
          urgency: chamado.urgency || 'media'
        })
        .select()
        .single();

      if (!error) {
        results.push(ticket);
      }
    }

    return results.length;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return 0;
  }
}

// Limpar dados de teste
export async function limparDadosTeste() {
  try {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('user_id', 'user-123');

    if (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro inesperado:', error);
    return false;
  }
}

// Função de backup
export async function backupDados() {
  try {
    const tickets = await exportarChamadosJSON();
    const responses = await loadRespostasFromSupabase('*');

    return {
      backup_date: new Date().toISOString(),
      tickets: tickets || [],
      responses: responses || []
    };
  } catch (error) {
    console.error('Erro no backup:', error);
    return null;
  }
}

// Restaurar backup
export async function restaurarBackup(backupData) {
  try {
    if (!backupData || !backupData.tickets) {
      return 0;
    }

    const results = [];
    for (const chamado of backupData.tickets) {
      const { data: ticket, error } = await supabase
        .from('tickets')
        .insert({
          id: chamado.id,
          title: chamado.title,
          description: chamado.description,
          status: chamado.status,
          user_id: chamado.user_id,
          regiao: chamado.regiao,
          urgency: chamado.urgency,
          created_at: chamado.created_at,
          updated_at: chamado.updated_at
        })
        .select()
        .single();

      if (!error) {
        results.push(ticket);
      }
    }

    return results.length;
  } catch (error) {
    console.error('Erro na restauração:', error);
    return 0;
  }
}

// Função de monitoramento
export async function monitorarSistema() {
  try {
    const [ticketsCount, responsesCount] = await Promise.all([
      supabase.from('tickets').count().then(r => r.data.count),
      supabase.from('ticket_responses').count().then(r => r.data.count)
    ]);

    return {
      total_tickets: ticketsCount,
      total_responses: responsesCount,
      uptime: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro no monitoramento:', error);
    return null;
  }
}

// Exportar para uso no index.html
window.supabaseUtils = {
  loadChamados: loadChamadosFromSupabase,
  saveChamado: saveChamadoToSupabase,
  updateChamado: updateChamadoToSupabase,
  deleteChamado: deleteChamadoFromSupabase,
  loadRespostas: loadRespostasFromSupabase,
  saveResposta: saveRespostaToSupabase,
  countByStatus: countChamadosByStatus,
  buscarPorRegiao: buscarChamadosPorRegiao,
  buscarPorUrgencia: buscarChamadosPorUrgencia,
  updateStatus: updateStatusChamado,
  buscar: buscarChamados,
  exportCSV: exportarChamadosCSV,
  exportJSON: exportarChamadosJSON,
  importJSON: importarChamadosJSON,
  backup: backupDados,
  restore: restaurarBackup,
  monitor: monitorarSistema
};