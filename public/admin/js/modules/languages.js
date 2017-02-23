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
        CLOSE: 'Close',
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
        OFFICE: 'Office',

        SHOW_DOCUMENT_ID: 'Show document-ID',
        CHANGE_DOCUMENT_TITLE: 'Change document title',
        EDIT_DOCUMENT: 'Edit document',
        SAVE_DOCUMENT: 'Save document',
        DELETE_DOCUMENT: 'Delete document',
        CLOSE_DOCUMENT: 'Close document',

        NEW_USER: 'New user',
        NEW_MEMBER_ACCOUNT: 'New member account',
        EMAIL_ADDRESS_USERNAME: 'Email-address (username)',
        EMAIL_ADDRESS: 'Email-address',
        PASSWORD: 'Password',
        PLEASE_REPEAT_YOUR_PASSWORD: 'Please repeat your password',
        TITLE: 'Title',
        FIRST_NAME: 'First name',
        LAST_NAME: 'Last name',
        INSTITUTE: 'Institute',
        RESEARCH_LAB: 'Research lab',
        OFFICE_ROOM_NUMBER: 'Room number (office)',
        ROOM_NUMBER: 'Room number',
        OFFICE_PHONE_NUMBER: 'Phone number (office / work)',
        PHONE_NUMBER: 'Phone number',
        OFFICE_EMAIL_ADDRESS: 'Email-address (office / work)',

        OTHER: 'Other',
        WWU: 'University of Münster',
        IFGI: 'Institute for Geoinformatics',
        PUBLIC_EMAIL_ADDRESS_FOR_USERS: 'Public email-address for users to contact you',
        SEARCH_FOR_USERS: 'Search for users',
        SUBSCRIPTION: 'Subscription',
        IF: 'If',
        YOU_WILL_NO_LONGER_RECEIVE_REVIEW_REQUESTS: 'you will no longer receive review-requests',
        THE_MEMBER_WILL_NOT_RECEIVE_REVIEW_REQUESTS: 'the member will not receive review-requests',
        YOUR_ACCOUNT: 'Your account',
        DOCUMENTS: 'Documents',
        SHOW_DOCUMENTS: 'Show documents',
        EDIT: 'Edit',
        DELETE: 'Delete',
        SUBSCRIBED: 'subscribed',
        YES: 'yes',
        NO: 'no',

        DELETE_THIS_DOCUMENT: 'Are you sure you want to delete this document',
        PLEASE_TYPE_IN_THE_DOCUMENT_TITLE_TO_CONFIRM: 'Please type in the document title to confirm',
        DOCUMENT_TITLE: 'Document title',
        THE_DOCUMENT_TITLE: 'The document title',
        THE_DOCUMENT_ID: 'The document-ID',

    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
