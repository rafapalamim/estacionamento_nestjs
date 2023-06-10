export interface IUpdateService<I, O> {
  execute(data: I): Promise<O>;
}
