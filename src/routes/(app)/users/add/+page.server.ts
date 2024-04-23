import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as bcrypt from "bcrypt";
import { database } from '$lib';

export const load = (async () => {

    const roles = await database.role.findMany();

    return {roles};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        // Extract form data from the request
        const data = await request.formData();

        // Extract username, email, and password from the form data
        const username = data.get('username')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const userRole = data.get('role')?.toString();

        // If any required field is missing, return an invalid response
        if (!email || !password || !username) {
            return fail(401, { invalid: true });
        }

        // Check if a user already exists with the provided email
        const user = await database.user.findUnique({
            where: { email: email, username: username }
        });

        // If a user with the same email exists, return a conflict response
        if (user) {
            return fail(407, { conflict: true });
        }

        // Hash the password before storing it in the database
        const hash = await bcrypt.hash(password, 10);

        const role = await database.role.findFirstOrThrow({ where: { name: userRole } });

        // Create a new user record in the database
        await database.user.create({
            data: {
                username: username,
                email: email,
                password: hash,
                roleId: role.id
            }
        });

        // Redirect the user to the login page after successful registration
        throw redirect(302, '/users');
    }
}