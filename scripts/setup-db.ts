import postgres from "postgres";

// Conexión directa a Supabase via postgres
const sql = postgres(
  "postgresql://postgres.ktjrfedcoagfcaifhgmf:41vKpWTzMmjVezof@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  { ssl: "require", max: 1, connect_timeout: 10 }
);

async function setup() {
  console.log("🔌 Conectando a Supabase...");

  try {
    await sql`SELECT 1`;
    console.log("✅ Conexión exitosa!");
  } catch (e) {
    console.error("❌ Error conectando:", e);
    await sql.end();
    process.exit(1);
  }

  console.log("📦 Creando tabla clientas...");

  await sql`
    CREATE TABLE IF NOT EXISTS public.clientas (
      id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      nombre            TEXT NOT NULL,
      whatsapp          TEXT NOT NULL,
      email             TEXT,
      tipo_cabello      TEXT,
      servicios         TEXT[],
      consulta          TEXT,
      acepta_newsletter BOOLEAN DEFAULT false,
      origen            TEXT DEFAULT 'web',
      creado_en         TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ Tabla clientas creada");

  await sql`
    CREATE INDEX IF NOT EXISTS idx_clientas_email
    ON public.clientas(email)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_clientas_whatsapp
    ON public.clientas(whatsapp)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_clientas_creado_en
    ON public.clientas(creado_en DESC)
  `;
  console.log("✅ Índices creados");

  // Row Level Security
  await sql`ALTER TABLE public.clientas ENABLE ROW LEVEL SECURITY`;

  // Policy: anon puede INSERT (el formulario web)
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'clientas' AND policyname = 'allow_insert_from_web'
      ) THEN
        EXECUTE 'CREATE POLICY allow_insert_from_web
          ON public.clientas FOR INSERT TO anon WITH CHECK (true)';
      END IF;
    END$$
  `;

  // Policy: autenticados pueden leer todo
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'clientas' AND policyname = 'allow_select_authenticated'
      ) THEN
        EXECUTE 'CREATE POLICY allow_select_authenticated
          ON public.clientas FOR SELECT TO authenticated USING (true)';
      END IF;
    END$$
  `;

  console.log("✅ Row Level Security configurado");

  // Verificar que todo esté OK insertando y borrando un registro de prueba
  const test = await sql`
    INSERT INTO public.clientas (nombre, whatsapp, email, origen)
    VALUES ('TEST_SETUP', '+56 9 0000 0000', 'test@setup.com', 'setup_script')
    RETURNING id
  `;
  const testId = test[0].id;
  await sql`DELETE FROM public.clientas WHERE id = ${testId}`;
  console.log("✅ Test de inserción y borrado OK");

  await sql.end();
  console.log("\n🎉 ¡Setup completo! La base de datos está lista.");
}

setup().catch(async (e) => {
  console.error("Error en setup:", e);
  await sql.end();
  process.exit(1);
});
