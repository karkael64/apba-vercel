import * as cookie from 'cookie';

/**
 * @param {number} length
 * @returns {string}
 */
const genHexa = (length) => {
  let hexa = '';
  while (hexa.length < length) {
    hexa += Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
  }
  return hexa;
};

const generateUUID = (version = Math.trunc(Math.random() * 6)) => {
  const key = Math.trunc(8 + Math.random() * 4).toString(16);
  return `${genHexa(8)}-${genHexa(4)}-${version}${genHexa(3)}-${key}${genHexa(3)}-${genHexa(12)}`;
};

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  event.locals.userid = cookies['userid'] || generateUUID(4);

  const response = await resolve(event);

  if (!cookies['userid']) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
      'set-cookie',
      cookie.serialize('userid', event.locals.userid, {
        path: '/',
        httpOnly: true
      })
    );
  }

  return response;
};
