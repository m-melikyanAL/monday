export interface IApiRequest {
  url?: string;
  body?: object;
  headers?: object;
  isAuth?: boolean;
  method: string;
}
export type TitemsType = {
  id: number;
  name: string;
  state: string;
  created_at: string;
  column_values:{id:string;text:string;value:string}[]
};
