export interface RestDataSourceOptionsWithParams {
  params?: Record<string, unknown>;
}

export interface RestDataSourceOptionsWithData<D = unknown> {
  data?: D;
}

export interface IRestDataSource {
  get<T>(url: string, options?: RestDataSourceOptionsWithParams): Promise<T>;
  post<T, D>(url: string, options?: RestDataSourceOptionsWithData<D>): Promise<T>;
}
