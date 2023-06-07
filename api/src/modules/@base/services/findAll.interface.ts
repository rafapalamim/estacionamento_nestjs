export interface IFindAllService<I, O> {
  execute(query: I): Promise<O>;
}
