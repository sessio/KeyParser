# KeyParser
Convert F-Secure Key export JSON to CSV for importing into LastPass etc., that don't understand their export format.

All password handling is done client-side, so you don't have to worry about anybody sniffing passwords from http traffic.

Use ``grunt`` to start development env and listen for changes, or ``grunt deploy`` to launch with uglified js. server settings in ``conf/env.js``
