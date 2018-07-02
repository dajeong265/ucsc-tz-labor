var data = require('../../utils/data'),
    utils = require('../../utils/content');

var code = utils.parse_code(content),
    row = data.get_row_with_code('recruit', code);

if (row && row.vars.closed === undefined) {
    global.$recruit_code = row.vars.code;
    row.vars.closed = moment().format();
    row.save();
}
