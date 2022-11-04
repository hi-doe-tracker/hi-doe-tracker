import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { ScraperBills } from '../../api/scraperBill/ScraperBillCollection';
import { Bills } from '../../api/bill/BillCollection';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import { Notices } from '../../api/notice/NoticeCollection';
import { Hearings } from '../../api/hearing/HearingCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Adds a scraper bill to database.
function addScraperBill(scraperBill) {
  console.log(`Adding scraper bill: ${scraperBill.measureTitle}`);
  ScraperBills.define(scraperBill);
}

// Adds a testimony to database.
function addTestimony(testimony) {
  console.log(`Adding testimony: ${testimony.testimony}`);
  Testimonies.define(testimony);
}

// Adds a bill to database.
function addBill(bill) {
  console.log(`Adding  bill: ${bill.measureTitle}`);
  Bills.define(bill);
}

// Adds a notice to database.
function addNotice(notice) {
  console.log(`sending notice to: ${notice.to}`);
  Notices.define(notice);
}

// Adds a hearing to database.
function addHearing(hearing) {
  console.log(`Adding hearing: ${hearing.notice}`);
  Hearings.define(hearing);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initializes scraper bills collection.
if (ScraperBills.count() === 0) {
  if (Meteor.settings.defaultScraperBills) {
    console.log('Creating default scraper bills.');
    Meteor.settings.defaultScraperBills.map(scraperBill => addScraperBill(scraperBill));
  }
}

// Initializes bills collection.
if (Bills.count() === 0) {
  if (Meteor.settings.defaultBills) {
    console.log('Creating default bills.');
    Meteor.settings.defaultBills.map(bill => addBill(bill));
  }
}

// Initialize the StuffsCollection if empty.
if (Testimonies.count() === 0) {
  if (Meteor.settings.defaultTestimony) {
    console.log('Creating default testimony.');
    Meteor.settings.defaultTestimony.map(testimony => addTestimony(testimony));
  }
}

if (Notices.count() === 0) {
  if (Meteor.settings.defaultHearingNotice) {
    console.log('Creating default hearing notices.');
    Meteor.settings.defaultHearingNotice.map(notice => addNotice(notice));
  }
}

if (Hearings.count() === 0) {
  if (!Meteor.settings.loadHearings) {
    console.log('Creating default hearings.');
    const assetsFileName = 'testHearings.json';
    console.log(`Loading data from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.hearings.map(hearings => addHearing(hearings));
  }
}
