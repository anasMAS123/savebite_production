export async function GET() {
  const requst = await fetch(`${process.env.DATABASE_URL}/login_answers`);
  return requst;
}
