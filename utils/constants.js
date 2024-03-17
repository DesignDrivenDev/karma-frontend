//  followed the article sent earlier. React automatically sets NODE_ENV based on if we're on /yarn dev, or if its deployed
// the network calls are going to 8080 but theres an error on backend.

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://karma-backend-g3wtz.ondigitalocean.app";

export default url;
