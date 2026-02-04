export async function sendMessage(message: string): Promise<{ reply: string }> {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    throw new Error("Server error");
  }

  return res.json();
}
