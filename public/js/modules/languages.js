var app = angular.module("languages", []);

// Language provider
app.config(function ($translateProvider) {

    $translateProvider.translations('de_DE', {
        // TODO
    });

    $translateProvider.translations('en_US', {

        WELCOME: 'Welcome',
        WELCOME_MESSAGE: 'This application provides an easy way to create formulars for your study. Please login or create a new document.',

        DOCUMENT_ID: 'Document-ID',
        DOCUMENT_TITLE: 'Document title',
        EMAIL : 'Email',
        EMAIL_ADDRESS : 'Email-address',
        TITLE : 'Title',
        FIRST_NAME : 'First name',
        LAST_NAME : 'Last name',

        CREATE_NEW_DOCUMENT: 'Create a new document',
        FORGOT_YOUR_DOCUMENT_ID: 'Forgot your Document-ID',

        LOGIN : 'Login',
        SUBMIT : 'Submit',
        SEND: 'Send',
        SAVE: 'Save',
        CANCEL: 'Cancel',
        NEXT: 'Next',
        BACK: 'Back',
        SEND_RECOVERY_EMAIL: 'Send recovery email',

        HI: 'Hi',
        NEW_USER: 'You are a new user, please fill out the following fields',


        ACCOUNT: 'Account',
        SETTINGS: 'Settings',
        DOCUMENT: 'Document',
        LOGOUT: 'Logout',
        SHOW_DOCUMENT_ID: 'Show Document-ID',
        CHANGE_DOCUMENT_TITLE: 'Change document title',
        YOUR_DOCUMENT_TITLE: 'Your document title',
        DELETE_DOCUMENT: 'Delete document',
        YOUR_DOCUMENT_ID: 'Your Document-ID',
        YOUR_ACCOUNT: 'Your account',

        INITIALISED: 'initialised',
        UNSUBMITTED: 'unsubmitted',
        SUBMITTED: 'submitted',
        REVIEW_PENDING: 'review pending',
        UNDER_REVIEW: 'under review',
        PARTLY_ACCEPTED: 'partly accepted',
        REVIEWED: 'reviewed',
        REJECTED: 'rejected'

    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
