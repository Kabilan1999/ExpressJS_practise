const whitelistedDomains = [
  "https://www.youtube.com/",
  "http://localhost:3500/",
];
const customCorsOptions = {
  origin: (origin, callback) => {
    // const allowedOrigins = process.env.ALLOWED_ORIGINS.split(" ");
    if (whitelistedDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Request from unauthorized origin"));
    }
  },
};

module.exports = customCorsOptions;
