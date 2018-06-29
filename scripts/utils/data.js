function _table(table) {
    if(typeof table === 'string') {
        return project.getOrCreateDataTable(table);
    }
    else {
        return table;
    }
}

function get_row_with_code(table, code) {
    var t = _table(table),
        cursor = t.queryRows({
            vars: {'code': code}
        });

    cursor.limit(1);

    while (cursor.hasNext()) {
        return cursor.next();
    }
    return false;
}


function generate_code() {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
}


function make_code(table) {
    var t = _table(table),
        collision,
        code = generate_code(),
        cursor = t.queryRows({
            vars: {'code': code}
        });

    cursor.limit(1);
    collision = cursor.hasNext();

    if (collision) {
        return make_code(t);
    }
    return code;
}


function store(table, contact, vars) {
    var t = _table(table);
    return t.createRow({
        contact_id: contact.id,
        vars: vars,
    });
}


function store_with_code(table, contact, vars) {
    var t = _table(table);
    vars.code = make_code(t),
    t.createRow({
        contact_id: contact.id,
        vars: vars,
    });
    return vars.code;
}


function exists(table, vars) {
    var t = _table(table);
    cursor = t.queryRows({
        vars: vars,
    });
    cursor.limit(1);
    return cursor.count() !== 0;
}


function update(table, row_id, vars) {
    var t = _table(table),
        row = t.getRowById(row_id);
    _.each(vars, function(e, i, l) {
        row.vars[i] = e;
    });
    row.save();
    return row;
}


module.exports = {
    get_row_with_code: get_row_with_code,
    generate_code: generate_code,
    make_code: make_code,
    store: store,
    store_with_code: store_with_code,
    exists: exists,
    update: update,
}
