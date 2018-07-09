var data = require('../../utils/data'),
    utils = require('../../utils/content');

var code = utils.parse_code(content),
    offer = data.get_row_with_code('offer', code);

if(offer) {
    global.$offer_id = offer.id;
}
