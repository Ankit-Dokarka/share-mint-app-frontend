export const getFriendlyError = (err: unknown): string => {
  if (err && typeof err === "object" && "response" in err) {
    const response = (
      err as { response?: { status?: number; data?: { message?: string } } }
    ).response;
    const statusCode = response?.status;
    const serverMessage = response?.data?.message;

    if (statusCode === 400) {
      return (
        serverMessage || "The request was invalid. Please check your input."
      );
    }
    if (statusCode === 401) {
      return "Your session has expired. Please log in again.";
    }
    if (statusCode === 403) {
      return "You do not have permission to perform this action.";
    }
    if (statusCode === 404) {
      return "We couldn't find what you were looking for. Please try again.";
    }
    if (statusCode === 429) {
      return "You're doing that too much. Please wait a moment and try again.";
    }
    if (statusCode && statusCode >= 500) {
      return "Our servers are having a hiccup. Please try again in a moment.";
    }

    if (serverMessage) {
      return serverMessage;
    }
  }

  if (err instanceof Error) {
    if (err.message.toLowerCase().includes("network")) {
      return "Please check your internet connection and try again.";
    }
    if (err.message.toLowerCase().includes("timeout")) {
      return "The request took too long. Please try again.";
    }
  }

  return "An unexpected error occurred. Please try again.";
};
