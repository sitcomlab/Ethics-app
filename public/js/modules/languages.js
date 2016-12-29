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
        SHOW_INTRO: 'Show intro',
        CHANGE_DOCUMENT_TITLE: 'Change document title',
        YOUR_DOCUMENT_TITLE: 'Your document title',
        SAVE_DOCUMENT: 'Save document',
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
        REJECTED: 'rejected',

        DESCRIPTION_1: 'Title of the project',
        DESCRIPTION_2: 'Name of the lead researcher, his/her position (and his/her lab)',
        DESCRIPTION_3: 'Time scale of the data collection process (range)',
        DESCRIPTION_4: 'Theme and purpose of the study',
        DESCRIPTION_5: 'Describe the procedure of your study (make sure to list, all potentially difficult or distressing actions that you will require from your participants)',
        DESCRIPTION_6: 'Specify the estimated duration of the study, for a single person',
        DESCRIPTION_7: 'List all potential risks and uncomfortable activities which can occur to your participants over the course of the study',
        DESCRIPTION_8: 'List benefits (if applicable)',

        CONCERN_1: 'Will the study involve potentially vulnerable groups of participants or people who are unable or unauthorized to give informed consent',
        CONCERN_2: 'Will the study involve deception',
        CONCERN_3: 'Will the study involve discussion, judgment or presentation of strongly emotional or sensitive stimuli or topics',
        CONCERN_4: 'Will participants be required to eat or drink any potentially allergic substances',
        CONCERN_5: 'Will you be in the position of power in relation to your participants',
        CONCERN_6: 'Will there be any other live observers present who are invisible to the participant and whose presence will not be disclosed to the participant',
        CONCERN_7: 'Can any element of the procedure cause physical pain or more than mild discomfort',
        CONCERN_8: 'Can the study cause psychological stress, anxiety or negative emotions stronger than what is experienced naturally on an everyday basis outside of research',
        CONCERN_9: 'Will any additional information on your participants be obtained from third parties',
        CONCERN_10: 'Does the procedure involve potential moments when the participant is left without the supervision of a researcher in a potentially challenging or dangerous situation in an uncontrolled environment',
        CONCERN_11: 'Does the study involve audio or film recordings potentially identifying participants',
        CONCERN_12: 'If "yes": Will the study involve any recording without prior consent',
        CONCERN_13: 'Is any raw data from the study likely to be passed on to external partners',
        CONCERN_14: 'Does the study involve collection of any information without obtaining an Informed Consent in a situation different from public observations or anonymous street surveys',

        YES: 'yes',
        NO: 'no',
        EXPLANATION: 'Explanation',
        ENGLISH: 'ENGLISH',
        GERMAN: 'GERMAN',

        STUDY_DESCRIPTION: 'Study description',
        STUDY_CONCERNS: 'Study concerns',

    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});
