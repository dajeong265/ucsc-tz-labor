var data = require('../../utils/data');

var recruit = data.store_with_code(
        'recruit',
        contact,
        {
            'workers': state.vars.num_workers,
            'days': state.vars.num_days,
            'type': state.vars.work_type,
            'payment': state.vars.payment,
            'acres': state.vars.acres,
            'start': state.vars.startday,
        }
    ),
    survey = data.store_with_code(
        'survey',
        contact,
        {
            'recruit_id': recruit.id,
            'posted': moment().unix(),
        }
    );

global.$recruit_code = recruit.vars.code;
global.$survey_code = survey.vars.code;
