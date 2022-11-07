import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const testimonyPublications = {
  testimony: 'Testimony',
};
export const testimonyPositions = ['Support', 'Oppose', 'Comments Only'];
export const testimonyTestifyingAs = ['Individual', 'Organization'];
export const testimonyTestifyingMethod = ['Remotely via Zoom during the hearing & submitting written testimony', 'Written testimony only'];

class TestimonyCollection extends BaseCollection {
  constructor() {
    super('Testimonies', new SimpleSchema({
      billNo: String,
      // testimonyFileID: String,
      firstName: String,
      lastName: String,
      position: {
        type: String,
        allowedValues: ['Support', 'Oppose', 'Comments Only'],
      },
      testifyingAs: {
        type: String,
        allowedValues: ['Individual', 'Organization'],
      },
      organization: {
        type: String,
        optional: true,
      },
      testifyingMethod: {
        type: String,
        allowedValues: ['Remotely via Zoom during the hearing & submitting written testimony', 'Written testimony only'],
      },
      testimony: {
        type: String,
        optional: true,
      },
      hasPdf: {
        type: Boolean,
        defaultValue: false,
      },
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param bill the name of the testified bill
   * @param firstName the first name of the testifier.
   * @param lastName the last name of the testifier.
   * @param position .
   * @param testifyingAs the owner of the item.
   * @param testifyingMethod the condition of the item.
   * @param testimony .
   * @return {String} the docID of the new document.
   */
  define({ firstName, lastName, position, organization, testifyingAs, testifyingMethod, testimony, billNo, hasPdf }) {
    const docID = this._collection.insert({
      billNo,
      firstName,
      lastName,
      position,
      organization,
      testifyingAs,
      testifyingMethod,
      testimony,
      hasPdf,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param firstName the first name of the testifier (optional).
   * @param lastName the last name of the testifier (optional).
   * @param position (optional).
   * @param testifyingAs the owner of the item (optional).
   * @param testifyingMethod the condition of the item (optional).
   * @param testimony (optional).
   */
  update(docID, { firstName, lastName, position, testifyingAs, organization, testifyingMethod, testimony }) {
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
    if(testifyingAs) {
      updateData.testifyingAs = testifyingAs;
    }
    if (organization) {
      updateData.organization = organization;
    }
    if (testifyingMethod) {
      updateData.testifyingMethod = testifyingMethod;
    }
    if (testimony) {
      updateData.testimony = testimony;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the TestimonyCollection instance.
      const instance = this;
      /** This subscription publishes all testimony to a logged in user */
      Meteor.publish(testimonyPublications.testimony, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeTestimony() {
    if (Meteor.isClient) {
      return Meteor.subscribe(testimonyPublications.testimony);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Testimonies = new TestimonyCollection();
