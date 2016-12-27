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
        SEND_RECOVERY_EMAIL: 'Send recovery email',

        HI: 'Hi',
        NEW_USER: 'You are a new user, please fill out the following fields',
    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
