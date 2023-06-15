export class RelatorioInput {
  estabelecimento_id?: number | null;
  data_inicio?: Date | null;
  data_fim?: Date | null;
}

export class RelatorioEstabelecimentosOutput {
  id: number;
  nome: string;
  endereco: string;
  desativado: boolean;
}
