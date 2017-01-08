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

        ETHICS_COMMITTEE: 'Ethics committee',
        SHOW_MEMBERS: 'Show members',
        ADD_MEMBER: 'Add member',
        SHOW_USERS: 'Show users',
        ADD_USER: 'Add user',
        USERS: 'Users',
        SEARCH_FOR_MEMBERS: 'Search for members',

        SHOW_DOCUMENT_ID: 'Show document-ID',
        CHANGE_DOCUMENT_TITLE: 'Change document title',
        EDIT_DOCUMENT: 'Edit document',
        SAVE_DOCUMENT: 'Save document',
        DELETE_DOCUMENT: 'Delete document',
        CLOSE_DOCUMENT: 'Close document',
    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
