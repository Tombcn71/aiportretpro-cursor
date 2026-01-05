import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST() {
  try {
    console.log("🗑️ Clearing database...")

    // Delete in correct order to respect foreign key constraints
    await sql`DELETE FROM projects`
    console.log("✅ Cleared projects table")

    await sql`DELETE FROM purchases`
    console.log("✅ Cleared purchases table")

    await sql`DELETE FROM samples`
    console.log("✅ Cleared samples table")

    await sql`DELETE FROM models`
    console.log("✅ Cleared models table")

    await sql`DELETE FROM credits`
    console.log("✅ Cleared credits table")

    await sql`DELETE FROM users`
    console.log("✅ Cleared users table")

    // Reset sequences
    await sql`ALTER SEQUENCE IF EXISTS projects_id_seq RESTART WITH 1`
    await sql`ALTER SEQUENCE IF EXISTS purchases_id_seq RESTART WITH 1`
    await sql`ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1`
    await sql`ALTER SEQUENCE IF EXISTS models_id_seq RESTART WITH 1`
    await sql`ALTER SEQUENCE IF EXISTS samples_id_seq RESTART WITH 1`
    await sql`ALTER SEQUENCE IF EXISTS credits_id_seq RESTART WITH 1`
    console.log("✅ Reset all sequences")

    // Verify tables are empty
    const counts = await sql`
      SELECT 
        'users' as table_name, COUNT(*)::int as row_count FROM users
      UNION ALL
      SELECT 'purchases', COUNT(*)::int FROM purchases
      UNION ALL
      SELECT 'projects', COUNT(*)::int FROM projects
      UNION ALL
      SELECT 'models', COUNT(*)::int FROM models
      UNION ALL
      SELECT 'samples', COUNT(*)::int FROM samples
      UNION ALL
      SELECT 'credits', COUNT(*)::int FROM credits
    `

    return NextResponse.json({
      success: true,
      message: "Database cleared successfully",
      table_counts: counts,
    })
  } catch (error) {
    console.error("❌ Database clear error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Database clear failed",
      },
      { status: 500 }
    )
  }
}

