var data = require('../../utils/data');

var offer = data.store_with_code(
    'offer',
    contact,
    {
        'recruit_id': state.vars.recruit_id,
        'rate': state.vars.offertrim,
    }
);

var ctx = {
    recruiter: state.vars.recruiter_name,
    date: moment().format('MMM Do'),
    code: offer.vars.code,
};

var prompt_msg = project.scheduleMessage({
    state.vars.offertrim: global.prompt_tpl(ctx),
    to_number: from_number,
    start_time_offset: 604800, // in seconds (unix timestamp)
    rrule: 'FREQ=DAILY;INTERVAL=2;COUNT=2;',
});

// Save the prompt id for later cancellation
offer.vars.prompt_msg_id = prompt_msg.id;
offer.save();

global.$offer = state.vars.offertrim;
global.$offer_code = offer.vars.code;
