import { AsyncStorage } from "react-native";

const EMAIL = 'EMAIL';
const USER_ID = 'USER_ID';

exports.setEmailUserID = function(email, userId, callback) {
    AsyncStorage.setItem(EMAIL, email, () => {
        AsyncStorage.setItem(USER_ID, userId, () => {
            callback();
        });
    });
};

exports.getEmailUserID = function(callback) {
    AsyncStorage.getItem(EMAIL, (err, email) => {
        AsyncStorage.getItem(USER_ID, (err, userId) => {
            callback(err, {email: email, userId: userId});
        });
    });
};

exports.removeEmailUserID = function(callback) {
    AsyncStorage.removeItem(EMAIL, () => {
        AsyncStorage.removeItem(USER_ID, () => {
            callback();
        });
    });
};
