var data = require('../../utils/data');

var recruit = data.store_with_code(
        'recruit',
        contact,
        {
            'workers': state.vars.num_workers,
            'days': state.vars.num_days,
            'crop': state.vars.crop,
            'type': state.vars.work_type,
            'payment': state.vars.payment,
            'acres': state.vars.acres,
            'start': state.vars.startday,
            'employer_wtp': state.vars.recruiter_wtp,
            'employer_village': contact.vars.village,
            'worker_group2': contact.vars.worker_group2,
            'worker_group3': contact.vars.worker_group3,
            'worker_group4': contact.vars.worker_group4,
            'worker_group5': contact.vars.worker_group5,
            'worker_group6': contact.vars.worker_group6,
            'worker_group7': contact.vars.worker_group7,
            'worker_group8': contact.vars.worker_group8,
            'employer_number': from_number,
            'employer_name': contact.name,
        }
    ),
    survey = data.store_with_code(
        'survey',
        contact,
        {
            'recruit_id': recruit.id,
            'employer_number': from_number,
            'posted': moment().unix(),
        }
    );

global.$recruit_code = recruit.vars.code;
global.$survey_code = survey.vars.code;
