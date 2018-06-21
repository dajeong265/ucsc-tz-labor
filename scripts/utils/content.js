function parse_code(content) {
    matches = content.match(/\#([\w\d]+)$/i);

    if (matches) {
        return matches[1];
    }
    else {
        return false;
    }
};


module.exports = {
    parse_code: parse_code,
}
