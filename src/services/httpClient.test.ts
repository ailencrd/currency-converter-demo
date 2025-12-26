import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import { HttpClient, HttpError } from "./httpClient";

describe("HttpError", () => {
  it("creates an HttpError with message and status", () => {
    const error = new HttpError("Error de prueba", 404);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe("HttpError");
    expect(error.message).toBe("Error de prueba");
    expect(error.status).toBe(404);
  });

  it("allows creating an HttpError without status", () => {
    const error = new HttpError("Error sin status");

    expect(error.status).toBeUndefined();
  });
});

describe("HttpClient", () => {
  const baseUrl = "https://api.test.com";
  const client = new HttpClient(baseUrl);

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("calls fetch with the correct URL", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    await client.get("/test");

    expect(fetch).toHaveBeenCalledWith("https://api.test.com/test");
  });

  it("returns parsed JSON when response is ok", async () => {
    const responseData = { value: 123 };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseData),
    });

    const result = await client.get<typeof responseData>("/data");

    expect(result).toEqual(responseData);
  });

  it("throws HttpError on network error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    await expect(client.get("/fail")).rejects.toEqual(
      expect.objectContaining({
        name: "HttpError",
        message: "No se pudo conectar con el servidor",
      })
    );
  });

  it("throws HttpError with correct message and status on 404", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(client.get("/not-found")).rejects.toEqual(
      expect.objectContaining({
        message: "El recurso solicitado no existe o fue eliminado.",
        status: 404,
      })
    );
  });

  it("throws HttpError with correct message on 400", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 400,
    });

    await expect(client.get("/bad-request")).rejects.toEqual(
      expect.objectContaining({
        message:
          "La solicitud no pudo procesarse. Intentá cambiar las monedas.",
        status: 400,
      })
    );
  });

  it("throws HttpError with default message for unknown status", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 999,
    });

    await expect(client.get("/unknown")).rejects.toEqual(
      expect.objectContaining({
        message: "Ocurrió un error inesperado",
        status: 999,
      })
    );
  });
});
