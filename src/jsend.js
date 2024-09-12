/**
 * 
 * @param {object | null} data 
 * @returns {{status:'success',data: object | null }}
 */
function success (data = null){
    return {
        status:'success',
        data: data,
    };
}

/**
 * 
 * @param {string} message 
 * @param {object | null} [data]
 * @returns {{status: 'fail',message:string; data:object | underfined}}
 */
function fail(message,data = null){
    if (data) {
        return {
            status: 'fail',
            message,
            data,
        };
    }
    return {
        status:'fail',
        message,
    };
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 * @returns 
 */

function error(message, data = null){
    if(data){
        return{
            status: 'error',
            message,
            data,
        };
    }
    return {
        status:'error',
        message,
    };
}
module.exports = {
    success, 
    fail,
    error,
};