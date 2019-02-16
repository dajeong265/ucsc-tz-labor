var data = require('../../utils/data'),
    utils = require('../../utils/content');

var code = utils.parse_code(content),
    offer = data.get_row_with_code('offer', code);

if(offer) {
    global.$offer_id = offer.id;
    
    // get the recruitment details by the OFFER/HAKIKI code
    var recruit_table = project.getOrCreateDataTable('recruit'),
        recruit = recruit_table.getRowById(offer.vars.recruit_id);
    
    // Get the job posted date
    var survey_table = project.getOrCreateDataTable('survey'),
        surveys = survey_table.queryRows({
            vars: {'recruit_id': offer.vars.recruit_id}
        }),
        survey = surveys.next();
    
    // Get the employer name
    var employer = project.getContactById(recruit.contact_id);

    // save variable details that will be used in the message contents.
    global.$offer_recruit_id = offer.vars.recruit_id;
    global.$employer_name = employer.name;    
    global.$payment = recruit.vars.payment;
    global.$posted = moment.unix(survey.vars.posted).format('MMM Do');
}


if (!offer) {
    var offer_table = project.getOrCreateDataTable('offer'),
        hakikicontact = offer_table.queryRows({
            'contact_id': contact.id
            vars:{'hired':''}
        }),
        hakikirow = hakikicontact.next();

    global.$hakikicode = hakikirow.vars.code;
    
}
