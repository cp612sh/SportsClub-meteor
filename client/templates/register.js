/**
 * Created by cp612sh on 15-1-5.
 */
Template.register.events({
    'submit form': function (event) {
        var options;
        event.preventDefault();
        var userName = $(event.target).find('[name=userName]').val();
        var newPassword = $(event.target).find('[name=newPassword]').val();
        var passwordConfirmation = $(event.target).find('[name=passwordConfirmation]').val();

        alert(userName + ' ' +newPassword);
        if (newPassword !== passwordConfirmation){
            alert("请输入相同的密码。");
            return;
        };

        options = {
            username: userName,
            password: newPassword
        };
        alert(options.username + ' '+ options.password);
        Accounts.createUser(options,function (error){
            if(error){
                alert(error);
            }
            else{
                alert("注册成功！");
                Router.go('/');
            }
        });
    },
    'click .send-verification-code': function(event,t){
        event.preventDefault();
        var phoneNumber = $(t.firstNode).find('[name=userName]').val();
       // alert(phoneNumber);
        Meteor.call('sendVerificationCode', phoneNumber, true, function(error){
            if(error)
                alert(error.reason);
            else
               alert('验证码已发送，请注意查收。');
        });
    }
})