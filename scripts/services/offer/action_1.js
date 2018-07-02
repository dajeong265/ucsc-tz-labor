var data = require('../../utils/data'),
    utils = require('../../utils/content');

var code = utils.parse_code(content),
    row = data.get_row_with_code('recruit', code);

if (row) {
    if (row.vars.closed === undefined) {
        global.$recruit_id = row.id;
        global.$recruiter = project.getContactById(row.contact_id).phone_number;
        global.$payment = row.vars.payment;
    }
    else {
        global.$closed = true;
    }
}
