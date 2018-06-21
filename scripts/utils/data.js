var hashes = require('./hashes');


function store(table_name, contact, vars) {
    var table = project.getOrCreateDataTable(table_name);

    table.createRow({
        contact_id: contact.id,
        vars: vars,
    });
}


function store_with_code(table_name, contact, vars) {
    var table = project.getOrCreateDataTable(table_name);
    vars.code = hashes.make_hash(table.num_rows+1),
    table.createRow({
        contact_id: contact.id,
        vars: vars,
    });
    return vars.code;
};


function get_row_with_code(table_name, code) {
    var table = project.getOrCreateDataTable(table_name),
        cursor = table.queryRows({
            vars: {'code': code}
        });

    cursor.limit(1);

    while (cursor.hasNext()) {
        return cursor.next();
    }
    return false;
};


module.exports = {
    store: store,
    store_with_code: store_with_code,
    get_row_with_code: get_row_with_code,
}
