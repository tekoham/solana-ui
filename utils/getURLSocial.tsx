// twitter oauth Url constructor
export function getTwitterOauthUrl() {
  const rootUrl = "https://twitter.com/i/oauth2/authorize";
  const options: any = {
    redirect_uri: process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
    state: "state",
    response_type: "code",
    code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
    code_challenge_method: "S256",
    scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
      " "
    ), // add/remove scopes as needed
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}

export function getDiscordLink() {
  const rootUrl = "https://discord.com/api/oauth2/authorize";
  const options: any = {
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    response_type: "code",
    scope: ["identify", "email"].join(" "), // add/remove scopes as needed
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}
