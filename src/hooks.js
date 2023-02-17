/**
 * @param {string} cookieText
 * @returns {Record<string, string>}
 */
const cookieParse = (cookieText) =>
  cookieText.split(';').reduce((acc, assign) => {
    const [key, ...others] = assign.split('=');
    if (key) {
      const value = others.join('=');
      acc[decodeURIComponent(key.trim())] = value.length ? decodeURIComponent(value) : true;
    }
    return acc;
  }, {});

/**
 * @param {Record<string, string>} cookies
 * @returns {string}
 */
const cookieSerialize = (cookies) =>
  Object.entries(cookies)
    .map(([key, value]) =>
      value === true
        ? encodeURIComponent(key)
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('; ');

const MAX_SAFE_HEXA = Number.MAX_SAFE_INTEGER.toString(16).toLowerCase();
const MAX_SAFE_HEXA_INTEGER = MAX_SAFE_HEXA.startsWith('f')
  ? Number.MAX_SAFE_INTEGER
  : Math.pow(16, MAX_SAFE_HEXA.length - 1) - 1;

/**
 * @param {number} length
 * @returns {string}
 */
const genHexa = (length) => {
  let hexa = '';
  while (hexa.length < length) {
    hexa += Math.trunc(Math.random() * MAX_SAFE_HEXA_INTEGER).toString(16);
  }
  return hexa.substring(0, length);
};

/**
 * @param {number} version
 * @returns {string}
 */
const generateUUID = (version = Math.trunc(Math.random() * 6)) => {
  const key = Math.trunc(8 + Math.random() * 4).toString(16);
  return `${genHexa(8)}-${genHexa(4)}-${version}${genHexa(3)}-${key}${genHexa(3)}-${genHexa(12)}`;
};

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const cookies = cookieParse(event.request.headers.get('cookie') || '');
  event.locals.userid = cookies['userid'] || generateUUID(4);

  const response = await resolve(event);

  if (!cookies['userid']) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
      'set-cookie',
      cookieSerialize({
        userid: event.locals.userid,
        path: '/',
        httpOnly: true
      })
    );
  }

  return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = async (event) => {
  return { userid: event.locals.userid };
};
