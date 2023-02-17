import { expireUserAuth, handleRequest, HttpCode } from '$lib/server';

export const get = handleRequest('logged', async (event) => {
  await expireUserAuth(event);
  throw HttpCode.noContent();
});
