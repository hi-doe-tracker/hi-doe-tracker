import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { MATP } from '../matp/MATP';
import { ROLE } from '../role/Role';
import { loadCollectionNewDataOnly } from '../utilities/load-fixtures';
import { Users } from '../user/UserCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const defineMethod = new ValidatedMethod({
  name: 'BaseCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ collectionName, definitionData }) {
    if (Meteor.isServer) {
      const collection = MATP.getCollection(collectionName);
      collection.assertValidRoleForMethod(this.userId);
      const Id = collection.define(definitionData);
      return Id;
    }
    return '';
  },
});

/**
 * Meteor method used to change user passwords.
 * @param userID ID of the user.
 * @param newPassword new password of the user.
 * @memberOf api/base
 */
export const updatePasswordMethod = new ValidatedMethod({
  name: 'BaseCollection.updatePassword',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ userID, newPassword }) {
    if (Meteor.isServer) {
      Users.update(userID, newPassword);
    }
  },
});

export const updateMethod = new ValidatedMethod({
  name: 'BaseCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ collectionName, updateData }) {
    if (Meteor.isServer) {
      console.log('updateMethod(%o, %o)', collectionName, updateData);
      const collection = MATP.getCollection(collectionName);
      collection.assertValidRoleForMethod(this.userId);
      collection.update(updateData.id, updateData);
    }
  },
});

export const removeItMethod = new ValidatedMethod({
  name: 'BaseCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ collectionName, profileID }) {
    if (Meteor.isServer) {
      const collection = MATP.getCollection(collectionName);
      collection.assertValidRoleForMethod(this.userId);
      return collection.removeIt(profileID);
    }
    return true;
  },
});

export const dumpDatabaseMethod = new ValidatedMethod({
  name: 'base.dumpDatabase',
  mixins: [CallPromiseMixin],
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to dump the database..');
    } else if (!Roles.userIsInRole(this.userId, [ROLE.ADMIN])) {
      throw new Meteor.Error('unauthorized', 'You must be an admin to dump the database.');
    }
    // Don't do the dump except on server side (disable client-side simulation).
    // Return an object with fields timestamp and collections.
    if (Meteor.isServer) {
      const collections = _.sortBy(
        MATP.collectionLoadSequence.map((collection) => collection.dumpAll()),
        (entry) => entry.name,
      );
      const timestamp = new Date();
      return { timestamp, collections };
    }
    return null;
  },
});

export const loadFixtureMethod = new ValidatedMethod({
  name: 'base.loadFixture',
  mixins: [CallPromiseMixin],
  validate: null,
  run(fixtureData) {
    // console.log('loadFixtureMethod', fixtureData);
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to load a fixture.', '');
    } else if (!Roles.userIsInRole(this.userId, [ROLE.ADMIN])) {
      throw new Meteor.Error('unauthorized', 'You must be an admin to load a fixture.', '');
    }
    if (Meteor.isServer) {
      let ret = '';
      // console.log(RadGrad.collectionLoadSequence);
      MATP.collectionLoadSequence.forEach((collection) => {
        const result = loadCollectionNewDataOnly(collection, fixtureData, true);
        // console.log(collection.getCollectionName(), result);
        if (result) {
          ret = `${ret} ${result},`;
        }
      });
      // console.log(`loadFixtureMethod ${ret}`);
      const trimmed = ret.trim();
      if (trimmed.length === 0) {
        ret = 'Defined no new instances.';
      } else {
        ret = ret.substring(0, ret.length - 1); // trim off trailing ,
      }
      return ret;
    }
    return '';
  },
});
