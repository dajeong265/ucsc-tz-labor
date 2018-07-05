var data = require('../../utils/data'),
    utils = require('../../utils/content');

var request_table = project.getOrCreateDataTable('survey_request');

if(state.vars.recruit_id) {
    var request = data.update(
        'survey_request',
        state.vars.request_id,
        {
            rating: content,
            finished: true,
        }
    );

    // Update the workers average rating
    var worker = project.initContactById(request.vars.worker_id);
        worker_ratings = request_table.queryRows({
            vars: {'worker_id': worker.id},
        }),
        all_ratings = _.map(worker_ratings.all(), function(row) {
            return row.vars.rating;
        }),
        valid_ratings = _.without(all_ratings, 0, undefined, '');
        total_rating = _.reduce(valid_ratings, function(memo, num) {
            return memo + parseInt(num);
        }, 0);
    if (total_rating) {
        worker.vars.rating = Math.round(total_rating / valid_ratings.length);
        worker.vars.rating_count = valid_ratings.length;
        worker.save();
    }

    global.$recruit_id = state.vars.recruit_id;
}
else {
    var code = utils.parse_code(content),
        survey = data.get_row_with_code('survey', code);

    if (survey && survey.vars.finished !== true) {
        var recruit_table = project.getOrCreateDataTable('recruit'),
            recruit = recruit_table.getRowById(survey.vars.recruit_id);

        global.$payment = recruit.vars.payment;
        global.$recruit_id = recruit.id;
        global.$survey_id = survey.id;
    }
}

if(global.$recruit_id) {
    var requests = request_table.queryRows({
            vars: {
                'recruit_id': global.$recruit_id,
            },
        }),
        request = _.find(requests.all(), function (request){
            return request.vars.finished !== true;
        });

    if(request) {
        global.$name = request.vars.name;
        global.$request_id = request.id;
    }
    else {
        var survey = data.update(
            'survey',
            state.vars.survey_id,
            {
                finished: true,
            }
        );
        // Cancel the reminder
        var msg = project.initScheduledMessageById(survey.vars.prompt_msg_id);
        msg.delete();
    }
}
