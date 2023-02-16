import { expireUserAuth, handleRequest, HttpCode } from '$lib/server';

export const get = handleRequest('logged', async (event) => {
  expireUserAuth(event);
  throw HttpCode.noContent();
});
