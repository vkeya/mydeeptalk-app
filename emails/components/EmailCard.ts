export function EmailCard(content: string): string {
  return `
  <div
    style="
      max-width:680px;
      margin:auto;
      background:#ffffff;
      border-radius:24px;
      padding:56px;
      border:1px solid #ECE7DF;
      box-shadow:
        0 12px 40px rgba(15,76,92,.08);
    "
  >
      ${content}
  </div>
  `;
}