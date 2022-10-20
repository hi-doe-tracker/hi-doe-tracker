import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const scraperBillsPublications = {
  scraperBill: 'ScraperBill',
  scraperBillAdmin: 'ScraperBillAdmin',
};

class ScraperBillCollection extends BaseCollection {
  constructor() {
    super('ScraperBills', new SimpleSchema({
      bitAppropriation: Number,
      code: String,
      companion: { type: String, optional: true },
      currentReferral: String,
      description: String,
      introducer: String,
      lastUpdated: Date,
      measureArchiveUrl: String,
      measureNumber: Number,
      measurePdfUrl: String,
      measureTitle: String,
      measureType: String,
      reportTitle: String,
      status: String,
      year: Number,
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ bitAppropriation, code, companion, currentReferral, description, introducer, lastUpdated, measureArchiveUrl, measureNumber, measurePdfUrl, measureTitle, measureType, reportTitle, status, year }) {
    const docID = this._collection.insert({
      bitAppropriation,
      code,
      companion,
      currentReferral,
      description,
      introducer,
      lastUpdated,
      measureArchiveUrl,
      measureNumber,
      measurePdfUrl,
      measureTitle,
      measureType,
      reportTitle,
      status,
      year,
    });
    return docID;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(scraperBillsPublications.scraperBill, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(scraperBillsPublications.scraperBillAdmin, function publish() {
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
  subscribeScraperBill() {
    if (Meteor.isClient) {
      return Meteor.subscribe(scraperBillsPublications.scraperBill);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeScraperBillAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(scraperBillsPublications.scraperBillAdmin);
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
    const bitAppropriation = docID.bitAppropriation;
    const code = docID.code;
    const companion = docID.companion;
    const currentReferral = docID.currentReferral;
    const description = docID.description;
    const introducer = docID.introducer;
    const lastUpdated = docID.lastUpdated;
    const measureArchiveUrl = docID.measureArchiveUrl;
    const measureNumber = docID.measureNumber;
    const measurePdfUrl = docID.measurePdfUrl;
    const measureTitle = docID.measureTitle;
    const measureType = docID.measureType;
    const reportTitle = docID.reportTitle;
    const status = docID.status;
    const year = docID.year;
    return { bitAppropriation, code, companion, currentReferral, description, introducer, lastUpdated, measureArchiveUrl, measureNumber, measurePdfUrl, measureTitle, measureType, reportTitle, status, year };
  }
}

export const ScraperBills = new ScraperBillCollection();
