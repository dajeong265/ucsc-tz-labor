var data = require('../../utils/data');

var offer = data.store_with_code(
    'offer',
    contact,
    {
        'recruit_id': state.vars.recruit_id,
        'rate': content,
    }
);

global.$offer = content;
global.$offer_code = offer.vars.code;
