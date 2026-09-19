/**
 * Data-access helpers for listing category records from the local SQLite database.
 * These helpers are designed to be injectable for tests and static build-time queries.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';

/**
 * Returns every category in the database, ordered by name.
 *
 * @param db - The Drizzle database instance to query.
 * @returns A list of category summaries containing each category's id and name.
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(asc(categories.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
