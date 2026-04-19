import { isAxiosError, type AxiosError } from "axios";

export class ApiError extends Error {
  readonly status?: number;
  readonly data?: unknown;
  readonly request?: unknown;

  constructor(
    message: string,
    options?: {
      status?: number;
      data?: unknown;
      request?: unknown;
      cause?: unknown;
    },
  ) {
    super(
      message,
      options?.cause !== undefined ? { cause: options.cause } : undefined,
    );
    this.name = "ApiError";
    this.status = options?.status;
    this.data = options?.data;
    this.request = options?.request;
  }
}

function toApiErrorFromAxios(error: AxiosError): ApiError {
  if (error.response) {
    const data = error.response.data ?? "API error response received";
    const message =
      typeof data === "string" ? data : "API error response received";
    return new ApiError(message, {
      status: error.response.status,
      data: error.response.data,
    });
  }
  if (error.request) {
    return new ApiError("No response received from API", {
      request: error.request,
    });
  }
  return new ApiError(error.message || "Axios error occurred");
}

export function handleErrorAxios(error: unknown): never {
  if (isAxiosError(error)) {
    throw toApiErrorFromAxios(error);
  }
  throw error;
}
