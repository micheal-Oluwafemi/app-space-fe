import { GetRequestProps, PostRequestProps } from "@/types/http-request";
import axios from "axios";

// Helper function to extract error messages
const extractErrorMessages = (
  error: any,
  defaultErrorMessage: string | undefined,
): string => {
  if (error.response && error.response.data) {
    // If we have detailed errors object, use that
    if (error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join(". ");
      return errorMessages;
    }
    // If only message is present, use that
    else if (error.response.data.message) {
      return error.response.data.message;
    }
    // Handle errors in the format { err: [messages] }
    else if (error.response.data.err && error.response.data.err[0]) {
      return error.response.data.err[0];
    }
  }
  return defaultErrorMessage || "An error occurred try again";
};

export const GetRequest = async ({
  url,
  setState,
  errorMessage,
}: GetRequestProps): Promise<{ data: any; err: string | null }> => {
  try {
    if (setState) {
      setState(true);
    }
    const token = localStorage.getItem("user-token");

    const { data } = await axios.get(url, {
      headers: {
        token,
      },
    });

    if (!data.err) {
      return { data, err: null };
    } else {
      return { data: null, err: data.err[0] };
    }
  } catch (error: any) {
    console.log(error);
    return { data: null, err: extractErrorMessages(error, errorMessage) };
  } finally {
    if (setState) {
      setState(false);
    }
  }
};

export const PostRequest = async ({
  url,
  setState,
  body,
  errorMessage,
}: PostRequestProps): Promise<{ data: any; err: string | null }> => {
  try {
    if (setState) {
      setState(true);
    }
    const Authorization = "Bearer " + localStorage.getItem("user-token");

    const { data } = await axios.post(url, body, {
      headers: {
        Authorization,
      },
    });

    if (!data.err) {
      return { data, err: null };
    } else {
      return { data: null, err: data.err[0] };
    }
  } catch (error: any) {
    return { data: null, err: extractErrorMessages(error, errorMessage) };
  } finally {
    if (setState) {
      setState(false);
    }
  }
};

export const PatchJSON = async ({
  url,
  setState,
  errorMessage,
  body,
}: PostRequestProps): Promise<{ data: any; err: string | null }> => {
  try {
    if (setState) {
      setState(true);
    }
    const token = localStorage.getItem("user-token");

    const { data } = await axios.patch(url, body, {
      headers: {
        token,
      },
    });

    if (!data.err) {
      return { data, err: null };
    } else {
      return { data: null, err: data.err[0] };
    }
  } catch (error: any) {
    console.log(error);
    return { data: null, err: extractErrorMessages(error, errorMessage) };
  } finally {
    if (setState) {
      setState(false);
    }
  }
};

export const PatchAppend = async ({
  url,
  setState,
  errorMessage,
  body,
}: PostRequestProps): Promise<{ data: any; err: string | null }> => {
  try {
    if (setState) {
      setState(true);
    }
    const token = localStorage.getItem("user-token");
    body.append("_method", "PATCH");

    const { data } = await axios.post(url, body, {
      headers: {
        token,
      },
    });

    if (!data.err) {
      return { data, err: null };
    } else {
      return { data: null, err: data.err[0] };
    }
  } catch (error: any) {
    console.log(error);
    return { data: null, err: extractErrorMessages(error, errorMessage) };
  } finally {
    if (setState) {
      setState(false);
    }
  }
};

export const DeleteRequest = async ({
  url,
  setState,
  errorMessage,
}: GetRequestProps): Promise<{ data: any; err: string | null }> => {
  try {
    if (setState) {
      setState(true);
    }
    const token = localStorage.getItem("user-token");

    const { data } = await axios.delete(url, {
      headers: {
        token,
      },
    });

    if (!data.err) {
      return { data, err: null };
    } else {
      return { data: null, err: data.err[0] };
    }
  } catch (error: any) {
    console.log(error);
    return { data: null, err: extractErrorMessages(error, errorMessage) };
  } finally {
    if (setState) {
      setState(false);
    }
  }
};
