const bcrypt = require('bcrypt');


bcrypt.hash('myPassword', 10, function(err, hash) {
  // Store hash in database
});
