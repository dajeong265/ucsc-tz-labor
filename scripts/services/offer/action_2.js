var data = require('../../utils/data');

var offer = data.store_with_code(
    'offer',
    contact,
    {
        'recruit_id': state.vars.recruit_id,
        'rate': content,
    }
);

var ctx = {
    recruiter: state.vars.recruiter_name,
    date: moment().format('MMM Do'),
    code: offer.vars.code,
};

var prompt_msg = project.scheduleMessage({
    content: global.prompt_tpl(ctx),
    to_number: from_number,
    start_time_offset: 600, // in seconds (unix timestamp)
    rrule: 'FREQ=DAILY;INTERVAL=2;COUNT=2;',
});

global.$offer = content;
global.$offer_code = offer.vars.code;
