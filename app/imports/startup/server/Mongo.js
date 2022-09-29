import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { ScraperBills } from '../../api/scraperBill/ScraperBillCollection';
import { Bills } from '../../api/bill/BillCollection';
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

// Adds a bill to database.
function addBill(bill) {
  console.log(`Adding  bill: ${bill.measureTitle}`);
  Bills.define(bill);
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
