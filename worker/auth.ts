import { Client, Account } from 'node-appwrite';
import { Hono } from 'hono';

const auth = new Hono();

auth.get('/auth-info', async (c) => {
  const sessionToken = c.req.header('x-appwrite-jwt'); // or read from cookie

  console.log("requestDariHono", c.req);
  let client: Client
  let account: Account
  if (sessionToken != undefined) {
    client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setJWT(sessionToken); // 👈 important

    account = new Account(client);
  } else {
    return c.text("Unauthorized token", 403);
  }

  try {
    const user = await account.get();
    return c.json({ valid: true, user });
  } catch (err) {
    return c.json({ valid: false, error: err }, 401);
  }
});

export default auth;
