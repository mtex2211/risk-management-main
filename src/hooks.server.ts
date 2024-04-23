import { database } from '$lib';
import { redirect } from '@sveltejs/kit';
import * as bcrypt from "bcrypt";

export async function handle({ event, resolve }) {
    await setup();

    const session = event.cookies.get('session');

    if (event.url.pathname.startsWith("/login") && session) {
        throw redirect(302, '/');
    }

    if (session) {
        // Fetch user details based on the session ID from the 'session' cookie
        const user = await database.user.findUnique({
            where: { id: Number.parseInt(session) },
            select: { id: true, email: true }
        });

        if (user) {
            event.locals.user = user;
        }
    }

    // Resolve the incoming event and get the response
    const response = await resolve(event);
    return response;
}


async function setup() {
    const admin = await database.role.findFirst({ where: { name: "admin" } });

    if (!admin) {
        await database.role.create({
            data: {
                name: "admin"
            }
        });
    } else {
        const user = await database.user.findFirst({
            where: {
                username: "admin",
                email: "admin@system.com",
                roleId: admin.id,
            }
        });

        if (!user) {
            await database.user.create({
                data: {
                    username: "admin",
                    email: "admin@system.com",
                    roleId: admin.id,
                    password: await bcrypt.hash("pass1234", 10),
                }
            })
        }
    }
}