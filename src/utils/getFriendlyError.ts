export const getFriendlyError = (err: unknown): string => {
  
  if (err && typeof err === "object" && "response" in err) {
    const response = (
      err as { response?: { status?: number; data?: any } }
    ).response;
    const statusCode = response?.status;
    let serverMessage = response?.data?.message;

    if (!serverMessage && typeof response?.data === "string") {
      try {
        const parsed = JSON.parse(response.data);
        serverMessage = parsed?.message;
      } catch {}
    }

    if (serverMessage) return serverMessage;

    if (statusCode === 400) return "The request was invalid. Please check your input.";
    if (statusCode === 401) return "Your session has expired. Please log in again.";
    if (statusCode === 403) return "You do not have permission to perform this action.";
    if (statusCode === 404) return "We couldn't find what you were looking for. Please try again.";
    if (statusCode === 429) return "You're doing that too much. Please wait a moment and try again.";
    if (statusCode && statusCode >= 500) return "Our servers are having a hiccup. Please try again in a moment.";
  }


    if (err instanceof Error) {
    const lowerMsg = err.message.toLowerCase();
    
    if (lowerMsg.includes("network") || lowerMsg.includes("failed to fetch")) {
      return "Please check your internet connection and try again.";
    }
    if (lowerMsg.includes("timeout")) {
      return "The request took too long. Please try again.";
    }
    
   
    if (lowerMsg.includes("unexpected token") || lowerMsg.includes("is not valid json")) {
      return "The server returned an unexpected response. Please try again later.";
    }

    if (err.message) {
      return err.message;
    }
  }


  return "An unexpected error occurred. Please try again.";
};