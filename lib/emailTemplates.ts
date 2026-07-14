export function welcomeEmailTemplate(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; background:#F7F3EC; padding:32px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:24px; padding:32px;">
        <h1 style="color:#0F4C5C;">Welcome to MyDeepTalk 💙</h1>

        <p>Hello ${name || "Friend"},</p>

        <p>
          Welcome to MyDeepTalk.

          You have just taken the first step towards greater self-awareness, emotional healing, and a more meaningful 
		  connection with yourself.

          Before you begin your journey, please verify your email address to activate your account.(check on your 
		  spam folder too)
        </p>

        <p>
          Once verified, you'll be able to:

          ✨ Explore guided self-discovery journeys

          📝 Capture your thoughts in your private journal
          
          🤖 Have AI-guided reflective conversations
          
          🧠 Discover personalized insights
          
          👩‍⚕️ Connect with qualified therapists whenever you need support
          
          We are truly honoured to walk this journey with you.
        </p>

        <p style="margin-top:32px;">
          With warmth,<br/>
          <strong>The MyDeepTalk Team</strong>
        </p>
      </div>
    </div>
  `;
}