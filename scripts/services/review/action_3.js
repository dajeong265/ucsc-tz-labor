var data = require('../../utils/data');

var offer = data.update(
    'offer',
    state.vars.offer_id,
    {
        wage_feedback_worker: content,
    }
);
