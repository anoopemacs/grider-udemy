// only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // Generate some data with faker and lodash

  // Check to see if data already exists in collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  //  console.log(numberRecords);
  if (numberRecords == 0) {
    // Generate some data
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
      const avatar = image.avatar();
      Employees.insert({
	name,
	email,
	phone,
	avatar 
      });
    });
  }

  Meteor.publish('employees', function(per_page) {
    return Employees.find({}, { limit: per_page });
  });
});

