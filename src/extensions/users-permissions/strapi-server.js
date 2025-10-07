// Path: src/extensions/users-permissions/strapi-server.js

module.exports = (plugin) => {
  // Get the original local login controller
  const originalLocalLoginController = plugin.controllers['auth'].local;

  // Override the `local` controller
  plugin.controllers['auth'].local = async (ctx) => {
    // 1. First, execute the original Strapi login logic.
    // This will handle authentication, password checking, and JWT generation.
    // It places the generated 'user' and 'jwt' on the context state.
    await originalLocalLoginController(ctx);

    // 2. Access the user and JWT from the request context state.
    const { user, jwt } = ctx.state;

    // 3. If the login was successful, rebuild the response body.
    if (user && jwt) {
      // THIS IS THE CRITICAL PART: Replace the entire response body.
      // This will ensure no extra data from the user object is included.
      ctx.body = {
        jwt: jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          // You can add other fields here if needed.
        },
      };
    }
  };

  return plugin;
};