

function isUser (userID,sessUser){
    console.log('helper function called:')
    console.log(userID);
    console.log(sessUser);
    if (userID==sessUser){
        return true;
    }
    return false;
}

module.exports = {isUser};