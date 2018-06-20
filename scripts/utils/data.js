var hashes = require('./hashes');


function store_with_code(table_name, contact, vars) {
    var table = project.getOrCreateDataTable(table_name);

    vars.code = hashes.make_hash(table.num_rows+1),

    table.createRow({
        contact_id: contact.id,
        vars: vars,
    });

    return vars.code;
}


module.exports = {
    store_with_code: store_with_code,
}
