interface EmailButtonProps {
  label: string;
  href: string;
}

export function EmailButton({
  label,
  href,
}: EmailButtonProps): string {
  return `
    <a
      href="${href}"
      style="
        display:inline-block;
        padding:14px 28px;
        background:#0F4C5C;
        color:#ffffff;
        text-decoration:none;
        border-radius:12px;
        font-weight:600;
        font-size:16px;
      "
    >
      ${label}
    </a>
  `;
}