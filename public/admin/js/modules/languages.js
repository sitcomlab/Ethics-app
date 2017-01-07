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

        STATUS: 'Status',
        INITIALISED: 'initialised',
        UNSUBMITTED: 'unsubmitted',
        SUBMITTED: 'submitted',
        SUBMITTED_OKAY: 'submitted (okay)',
        REVIEW_REQUIRED: 'review required',
        SUBMITTED_REVIEW_REQUIRED: 'submitted (review required)',
        REVIEW_IN_PROGRESS: 'review in progress',
        PARTLY_ACCEPTED: 'partly accepted',
        REVIEWED_PARTLY_ACCEPTED: 'reviewed (partly accepted)',
        REVIEWED: 'reviewed',
        REVIEWED_OKAY: 'reviewed (okay)',
        REJECTED: 'rejected',
        REVIEWED_REJECTED: 'reviewed (rejected)',

        REV: 'rev',
        SEARCH: 'Search',
        SEARCH_FOR_DOCUMENT_TITLES_AND_AUTHORS: 'Search for document titles and authors',
        FILTER_BY_STATUS_ETC: 'Filter by status, etc.',
        DEFAULT: 'Default',
        ALL: 'all',
        NO_DOCUMENTS_FOUND: 'no documents found',
    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
