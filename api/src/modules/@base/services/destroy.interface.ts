export interface IDestroyService {
  execute(id: number): Promise<void>;
}
