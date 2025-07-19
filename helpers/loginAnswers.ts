export async function getLoginAnswers() {
  const req = await fetch(`/api/getAnswers`);
  const data = await req.json();
  let arr;
  if (data.status === 200 && data.message === "Success") {
    arr = data.data;
    return arr || [];
  }
  return [];
}
