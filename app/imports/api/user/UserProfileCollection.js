import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import { ZipZap } from 'meteor/udondan:zipzap';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

class UserProfileCollection extends BaseProfileCollection {
  constructor() {
    super('UserProfile', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param position The position.
   * @param assignedOffice The assigned office.
   */
  define({ email, firstName, lastName, password, position, assignedOffice }) {
    if (Meteor.isServer) {
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.USER;
        const profileID = this._collection.insert({ email, firstName, lastName, userID: this.getFakeUserId(), role, position, assignedOffice });
        const userID = Users.define({ username, role, password });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   */
  update(docID, { firstName, lastName, position, assignedOffice }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (position) {
      updateData.position = position;
    }
    if (assignedOffice) {
      updateData.assignedOffice = assignedOffice;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.User) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const position = doc.position;
    const assignedOffice = doc.assignedOffice;
    return { email, firstName, lastName, position, assignedOffice };
  }

  /**
   * Exports all user information in a JSON file as backup. Password set to changeme.
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpAll() {
    const zip = new ZipZap();
    const db = [];
    this.find().forEach((doc) => {
      if (doc.role === ROLE.USER) {
        db.push({ email: `${doc.email}`, password: 'changeme', firstName: `${doc.firstName}`, lastName: `${doc.lastName}`, position: `${doc.position}`, assignedOffice: `${doc.assignedOffice}` });
      }
    });
    zip.file('test.json', JSON.stringify(db));
    zip.saveAs('test.json');
    return db;
  }

  /**
   * Exports all user information in a JSON file as backup. Password set to changeme.
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  //checkRole(role) {
  //  this.find().forEach((doc) => {
  //    if (doc.assignedOffice === role) {
  //      return true;
  //    }
  //  });
  //}

  /**
   * Default publication method for entities.
   * It publishes the entire UserProfileCollection collection for admi.
   */
  publish() {
    if (Meteor.isServer) {
      // get the UserProfileCollection instance.
      const instance = this;
      Meteor.publish('UserProfile', function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.USER)) {
          return instance._collection.find({ userID: this.userId });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for USerProfileCollection
   */
  subscribeUserProfiles() {
    if (Meteor.isClient) {
      return Meteor.subscribe('UserProfile');
    }
    return null;
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {UserProfileCollection}
 */
export const UserProfiles = new UserProfileCollection();
