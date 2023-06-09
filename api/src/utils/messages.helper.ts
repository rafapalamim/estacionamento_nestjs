const MessagesEstabelecimento = {
  FIND: { NOT_FOUND: 'Estabelecimento não encontrado' },
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
};

const MessagesVeiculo = {
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
};

const MessagesControle = {
  FIND: {
    NOT_FOUND: 'Entrada não encontrada',
  },
  FIND_ALL: {
    NOT_FOUND:
      'Nenhuma entrada encontrada de acordo com o(s) filtro(s) escolhido(s)',
  },
  CREATE: {
    SERVER_ERROR: 'Não foi possível incluir a entrada do veículo',
    LIMIT: 'O estabelecimento está sem vagas para o seu tipo de véiculo',
    VEHICLE_WRONG_DATA:
      'Não foi possível salvar a entrada. Os dados do novo veículo estão incorretos',
    VEHICLE_EMPTY_DATA:
      'Não foi possível salvar a entrada. Os dados do novo veículo não foram informados',
    VEHICLE_INSIDE_COMPANY:
      'O veículo está com uma entrada sem saída. Encerre a anterior para liberar',
  },
  UPDATE: {
    SERVER_ERROR: 'Não foi possível incluir a saída do veículo',
    BAD_REQUEST: 'Não é possível registrar a saída mais de uma vez',
    NOT_FOUND:
      'Não foi possível incluir a saída o veículo. A entrada não foi encontrada',
  },
  DESTROY: {
    SERVER_ERROR: 'Não foi possível excluir a entrada',
    BAD_REQUEST:
      'Não foi possível excluir a entrada. A entrada já está excluida',
    NOT_FOUND:
      'Não foi possível excluir a entrada. A entrada não foi encontrada',
  },
};

export const MessagesAPI = {
  ESTABELECIMENTO: MessagesEstabelecimento,
  VEICULO: MessagesVeiculo,
  CONTROLE: MessagesControle,
};
