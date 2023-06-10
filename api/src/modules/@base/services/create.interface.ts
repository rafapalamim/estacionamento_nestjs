export interface ICreateService<I, O> {
  execute(data: I): Promise<O>;
}
