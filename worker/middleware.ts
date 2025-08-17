import { createMiddleware } from 'hono/factory';
import { Client, Account } from 'node-appwrite';

type Env = {
    APPWRITE_ENDPOINT: string,
    APPWRITE_PROJECT_ID: string
}

export const authMiddleware = createMiddleware<{ Bindings: Env }>(async (c, next) => {
    const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '');

    console.log(sessionToken);

    if (!sessionToken) {
        return c.text("Unauthorized", 401);
    }

    const client = new Client()
        .setEndpoint(c.env.APPWRITE_ENDPOINT)
        .setProject(c.env.APPWRITE_PROJECT_ID)
        .setJWT(sessionToken);

    const account = new Account(client);

    try {
        const user = await account.get();
        // @ts-ignore
        c.set('user', user); // Set user in context
        await next();
    } catch (err) {
        console.error("Authentication error:", err);
        return c.text("Unauthorized", 401);
    }
});
