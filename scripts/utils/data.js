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


function zero_pad_end(number, padding) {
    return parseInt(number + Array(padding).join('0'));
}


function generate_code(size) {
    return (Math.floor(Math.random() * zero_pad_end('9', size)) + zero_pad_end(1, size)).toString();
}


function make_code(table, size) {
    var t = table,
        collision,
        code = generate_code(size),
        cursor = t.queryRows({
            vars: {'code': code}
        }),
        max_size = 6,
        next_size = (size < max_size) ? size + 1 : max_size;

    cursor.limit(1);
    collision = cursor.hasNext();

    if (collision) {
        return make_code(t, next_size);
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
    vars.code = make_code(t, 3);
    return t.createRow({
        contact_id: contact.id,
        vars: vars,
    });
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
