import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as bcrypt from "bcrypt";
import { database } from '$lib';

export const load = (async ({ params }) => {

    const user = await database.user.findFirstOrThrow({ where: { id: Number.parseInt(params.id) } });
    const roles = await database.role.findMany();

    return { user, roles };
}) satisfies PageServerLoad;

export const actions = {
    edit: async ({ request, params }) => {
        // Extract form data from the request
        const data = await request.formData();

        // Extract username, email, and password from the form data
        const username = data.get('username')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const userRole = data.get('role')?.toString();

        // If any required field is missing, return an invalid response
        if (!email || !username) {
            return fail(401, { invalid: true });
        }

        // Check if a user already exists with the provided email
        const user = await database.user.findUnique({
            where: { email: email, username: username }
        });

        // If a user with the same email exists, return a conflict response
        if (user && user.id != Number.parseInt(params.id)) {
            return fail(407, { conflict: true });
        }

        const role = await database.role.findFirstOrThrow({ where: { name: userRole } });

        // Create a new user record in the database
        await database.user.update({
            where: { id: Number.parseInt(params.id) },
            data: {
                username: username,
                email: email,
                roleId: role.id
            }
        });

        if (password) {
            // Hash the password before storing it in the database
            const hash = await bcrypt.hash(password, 10);

            await database.user.update({
                where: { id: Number.parseInt(params.id) },
                data: {
                    password: hash,
                }
            });
        }

        // Redirect the user to the login page after successful registration
        throw redirect(302, '/users');
    },
    delete: async ({ params }) => {

        await database.user.delete({
            where: { id: parseInt(params.id) }
        });

        throw redirect(302, "/users");
    }
}