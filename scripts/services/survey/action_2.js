var data = require('../../utils/data');

data.update(
    'survey',
    state.vars.survey_id,
    {
        'paid': state.vars.paid,
        'total': state.vars.total,
    }
);
