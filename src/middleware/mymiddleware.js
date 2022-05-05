// Middleware function definitions go here

module.exports = (app) => {

    app.use((req, res, next) => {
        let logdata = {
            remoteaddr: req.ip,
            remoteuser: req.user,
            time: Date.now(),
            method: req.method,
            url: req.url,
            protocol: req.protocol,
            httpversion: req.httpVersion,
            secure: req.secure,
            status: res.statusCode,
            referer: req.headers['referer'],
            useragent: req.headers['user-agent']
        }

        const stmt = database.prepare('INSERT INTO accesslog (remote_addr, remote_user, time, method, url, protocol, http_version, secure, status, referer_url, user_agent) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        stmt.run(logdata.remoteaddr, String(logdata.remoteuser), logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, String(logdata.secure), logdata.status, logdata.referer, logdata.useragent);
        next();
    })
}