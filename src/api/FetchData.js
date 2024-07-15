export async function fetchData(
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const url = `${API_ENDPOINT}${endpoint}`;

  const options = {
    method: method,
    headers: {
      ...headers,
      Accept: headers.Accept ? headers.Accept : "application/json",
    },
    credentials: "include",
  };

  if (data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers["Content-Type"] = headers["Content-Type"]
        ? headers["Content-Type"]
        : "application/json";
      options.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.startsWith("image/")) {
      return { blob: await response.blob() };
    } else if (contentType && contentType.startsWith("application/json")) {
      const responseData = await response.json();
      if (response.ok) {
        return responseData;
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "An unexpected error occurred"
        );
      }
    } else if (contentType && contentType.startsWith("text/xml")) {
      const responseText = await response.text();
      return { text: responseText };
    }

    throw new Error("Unsupported content type: " + contentType);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
