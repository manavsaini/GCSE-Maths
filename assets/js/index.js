
$("#add_user").submit(function(event){
    alert("Account Created Successfully! You can try login with your credentials");
})


$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})


$("#delete_user").submit(function(event){
    alert("Your account has been deleted successfully!");
})


$("#question_response").submit(function(event){
    alert("Your answer is submitted succesfully! Before submitting your final answer, you could have also checked the Help option in case you need any hints!");
})


$("#correct").submit(function(event){
    alert("Congratulations! Reward Points have been added to your wallet");

})


$("#help_user1").submit(function(event){
    alert("Your solution is saved successfully for future reference");

})


$("#help_user2").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/text-email`,
        "method" : "POST",
        "data" : data
    }

    if(confirm("Please enable 2-Step verification on your google account and generate application password to send emails. In case you haven't done this before then please refer link: https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer")){
        $.ajax(request).done(function(response){
            alert("Your solution has been mailed successfully for review!");
        })
    }
})