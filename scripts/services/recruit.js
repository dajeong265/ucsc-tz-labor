var recruit_service_keywords = ['hire', 'recruit', 'employ'];

global.main = function() {
    // Process all incoming messages and determine the correct service
    // to route the user to.

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
    
    if (recruit_service_keywords.some(msg_contains)) {
        invoke_with_msg(contact.vars.recruit_service);
        return_value = true; // Don't fall through to next service
    }
}
