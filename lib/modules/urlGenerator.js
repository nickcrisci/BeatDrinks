"use strict";

/** URL Generator for the Spotify Endpoint
 *   
 * Converts given properties into a single string, 
 * attached to the base url of the endpoint
 *
 * Returns the generated as a single string 
 * which can be used to get data from the Spotify API
 * 
 * @param {URI of the endpoint} endpoint 
 * @param {List of specified properties} properties 
 * @param {*} callback 
*/
const generateUrl = function(endpoint, properties, callback) {

    //Checking if function is invoked properly
    if (!endpoint) {
        return callback(new Error("The endpoint is missing"))
    }
    if (!properties) {
        return callback(new Error("Properties are missing"));
    }
    if (!callback) {
        throw new Error("Callback is missing");
    }

    let url = endpoint;
    let queryUrl = url + '?';

    //Converts all elements of the propertie Array into a single String
    for (const property of properties) {

        if (!property["name"]) {
            return callback(new Error("Name of the property is missing"));
        }
        if (!property["value"]) {
            return callback(new Error("Value of the property is missing"));
        }

        let suffix = `&${property["name"]}=${property["value"]}`;

        queryUrl += suffix;
    };

    return callback(null, queryUrl);
};

module.exports = generateUrl;