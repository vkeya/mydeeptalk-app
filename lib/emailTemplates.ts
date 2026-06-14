export function welcomeEmailTemplate(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; background:#F7F3EC; padding:32px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:24px; padding:32px;">
        <h1 style="color:#0F4C5C;">Welcome to MyDeepTalk 💙</h1>

        <p>Hello ${name || "Friend"},</p>

        <p>
          Thank you for joining MyDeepTalk. We are honored to walk with you on
          your journey toward healing, self-discovery, and emotional wellness.
        </p>

        <p>
          Please verify your email address to activate your account and begin
          your journey.
        </p>

        <p style="margin-top:32px;">
          Warm regards,<br/>
          <strong>MyDeepTalk Team</strong>
        </p>
      </div>
    </div>
  `;
}