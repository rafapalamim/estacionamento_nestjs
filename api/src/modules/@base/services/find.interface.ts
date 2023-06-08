export interface IFindService<O> {
  execute(id: number): Promise<O>;
}
