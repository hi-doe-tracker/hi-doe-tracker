import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const noticePublications = {
  notice: 'Notice',
};

class NoticeCollection extends BaseCollection {
  constructor() {
    super('Notices', new SimpleSchema({
      to: String,
      from: String,
      cc: String,
      bcc: String,
      dateOfHearing: String,
      subject: String,
      message: String,
    }));
  }

  /**
   * Defines a new Hearing Notice item.
   * @param to the email of the receiver.
   * @param from the sender.
   * @param cc additional receiver.
   * @param bcc additional receiver.
   * @param dateOfHearing the date of the hearing.
   * @param subject the email headline.
   * @param message the context of the email.
   * @return {String} the docID of the new document.
   */
  define({ to, from, cc, bcc, dateOfHearing, subject, message }) {
    const docID = this._collection.insert({
      to,
      from,
      cc,
      bcc,
      dateOfHearing,
      subject,
      message,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param from the sender.
   * @param cc additional receiver.
   * @param bcc additional receiver.
   * @param dateOfHearing the date of the hearing.
   * @param subject the email headline.
   * @param message the context of the email.
   */
  update(docID, { to, from, cc, bcc, dateOfHearing, subject, message }) {
    const updateData = {};
    if (to) {
      updateData.to = to;
    }
    if (from) {
      updateData.from = from;
    }
    if (cc) {
      updateData.cc = cc;
    }
    if (bcc) {
      updateData.bcc = bcc;
    }
    if (dateOfHearing) {
      updateData.dateOfHearing = dateOfHearing;
    }
    if (subject) {
      updateData.subject = subject;
    }
    if (message) {
      updateData.message = message;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the notice associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the NoticeCollection instance.
      const instance = this;
      /** This subscription publishes all hearing notice to a logged in user */
      Meteor.publish(noticePublications.notice, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for hearing notice owned by the current user.
   */
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(noticePublications.notice);
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
export const Notices = new NoticeCollection();
