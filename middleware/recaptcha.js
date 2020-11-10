const config = require("config");
const fetch = require("node-fetch");

module.exports = function (req, res, next) {
    const token = req.header("X-recaptcha-token");
    if (!token) {
        return res
            .status(401)
            .json({ errors: [{ msg: "Recaptcha verification failed" }] });
    }
    const options = `?secret=${config.get(
        "recaptcha_secret"
    )}&response=${token}`;
    fetch(config.get("recaptchaURI") + options)
        .then((response) => {
            response
                .json()
                .then((resJSON) => {
                    if (resJSON.success) next();
                    else {
                        console.warn(`${JSON.stringify(resJSON)} failed`);
                        return res.status(401).json({
                            errors: [{ msg: "Recaptcha verification failed" }]
                        });
                    }
                })
                .catch((err) => console.error(err));
        })
        .catch(() => {
            return res.status(401).json({
                errors: [{ msg: "Recaptcha verification failed" }]
            });
        });
};
