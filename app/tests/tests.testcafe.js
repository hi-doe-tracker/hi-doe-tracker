import { signOutPage, viewBillsPage, sendHearingNoticePage, viewBillPage, assignBillPage, manageAccountsPage, viewHearingsPage, simpleSubmitTestimonyPage, listTestimonyPage } from './simple.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { profilePage } from './profile.page';
import { homePage } from './home.page';
import { adminCreatePage } from './admincreate.page';
import { adminManageAccountsPage } from './manageaccounts.page';
import { submitTestimonyPage } from './submittestimony.page';
import { editTestimonyPage } from './edittestimony.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { username: 'batman@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
  await navBar.gotoViewBillsPage();
  await viewBillsPage.isDisplayed();
  await navBar.gotoViewBillPage();
  await viewBillPage.isDisplayed();
  await navBar.gotoSubmitTestimonyPage();
  await simpleSubmitTestimonyPage.isDisplayed();
  await listTestimonyPage.isDisplayed();
  await navBar.gotoViewHearingsPage();
  await viewHearingsPage.isDisplayed();
  await navBar.gotoSendHearingNoticePage();
  await sendHearingNoticePage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that Profile page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoProfilePage();
  await profilePage.isDisplayed();
  await navBar.logout();
});

test('Test that Home page works', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
  await homePage.hearingsButtonWorks();
  await homePage.measuresButtonWorks();
  await homePage.submitTestimonyButtonWorks();
  await homePage.calendarButtonWorks();
  await navBar.logout();
});

test('Test that Password is changed correctly', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoProfilePage();
  await profilePage.changePassword('TotallyNewPassword');
  await signInPage.signin(credentials.username, 'TotallyNewPassword');
  await navBar.isLoggedIn(credentials.username);
  // reset password
  await navBar.gotoProfilePage();
  await profilePage.changePassword(credentials.password);
});

test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoAdminCreatePage();
  await adminCreatePage.isDisplayed();
  await navBar.gotoAssignBillPage();
  await assignBillPage.isDisplayed();
  await navBar.gotoManageAccountsPage();
  await manageAccountsPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that submit testimony page works', async (testController) => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoSubmitTestimonyPage();
  await submitTestimonyPage.isDisplayed(testController);
  await submitTestimonyPage.hasDefaultFields(testController);
  await submitTestimonyPage.addTestimony(testController);
});

test('Test that edit testimony page works', async (testController) => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoListTestimonyPage();
  await editTestimonyPage.isDisplayed(testController);
  await editTestimonyPage.hasDefaultFields(testController);
  await editTestimonyPage.editTestimony(testController);
});

test('Test that admin create page works', async (testController) => {
  // sign in as admin
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  // create bat man user
  await navBar.gotoAdminCreatePage();
  await adminCreatePage.signupUser(testController);
  // log out and sign in as bat man user, then sign back out for next test
  await navBar.logout();
  await signOutPage.isDisplayed();
  await navBar.gotoSignInPage();
  await signInPage.signin(newCredentials.username, newCredentials.password);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that admin manage accounts page works', async (testController) => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  // double checks and creates the bat man user
  await navBar.gotoAdminCreatePage();
  await adminCreatePage.signupUser(testController);
  // deletes the latest entry which should be batman
  await navBar.gotoManageAccountsPage();
  await adminManageAccountsPage.deleteUser();
  // log out then try to log in as the deleted bat man user
  await navBar.logout();
  await signOutPage.isDisplayed();
  await navBar.gotoSignInPage();
  // attempt to log in but it should fail, check to see if we're still on the sign in page
  await signInPage.attemptsignin(newCredentials.username, newCredentials.password);
  await signInPage.isDisplayed();
});
