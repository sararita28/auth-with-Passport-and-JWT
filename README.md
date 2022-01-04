The tutorial will use a simple local (email/password) authentication using Express, Passport and JWT.

When the user logs in, the backend creates a signed token and returns it in response
The client saves the token locally (typically in localStorage) and sends it back in every subsequent request that needs authentication
All requests needing authentication pass through a middleware that checks the provided token and allows the request only if the token is verified
