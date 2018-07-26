global.main = function() {
    // Process all incoming messages and determine the correct service
    // to route the user to.

    // Each route is an array consisting of the name of a contact var at which
    // to find the service to route to and an array of keywords to match against
    var routes = [
            ['recruit_service', ['hire', 'recruit', 'employ','kibarua','vibarua','wafanyakazi', 'wafanya', 'wafanya kazi', 'wafanya kaz']],
            ['offer_service', ['job','kazi']],
            ['view_service', ['offer','huduma']],
            ['close_service', ['close','funga']],
            ['feedback_service', ['feedback','mrejesho']],
            ['start_service', ['start', 'anza']],
            ['stop_service', ['stop', 'sitisha']],
            ['random_service', ['survey', 'utafiti']],
            ['review_service', ['review', 'hakiki']],
        ],
        register_keywords = ['register', 'sajili'];

    var msg_contains = function(word) {
        // Test whether the message (global) contains the given word
        var msg = (message.content || '').toLowerCase();
        return msg.indexOf(word.toLowerCase()) !== -1;
    };

    var invoke_with_msg = function(service_id) {
        // Invoke a service by ID and pass the incoming message to it for context
        var service_obj = project.initServiceById(service_id);
        service_obj.invoke({
            context: 'message',
            event: 'incoming_message',
            message_id: message.id,
        });
    }

    if (register_keywords.some(msg_contains)) {
        invoke_with_msg('SVca253f3b46ae138f'); // Register service id
        global.return_value = true;
        return;
    }

    for (var i=0, l=routes.length; i<l; i++) {
        var service_var = routes[i][0],
            keywords = routes[i][1],
            service_id = contact.vars[service_var];

        if (service_id && keywords.some(msg_contains)) {
            invoke_with_msg(service_id);
            global.return_value = true;
            break;
        }
    }
}
