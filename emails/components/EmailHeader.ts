export function EmailHeader(): string {
  return `
    <div
      style="
        text-align:center;
        padding-bottom:40px;
      "
    >

      <img
        src="https://mydeeptalk.com/images/logo-new.png"
        alt="MyDeepTalk"
        style="
          width:170px;
          max-width:100%;
          margin-bottom:24px;
        "
      />

      <h1
        style="
          color:#0F4C5C;
          font-size:34px;
          margin:0;
          font-weight:700;
        "
      >
        Welcome to MyDeepTalk
      </h1>

      <p
        style="
          margin-top:18px;
          font-size:18px;
          line-height:1.8;
          color:#6B7280;
          max-width:520px;
          margin-left:auto;
          margin-right:auto;
        "
      >
        A safe place for healing,
        self-discovery,
        emotional wellness
        and meaningful conversations.
      </p>

    </div>
  `;
}