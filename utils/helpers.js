

function isUser (userID,sessUser){
    if (userID==sessUser){
        return true;
    }
    return false;
}

module.exports = {isUser};