const config = require("config");
const crypto = require("crypto");

module.exports = function (req, res, next) {
    const token = req.header("X-Hub-Signature-256");
    if (!token) {
        return res
            .status(401)
            .json({ errors: [{ msg: "GitHub Webhook Verification Failed" }] });
    }
    const payload = req.body;
    try {
        const hmac = crypto.createHmac("sha256", config.get("gitSecret"));
        const digest = Buffer.from(
            "sha256=" + hmac.update(JSON.stringify(payload)).digest("hex"),
            "utf8"
        );
        const checksum = Buffer.from(token, "utf8");
        if (
            checksum.length !== digest.length ||
            !crypto.timingSafeEqual(digest, checksum)
        )
            return res.status(401).json({
                errors: [{ msg: "GitHub Webhook Verification Failed" }]
            });
        else next();
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ errors: [{ msg: "GitHub Webhook Verification Failed" }] });
    }
};
