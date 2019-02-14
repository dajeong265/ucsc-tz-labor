var data = require('../../utils/data');

// Look for service ids
var villages = project.getOrCreateDataTable('Village services'),
    query = villages.queryRows({
        vars: {village_name: contact.vars.village},
    }),
    village_services;

if (query.hasNext()) {
    var village_services = query.next();
}
else {
    query = villages.queryRows({
        vars: {village_name: 'Default'},
    });
    village_services = query.next();
}

var worker_group = project.getOrCreateGroup(contact.vars.village);

if (!worker_group.vars.old_group && worker_group.num_members == 0) {
    worker_group.name = contact.vars.village;
    worker_group.vars.old_group = true;
    worker_group.save();
    global.$new_village = true;
}

if (contact.vars.employer == '0') {
    var service_vars = [
        'offer_service',
        'stop_service',
        'start_service',
        'review_service',
        'register_service',
    ];
    contact.addToGroup(worker_group);
}
else if (contact.vars.employer == '1') {
    var service_vars = [
        'worker_group2',
        'feedback_service',
        'recruit_service',
        'close_service',
        'view_service',
        'stop_service',
        'start_service',
        'register_service',
    ];
    contact.vars.worker_group = worker_group.name;
}

var service_ids = _.pick(village_services.vars, service_vars);
contact.vars = _.extend(contact.vars, service_ids);
contact.save();
