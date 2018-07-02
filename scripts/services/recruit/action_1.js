var data = require('../../utils/data');

global.$recruit_code = data.store_with_code(
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
);

// Tmp, need API change on store_with_code
var recruit = data.get_row_with_code(
    'recruit',
    $recruit_code
);

global.$survey_code = data.store_with_code(
    'survey',
    contact,
    {
        'recruit_id': recruit.id,
        'posted': moment().unix(),
    }
);
