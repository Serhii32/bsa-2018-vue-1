var app = new Vue ({
	el: '#app',
	data: {
		users : null,
		workUser: [],
	},

	created: function () {
		var _this = this;
        $.getJSON('https://jsonplaceholder.typicode.com/users', function (users) {
            _this.users = users;
            let counter = 1;
            _this.users.forEach(function(user){
			  	user.avatar = 'img/' + counter + '.jpg';
			  	counter++;
			});
        });
    },

    methods: {
		addUser: function() {
			if (this.workUser.name && this.workUser.email && this.workUser.avatar) {

				let maxId = 0;

				this.users.forEach(function(user){
				  	maxId = user.id > maxId ? user.id : maxId;
				});

				this.users.push({
					id: maxId+1,
					name: this.workUser.name, 
					email: this.workUser.email, 
					avatar: this.workUser.avatar
				});
			}
		},

		editUser: function (user) {
			this.workUser = {
				id: user.id, 
				name: user.name, 
				email: user.email, 
				avatar: user.avatar
			}
		},

		updateUser: function (updatedUser) {
			this.users.forEach(function(user){
				if (updatedUser.id == user.id) {
					user.name = updatedUser.name;
					user.email = updatedUser.email;
					user.avatar = updatedUser.avatar;
				}
			});
		},

		deleteUser: function (deletedUser) {
			let deleteIndex;
			this.users.forEach(function(user, index){
				if (deletedUser.id == user.id) {
					deleteIndex = index;
				}
			});
			this.users.splice(deleteIndex, 1);
		},
	}
});