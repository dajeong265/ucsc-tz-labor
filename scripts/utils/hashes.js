var Hashids = require('../libs/hashids'),
    hashids = new Hashids('ucsc-tz-labor', 0, '0123456789abcdefghijklmnopqrstuvwxyz');


function make_hash(id) {
    return hashids.encode(id);
};


function read_hash(hash) {
    return hashids.decode(hash);
};


module.exports = {
    make_hash: make_hash,
    read_hash: read_hash,
};
