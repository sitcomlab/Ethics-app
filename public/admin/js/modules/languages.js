var app = angular.module("languages", []);

// Language provider
app.config(function ($translateProvider) {

    $translateProvider.translations('de_DE', {
        // TODO
    });

    $translateProvider.translations('en_US', {

        WELCOME: 'Welcome',
        WELCOME_MESSAGE: 'This site is for the ethics committee. If you are a user, please go to the main site to login or create a new document.',
        FORGOT_YOUR_PASSWORD: 'Forgot your password',

        LOGIN : 'Login',
        SUBMIT : 'Submit',
        SEND: 'Send',
        SAVE: 'Save',
        CANCEL: 'Cancel',
        NEXT: 'Next',
        BACK: 'Back',
        SEND_RECOVERY_EMAIL: 'Send recovery email',

        ACCOUNT: 'Account',
        SETTINGS: 'Settings',
        DOCUMENT: 'Document',
        LOGOUT: 'Logout',

        INITIALISED: 'initialised',
        UNSUBMITTED: 'unsubmitted',
        SUBMITTED: 'submitted',
        REVIEW_PENDING: 'review pending',
        UNDER_REVIEW: 'under review',
        PARTLY_ACCEPTED: 'partly accepted',
        REVIEWED: 'reviewed',
        REJECTED: 'rejected',
    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
