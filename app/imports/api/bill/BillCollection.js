import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const billsPublications = {
  bill: 'Bill',
  billAdmin: 'BillAdmin',
};

class BillCollection extends BaseCollection {
  constructor() {
    super('Bills', new SimpleSchema({
      billLink: String,
      billNo: String,
      office: [String],
      mainOffice: String,
      action: String,
      status: String,
      actionNumber: Number,
      companion: { type: String, optional: true },
      reportTitle: String,
      legalType: String,
      committeeReferral: [String],
      measureTitle: String,
      introducedBy: String,
      introducedByDate: String,
      description: String,
      allVersions: [String],
      committeeReports: [String],
      hearingNotices: [String],
      lastStatus: [String],
      notifiedHearing: String,
      hearingDate: Date,
      hearingLocation: String,
      committee: String,
      type: String,
      testifierContact: [String],
      similar: [String],
      leadOfficePosition: String,
      testifier: String,
      approvedTestimony: [String],
      monitoringReports: [String],
      hearingComments: [String],
      testimony: [String],
      rationale: String,
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
  define({ billLink, billNo, office, mainOffice, action, status, actionNumber, companion,
    reportTitle, legalType, committeeReferral, measureTitle, introducedBy,
    introducedByDate, description, allVersions, committeeReports, hearingNotices,
    lastStatus, notifiedHearing, hearingDate, hearingLocation, committee, type,
    testifierContact, similar, leadOfficePosition, testifier, approvedTestimony,
    monitoringReports, hearingComments, testimony, rationale }) {
    const docID = this._collection.insert({
      billLink,
      billNo,
      office,
      mainOffice,
      action,
      status,
      actionNumber,
      companion,
      reportTitle,
      legalType,
      committeeReferral,
      measureTitle,
      introducedBy,
      introducedByDate,
      description,
      allVersions,
      committeeReports,
      hearingNotices,
      lastStatus,
      notifiedHearing,
      hearingDate,
      hearingLocation,
      committee,
      type,
      testifierContact,
      similar,
      leadOfficePosition,
      testifier,
      approvedTestimony,
      monitoringReports,
      hearingComments,
      testimony,
      rationale,
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
      Meteor.publish(billsPublications.bill, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(billsPublications.billAdmin, function publish() {
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
  subscribeBill() {
    if (Meteor.isClient) {
      return Meteor.subscribe(billsPublications.bill);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeBillAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(billsPublications.billAdmin);
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
    const billLink = docID.billLink;
    const billNo = docID.billNo;
    const office = docID.office;
    const mainOffice = docID.mainOffice;
    const action = docID.action;
    const status = docID.status;
    const actionNumber = docID.actionNumber;
    const companion = docID.companion;
    const reportTitle = docID.reportTitle;
    const legalType = docID.legalType;
    const committeeReferral = docID.committeeReferral;
    const measureTitle = docID.measureTitle;
    const introducedBy = docID.introducedBy;
    const introducedByDate = docID.introducedByDate;
    const description = docID.description;
    const allVersions = docID.allVersions;
    const committeeReports = docID.committeeReports;
    const hearingNotices = docID.hearingNotices;
    const lastStatus = docID.lastStatus;
    const notifiedHearing = docID.notifiedHearing;
    const hearingDate = docID.hearingDate;
    const hearingLocation = docID.hearingLocation;
    const committee = docID.committee;
    const type = docID.type;
    const testifierContact = docID.testifierContact;
    const similar = docID.similar;
    const leadOfficePosition = docID.leadOfficePosition;
    const testifier = docID.testifier;
    const approvedTestimony = docID.approvedTestimony;
    const monitoringReports = docID.monitoringReports;
    const hearingComments = docID.hearingComments;
    const testimony = docID.testimony;
    const rationale = docID.rationale;
    return { billLink, billNo, office, mainOffice, action, status, actionNumber, companion,
      reportTitle, legalType, committeeReferral, measureTitle, introducedBy,
      introducedByDate, description, allVersions, committeeReports, hearingNotices,
      lastStatus, notifiedHearing, hearingDate, hearingLocation, committee, type,
      testifierContact, similar, leadOfficePosition, testifier, approvedTestimony,
      monitoringReports, hearingComments, testimony, rationale };
  }
}

export const Bills = new BillCollection();
