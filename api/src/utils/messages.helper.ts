export const MessagesAPI = {
  ESTABELECIMENTO: {
    FIND: {
      NOT_FOUND: 'Estabelecimento não encontrado',
    },
    FIND_ALL: {
      NOT_FOUND:
        'Nenhum estabelecimento encontrado de acordo com o(s) filtro(s) escolhido(s)',
    },
    CREATE: {
      SERVER_ERROR: 'Não foi possível incluir o estabelecimento',
    },
    UPDATE: {
      SERVER_ERROR: 'Não foi possível atualizar os dados do estabelecimento',
      NOT_FOUND:
        'Não foi possível atualizar o estabelecimento. O estabelecimento não foi encontrado',
    },
    DESTROY: {
      SERVER_ERROR: 'Não foi possível excluir o estabelecimento',
      NOT_FOUND:
        'Não foi possível excluir o estabelecimento. O estabelecimento não foi encontrado',
    },
  },
  VEICULO: {
    FIND: {
      NOT_FOUND: 'Veículo não encontrado',
    },
    FIND_ALL: {
      NOT_FOUND:
        'Nenhum veículo encontrado de acordo com o(s) filtro(s) escolhido(s)',
    },
    CREATE: {
      SERVER_ERROR: 'Não foi possível incluir o veículo',
    },
    UPDATE: {
      SERVER_ERROR: 'Não foi possível incluir ou atualizar os dados do veículo',
      NOT_FOUND:
        'Não foi possível atualizar o veículo. O veículo não foi encontrado',
    },
    DESTROY: {
      SERVER_ERROR: 'Não foi possível excluir o veículo',
      NOT_FOUND:
        'Não foi possível excluir o veículo. O veículo não foi encontrado',
    },
  },
};
