import postgres from "postgres";

const sql = postgres(
  "postgresql://postgres.ktjrfedcoagfcaifhgmf:41vKpWTzMmjVezof@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  { ssl: "require", max: 1, connect_timeout: 10 }
);

async function migrate() {
  console.log("🔌 Conectando a Supabase...");
  await sql`SELECT 1`;
  console.log("✅ Conectado\n");

  console.log("📦 Actualizando tabla clientas con nuevas columnas...");

  // Separar nombre en nombre + apellido
  await sql`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS apellido TEXT`;

  // Cómo nos conociste (atribución)
  await sql`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS como_nos_conocio TEXT`;

  // Fecha de nacimiento para cumpleaños
  await sql`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE`;

  // Ya es clienta (vs nueva clienta)
  await sql`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS ya_es_clienta BOOLEAN DEFAULT false`;

  // Motivo de consulta (texto libre — lo que viene a buscar en sus palabras)
  // Renombrar semánticamente: consulta pasa a ser motivo_consulta
  await sql`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS motivo_consulta TEXT`;

  // WhatsApp en formato limpio para wa.me (ej: 56912345678)
  await sql`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS whatsapp_url TEXT`;

  console.log("✅ Columnas agregadas:");
  console.log("   - apellido");
  console.log("   - como_nos_conocio");
  console.log("   - fecha_nacimiento");
  console.log("   - ya_es_clienta");
  console.log("   - motivo_consulta");
  console.log("   - whatsapp_url");

  // Índice por apellido para ordenar
  await sql`CREATE INDEX IF NOT EXISTS idx_clientas_apellido ON public.clientas(apellido)`;
  // Índice por fecha de nacimiento para cumpleaños automáticos
  await sql`CREATE INDEX IF NOT EXISTS idx_clientas_nacimiento ON public.clientas(fecha_nacimiento)`;

  console.log("✅ Índices creados");

  // Verificar estructura final
  const cols = await sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'clientas' AND table_schema = 'public'
    ORDER BY ordinal_position
  `;

  console.log("\n📋 Estructura final de la tabla clientas:");
  cols.forEach(c => console.log(`   ${c.column_name.padEnd(22)} ${c.data_type.padEnd(20)} ${c.is_nullable === 'YES' ? '(opcional)' : '(requerido)'}`));

  await sql.end();
  console.log("\n🎉 Migración completada exitosamente!");
}

migrate().catch(async (e) => {
  console.error("Error en migración:", e);
  await sql.end();
  process.exit(1);
});
