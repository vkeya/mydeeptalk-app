import { EmailHeader } from "./EmailHeader";
import { EmailCard } from "./EmailCard";
import { EmailFooter } from "./EmailFooter";
import { colors, font } from "./EmailStyles";

interface EmailLayoutProps {
  previewText?: string;
  content: string;
}

export function EmailLayout({
  previewText = "",
  content,
}: EmailLayoutProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>MyDeepTalk</title>

<style>
body{
    margin:0;
    padding:0;
    background:${colors.background};
    font-family:${font.family};
}
</style>

</head>

<body>

<div
style="
background:${colors.background};
padding:50px 20px;
"
>

<div style="display:none;max-height:0;overflow:hidden;">
${previewText}
</div>

${EmailHeader()}

${EmailCard(content)}

${EmailFooter()}

</div>

</body>
</html>
`;
}