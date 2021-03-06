

//var myDataRef = new Firebase('https://shining-inferno-6331.firebaseio.com/');
// get value for name and text from vue
// myDataRef.set({name: name, text: text});
/*new Vue({
  el: '#app',
  data: {
    message: 'Class sign up form'
  }
});*/

// message here is the message on vueform

var baseURL = 'https://shining-inferno-6331.firebaseio.com/'
var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Setup firebase sync
 */

var Users = new Firebase(baseURL + 'users')

Users.on('child_added', function (snapshot) {
  var item = snapshot.val()
  item.id = snapshot.key()
  app.users.push(item)
})

Users.on('child_removed', function (snapshot) {
  var id = snapshot.key()
  app.users.some(function (user) {
    if (user.id === id) {
      app.users.$remove(user)
      return true
    }
  })
})

/**
 * Create Vue app
 */

var app = new Vue({

  // element to mount to
  el: '#app',

  // initial data
  data: {
    users: [],
    newUser: {
      name: '',
      email: '',
      childsname: '',
      childsage: '',
      childsclass: '',
      childstime: '',
      childsmedical: '',
    }
  },

  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },

  // methods
  methods: {
    addUser: function () {
      if (this.isValid ) {
        Users.push(this.newUser)
        this.newUser.name = '';
        this.newUser.email = '';
        this.newUser.childsname = '';
        this.newUser.childsage = '';
        this.newUser.childsclass = '';
        this.newUser.childstime = '';
        this.newUser.childsmedical = '';
      } else
    { console.log("not valid");}
    },
    removeUser: function (user) {
      new Firebase(baseURL + 'users/' + user.id).remove()
    }
  }
})
