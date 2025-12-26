export class HttpError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}


export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    let res: Response;

    try {
      res = await fetch(`${this.baseUrl}${path}`);
    } catch {
      // error de red
      throw new HttpError(
        "No se pudo conectar con el servidor",
      );
    }

    if (!res.ok) {
      throw new HttpError(
        this.getErrorMessage(res.status),
        res.status
      );
    }

    return (await res.json()) as T;
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return "La solicitud no pudo procesarse. Intentá cambiar las monedas.";
      case 404:
        return "El recurso solicitado no existe o fue eliminado.";
      case 422:
        return "La moneda solicitada no está disponible";
      case 429:
        return "Realizaste demasiadas solicitudes en poco tiempo";
      case 500:
        return "Error interno del servidor";
      default:
        return "Ocurrió un error inesperado";
    }
  }
}
