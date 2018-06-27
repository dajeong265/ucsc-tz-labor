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


function generate_code() {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
};


function make_code(table) {
    var collision,
        code = generate_code(),
        cursor = table.queryRows({
            vars: {'code': code}
        });

    cursor.limit(1);
    collision = cursor.hasNext();

    if (collision) {
        return make_code(table);
    }
    return code;
};


function store(table_name, contact, vars) {
    var table = project.getOrCreateDataTable(table_name);

    table.createRow({
        contact_id: contact.id,
        vars: vars,
    });
};


function store_with_code(table_name, contact, vars) {
    var table = project.getOrCreateDataTable(table_name);
    vars.code = make_code(table),
    table.createRow({
        contact_id: contact.id,
        vars: vars,
    });
    return vars.code;
};


module.exports = {
    get_row_with_code: get_row_with_code,
    generate_code: generate_code,
    make_code: make_code,
    store: store,
    store_with_code: store_with_code,
}
