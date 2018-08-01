var data = require('../../utils/data'),
    utils = require('../../utils/content');


var code = utils.parse_code(content),
    recruit_table = project.getOrCreateDataTable('recruit'),
    row = data.get_row_with_code(recruit_table, code);


var find_most_recent = function() {
    var cursor = recruit_table.queryRows({
        contact_id: contact.id,
        sort_dir: 'desc',
        'vars[closed][exists]': 0,
    });

    cursor.limit(1);

    if (cursor.hasNext()) {
        return cursor.next();
    }
    return false;
};


if (row && row.contact_id === contact.id) {
    if (row.vars.closed === undefined) {
        global.$recruit_code = row.vars.code;
        row.vars.closed = moment().format();
        row.save();
    }
    else {
        global.$already_closed = true;
    }
}

// If we haven't found an open match, find an alternative
if (global.$recruit_code === undefined) {
    var recent_job = find_most_recent();
    if (recent_job) {
        global.$other_code = recent_job.vars.code;
    }
}
