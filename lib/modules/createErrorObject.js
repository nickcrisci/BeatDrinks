"use strict";

/*Options:
status -> Http Status Code -> mandatory
title -> Human-Readable Error Title -> mandatory
source: { parameter: } -> The query parameter which caused the error -> optional
*/

const createErrorObject = function(options) {

    const errorObject = {
        status: options.status,
        title: options.title,
    }

    const source = options.source || null;

    if(source) {
        errorObject.source = { parameter: source.parameter || undefined };
    }

    return errorObject;
}

module.exports = createErrorObject;