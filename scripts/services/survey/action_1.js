var data = require('../../utils/data'),
    utils = require('../../utils/content');

if(state.vars.recruit_id) {
    data.update(
        'survey_request',
        state.vars.request_id,
        {
            rating: content,
            finished: true,
        }
    );
    global.$recruit_id = state.vars.recruit_id;
    global.$survey_id = state.vars.survey_id;
}
else {
    var code = utils.parse_code(content),
        survey = data.get_row_with_code('survey', code);

    if (survey && survey.vars.finished !== true) {
        global.$recruit_id = survey.vars.recruit_id;
        global.$survey_id = survey.id;
    }
}

if(global.$recruit_id) {
    var request_table = project.getOrCreateDataTable('survey_request'),
        requests = request_table.queryRows({
            vars: {
                'recruit_id': global.$recruit_id,
            },
        });

    var request = _.find(requests.all(), function (request){
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
