import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const testimonyProgressPublications = {
  testimonyProgress: 'TestimonyProgress',
  testimonyProgressAdmin: 'TestimonyProgressAdmin',
};

class TestimonyProgressCollection extends BaseCollection {
  constructor() {
    super('TestimonyProgresses', new SimpleSchema({
      associatedTestimony: { type: String, optional: true },
      officeApproval: { type: Boolean, optional: true },
      pipeApproval: { type: Boolean, optional: true },
      finalApproval: { type: Boolean, optional: true },
    }));
  }

  /**
   * Defines a new TestimonyProgress item.
   * @param associatedTestimony the associated testimony.
   * @param officeApproval the state the office approver gave the testimony.
   * @param pipeApproval the state the pipe approver gave the testimony.
   * @param finalApproval the state the final approver gave the testimony.
   * @return {String} the docID of the new document.
   */
  define({ associatedTestimony, officeApproval, pipeApproval, finalApproval }) {
    const docID = this._collection.insert({
      associatedTestimony,
      officeApproval,
      pipeApproval,
      finalApproval,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param associatedTestimony the associated testimony.
   * @param officeApproval the state the office approver gave the testimony.
   * @param pipeApproval the state the pipe approver gave the testimony.
   * @param finalApproval the state the final approver gave the testimony.
   */
  update(docID, { associatedTestimony, officeApproval, pipeApproval, finalApproval }) {
    const updateData = {};
    if (associatedTestimony) {
      updateData.associatedTestimony = associatedTestimony;
    }
    updateData.officeApproval = officeApproval;
    updateData.pipeApproval = pipeApproval;
    updateData.finalApproval = finalApproval;
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(testimonyProgressPublications.testimonyProgress, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(testimonyProgressPublications.testimonyProgressAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeTestimonyProgress() {
    if (Meteor.isClient) {
      return Meteor.subscribe(testimonyProgressPublications.testimonyProgress);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeTestimonyProgressAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(testimonyProgressPublications.testimonyProgressAdmin);
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

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const associatedTestimony = docID.associatedTestimony;
    const officeApproval = docID.officeApproval;
    const pipeApproval = docID.pipeApproval;
    const finalApproval = docID.finalApproval;
    return { associatedTestimony, officeApproval, pipeApproval, finalApproval };
  }
}

export const TestimonyProgresses = new TestimonyProgressCollection();
