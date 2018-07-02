var data = require('../../utils/data');

global.$offer = content;
global.$offer_code = data.store_with_code(
    'offer',
    contact,
    {
        'recruit_id': state.vars.recruit_id,
        'rate': content,
    }
);
