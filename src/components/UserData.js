// UserData.js
let username = '';
let nickname = '';

const UpdateName = async (newUsername, newNickname) => {
    console.log("Updating name...");
    username = newUsername;
    nickname = newNickname;
    console.log("Name updated:", username, nickname);
};

export { username, nickname, UpdateName };
