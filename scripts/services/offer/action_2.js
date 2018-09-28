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
    start_time_offset: 604800, // in seconds (unix timestamp)
    rrule: 'FREQ=DAILY;INTERVAL=2;COUNT=2;',
});

// Save the prompt id for later cancellation
offer.vars.prompt_msg_id = prompt_msg.id;
offer.save();

global.$offer = content;
global.$offer_code = offer.vars.code;


//DJ Insert START [2018.09.28] --------------------------------------------------------------------------------

var worker = project.getContactById(offer.contact_id),
    view = data.store(
        'view',
        contact,
        {
            'offer_id': offer.id,
            'recruit_id': offer.vars.recruit_id,
        }
    );

// Get the survey details for this
var survey_table = project.getOrCreateDataTable('survey'),
    surveys = survey_table.queryRows({
        vars: {'recruit_id': offer.vars.recruit_id}
    }),
    survey = surveys.next();

// Look for existing survey request for this view
var request_table = project.getOrCreateDataTable('survey_request');
    requested = data.exists(request_table, {
        offer_id: offer.id,
    }),
    all_requested = request_table.queryRows({
        vars: {'recruit_id': offer.vars.recruit_id}
    });

if (!requested) {
    data.store(
        request_table,
        contact,
        {
            offer_id: offer.id,
            view_id: view.id,
            recruit_id: offer.vars.recruit_id,
            worker_id: worker.id,
            name: worker.name,
        }
    );

    // Cancel any existing scheduled prompt
    if(survey.vars.prompt_msg_id) {
        var msg = project.getScheduledMessageById(survey.vars.prompt_msg_id);
        if(msg) {
            msg.delete();
        }
    }

    // Schedule a new prompt
    var ctx = {
            survey_code: survey.vars.code,
            date: moment.unix(survey.vars.posted).format('MMM Do'),
            num_workers: all_requested.count(),
        };

    var prompt_msg = project.scheduleMessage({
            content: global.mrejesho_tpl(ctx),
            to_number: survey.vars.employer_number,
            start_time: parseInt(survey.vars.posted)+604800, // in seconds (unix timestamp)
            rrule: 'FREQ=DAILY;INTERVAL=2;COUNT=2;',
        });

    // Save the prompt id for later cancellation
    survey.vars.prompt_msg_id = prompt_msg.id;
    survey.save();
}

global.$worker_name = worker.name;
global.$worker_phone = worker.phone_number;
global.$worker_rating = worker.vars.rating;
global.$worker_rating_count = worker.vars.rating_count;
global.$worker_village = worker.vars.village;

//DJ Insert END [2018.09.28] --------------------------------------------------------------------------------
