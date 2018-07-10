var data = require('../../utils/data');

var offer = data.update(
    'offer',
    state.vars.offer_id,
    {
        hired: content,
    }
);

// Cancel the reminder
var msg = project.initScheduledMessageById(offer.vars.prompt_msg_id);
msg.delete();
