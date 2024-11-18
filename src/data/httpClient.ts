type ApiArgs = Parameters<typeof fetch>;

export const httpClient = <T>(
  url: ApiArgs[0],
  apiToken: string,
  init?: ApiArgs[1],
): Promise<T> => {
  if (!url || !apiToken) {
    throw new Error('Missing required arguments');
  }

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
  }).then((res) => res.json());
};
