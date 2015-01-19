/**
 * Created by cp612sh on 15-1-7.
 */
Meteor.methods({
    sendVerificationCode: function(mobileNumber, isNotSpam){
        if(isNotSpam === true)
            callSendVerificationCode(mobileNumber);
    }
});

if (Meteor.isServer){
    var callSendVerificationCode = function(mobileNumber){
        var response = Request({
            method: 'GET',
            url:    'http://115.29.246.197/dev/register?unique=' + mobileNumber
        });
        if(response.statusCode !== 200){
            throw new Meteor.Error(500, '发送验证码失败');
        }
    };
}
