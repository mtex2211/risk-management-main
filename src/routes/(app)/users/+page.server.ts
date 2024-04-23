import { database } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    const users = await database.user.findMany({ where: { id: { not: 1 } }, include: { role: true } })

    return {
        users
    };
}) satisfies PageServerLoad;