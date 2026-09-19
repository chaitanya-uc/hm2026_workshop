/**
 * Data-access helpers for listing publisher records from the local SQLite database.
 * These helpers are designed to be injectable for tests and static build-time queries.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher in the database, ordered by name.
 *
 * @param db - The Drizzle database instance to query.
 * @returns A list of publisher summaries containing each publisher's id and name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
