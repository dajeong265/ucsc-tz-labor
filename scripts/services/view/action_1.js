var data = require('../../utils/data'),
    utils = require('../../utils/content');

var code = utils.parse_code(content),
    offer = data.get_row_with_code('offer', code);

if (offer) {
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
                content: global.prompt_tpl(ctx),
                to_number: from_number,
                start_time: parseInt(survey.vars.posted)+604800,
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
}
