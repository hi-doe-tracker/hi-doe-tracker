import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { UserProfiles } from './UserProfileCollection';

export const signUpNewUserMethod = new ValidatedMethod({
  name: 'UserProfiles.SignupNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, password }) {
    if (Meteor.isServer) {
      UserProfiles.define({ email, firstName, lastName, password });
    }
  },
});

// export const updateExistingUser =  new ValidatedMethod({
//   name: 'UserProfiles.UpdateExistingUser',
//   mixins: [CallPromiseMixin],
//   validate: null,
//   run({ id, newPassword }) {
//     if (Meteor.isServer) {
//       UserProfiles.update({ id, password });
//     }
//   },
// });
