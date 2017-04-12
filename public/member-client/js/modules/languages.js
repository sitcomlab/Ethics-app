var app = angular.module("languages", []);

// Language provider
app.config(function ($translateProvider) {

    $translateProvider.translations('de_DE', {
        // TODO
    });

    $translateProvider.translations('en_US', {

        WELCOME: 'Welcome',
        WELCOME_MESSAGE: 'This Web-App provides a way to create the necessary forms for your user study. Please login or create a new document.',

        DOCUMENT_ID: 'Document-ID',
        DOCUMENT_TITLE: 'Document title',
        EMAIL : 'Email',
        EMAIL_ADDRESS : 'Email-address',
        TITLE : 'Title',
        FIRST_NAME : 'First name',
        LAST_NAME : 'Last name',
        HELP: 'Help',
        CREATE_NEW_DOCUMENT: 'Create a new document',
        FORGOT_YOUR_DOCUMENT_ID: 'Forgot your document-ID',

        LOGIN : 'Login',
        SIGN_UP:'Sign up',
        SUBMIT : 'Submit',
        SEND: 'Send',
        SAVE: 'Save',
        CANCEL: 'Cancel',
        NEXT: 'Next',
        NEXT_PAGE: 'Next page',
        PREVIOUS_PAGE: 'Previous page',
        BACK: 'Back',
        SEND_RECOVERY_EMAIL: 'Send recovery email',
        SHOW_INTRO: 'Show introduction',
        RECOVERY: 'Recovery',
        REGISTRATION: 'Registration',
        NEW_DOCUMENT: 'New document',
        PLEASE_USE_A_UNIVERSITY_ADDRESS: 'Please use an official university address',

        UNIVERSITY: 'University',
        INSTITUTE: 'Institute',
        NO_INSTITUTE: 'No institute',
        COURSE: 'Course',
        NO_COURSE: 'No course',

        INTRODUCTION_TEXT: 'You will be asked a series of questions, based on which the EthicsApp will auto-generate 3 documents. You are required to use these documents in your experiment. The key document is the Informed Consent Form - both you and your participant should sign and keep a copy. See the example below.',
        STUDY_DESCRIPTION_FORM_TEXT: 'This form will be used to automatically generate the informed consent form that every participant of your study will have to sign. Please fill out the English version and optionally the German version. Depending on the language(s), you will receive the informed consent forms for your experiment.',
        CHOOSE_LANGUAGE:'Please select the language, in which you want to generate the informed consent forms:',
        STUDY_CONCERNS_FORM_TEXT: 'Complete the checklist below. If you have answered "yes" to any of the questions, please provide a brief overview of how you are going to ensure ethical conduct with regard to the given risk. This will be reviewed by the Institutes Ethics Committee. Remember that any ethical approval granted based on untrue or incomplete disclosure of your research procedure is invalid. The checklist is intended as a guideline and its role is to alert you in cases where you might be proposing an unethical study. <br> Make sure you discuss any concerns with the members of the Intitutes\'s Ethics Committee.',

        AGREEMENT_DATA: 'I agree that all given information is correct, and I am aware that my data will be stored by the Institute responsible for the study and its partners',
        AGREEMENT_DELETION: 'I agree that as soon as I submit my document request, only Members of the Ethics comittee can delete my account',


        ACCOUNT: 'Account',
        SETTINGS: 'Settings',
        DOCUMENT: 'Document',
        LOGOUT: 'Logout',
        SHOW_DOCUMENT_ID: 'Show document-ID',
        SHOW_DOCUMENT_INTRO: 'Show introduction',
        CHANGE_DOCUMENT_SETTINGS: 'Change document settings',
        SAVE_DOCUMENT: 'Save document',
        DELETE_DOCUMENT: 'Delete document',
        YOUR_DOCUMENT_ID: 'Your document-ID',
        YOUR_ACCOUNT: 'Your account',

        INITIALISED: 'initialised',
        UNSUBMITTED: 'unsubmitted',
        _SUBMITTED: 'submitted',
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
        CONCERN_11_1: 'Does the study involve audio or film recordings potentially identifying participants',
        CONCERN_11_2: 'If "yes": Will the study involve any recording without prior consent',
        CONCERN_12: 'Is any raw data from the study likely to be passed on to external partners',
        CONCERN_13: 'Does the study involve collection of any information without obtaining an Informed Consent in a situation different from public observations or anonymous street surveys',

        YES: 'yes',
        NO: 'no',
        EXPLANATION: 'Explanation',
        ENGLISH: 'ENGLISH',
        GERMAN: 'GERMAN',

        DOWNLOAD_YOUR_FILES: 'Download your files',
        DEBRIEFING_INFORMATION: 'Debriefing information',
        STATEMENT_OF_RESEARCHER: 'Statement of researcher',
        INFORMED_CONSENT_FORM: 'Informed consent form',

        DELETE_THIS_DOCUMENT: 'Are you sure you want to delete this document',
        PLEASE_TYPE_IN_THE_DOCUMENT_TITLE_TO_CONFIRM: 'Please type in the document title to confirm',
        DELETE: 'Delete',

        INTRO: 'Intro',
        REQUIRED: 'required',
        OPTIONAL: 'optional',
        NAME: 'Name',
        TIME: 'Time',
        RESEARCHER: 'Reseacher(s)',
        PURPOSE: 'Purpose',
        PROCEDURE: 'Procedure',
        DURATION: 'Duration',
        RISKS: 'Risks',
        BENEFITS: 'Benefits',

        ADMIN: 'admin',
        YOUR_DOCUMENT_NEEDS_TO_BE_REVIEWED: 'Your document needs to be reviewed',
        DOCUMENT_IS_CURRENTLY_UNDER_REVIEW: 'Your document is currently under review',
        DOCUMENT_REVIEWED_SUCCESSFULLY: 'Your document has been reviewed successfully',
        DOCUMENT_PARTLY_ACCEPTED: 'Your document has been partly accepted',
        YOUR_DOCUMENT_HAS_BEEN_REJECTED: 'Your document has been rejected',

        SHOW_SUBMISSION: 'Show submission',
        SHOW_REVIEW: 'Show review',
        SUBMISSION: 'Submission',
        AND: 'and',
        REVIEW: 'Review',
        _REVIEW: 'review',
        GENERAL: 'General',
        REVISIONS: 'Revisions',
        STUDY_DESCRIPTION: 'Study description',
        STUDY_CONCERNS: 'Study concerns',
        YOUR_DOCUMENT: 'Your document',
        ALL_REVISIONS: 'All revisions',
        LATEST_REVISION: 'Latest revision',
        REV: 'rev',
        SHOW: 'Show',
        HIDE: 'Hide',
        SHOW_DOCUMENT: 'Show document',
        SHOW_HISTORY: 'Show history',
        HIDE_HISTORY: 'Hide history',
        SHOW_COMMENTS: 'Show comments',
        HIDE_COMMENTS: 'Hide comments',
        NOT_USED: 'not used',
        
        CREATED: 'Created',
        SUBMITTED: 'Submitted',
        REVIEWERS: 'Reviewers',
        LATEST_REVIEWER: 'Latest reviewer',
        GENERAL_COMMENT: 'Comment',

        NONE: 'none',
        COMMITTEE: 'Committee',
        COMMITTEE_MEMBER:'Committee member',
        CURRENT_MEMBERS: 'Current members',
        FORMER_MEMBERS: 'Former members',
        MEMBERS: 'Members',
        OFFICE: 'Office',
        RESPONSIBLE: 'responsible ',
        CURRENTLY_NOT_RESPONSIBLE: 'Currently not responsible'
    });

    // Default Language (English)
    $translateProvider.preferredLanguage('en_US');
});