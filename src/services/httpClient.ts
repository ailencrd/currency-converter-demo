export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);

    if (!res.ok) {
      throw new Error("Hubo un error obteniendo los datos");
    }

    const data = (await res.json()) as T;
    return data;
  }
}
