var app = angular.module("languages", []);


app.config(function ($translateProvider) {
  $translateProvider.translations('de_DE', {

    // NAV
    NAV_HOME: 'Startseite',
    NAV_DOCS: 'Dokumente',
    NAV_HELP: 'Hilfe',
    NAV_SETTINGS: 'Einstellungen',
    ENGLISH: 'Englisch',
    GERMAN: 'Deutsch',

    // BUTTONS
    BUTTON_SAVE: 'Speichern',
    BUTTON_CANCEL: 'Abbrechen',
    BUTTON_OK: 'Okay',
    BUTTON_CLOSE: 'Schließen',

    // DIALOGS
    DIALOG_ATTENTION : 'Achtung',
    DIALOG_DELETE_DOC : 'Sind Sie sicher, dass Sie dieses Dokument ',
    DIALOG_DELETE_END : ' löschen möchten?',

    LOGIN : 'Login',
    TITLE : 'Titel',
    PROJECT_NAME : 'Projektname',
    EMAIL : 'Email',
    EMAIL_ADDRESS : 'Email-Adresse',
    FIRST_NAME : 'Vorname',
    LAST_NAME : 'Nachname',
    SUBMIT : 'Einreichen',
    SEND: 'Senden',
    CREATE: 'Erstellen',

    WELCOME: 'Willkommen',
    STUDY_DESCRIPTION: 'Experiment Beschreibung'

});

  $translateProvider.translations('en_US', {

    // NAV
    NAV_HOME: 'Home',
    NAV_DOCS: 'Documents',
    NAV_SETTINGS: 'Settings',
    NAV_HELP: 'Help',
    ENGLISH: 'English',
    GERMAN: 'Deutsch',

    // BUTTONS
    BUTTON_SAVE: 'Save',
    BUTTON_CANCEL: 'Cancel',
    BUTTON_OK: 'Okay',
    BUTTON_CLOSE: 'Close',

    // DIALOGS
    DIALOG_ATTENTION : 'Attention',
    DIALOG_DELETE_DOC : 'Are you sure, that you want to delete this document ',
    DIALOG_DELETE_END : ' ?',

    LOGIN : 'Login',
    TITLE : 'Title',
    PROJECT_NAME : 'Project name',
    EMAIL : 'Email',
    EMAIL_ADDRESS : 'Email-address',
    FIRST_NAME : 'First name',
    LAST_NAME : 'Last name',
    SUBMIT : 'Submit',
    SEND: 'Send',
    CREATE: 'Create',

    WELCOME: 'Welcome',
    STUDY_DESCRIPTION: 'Study desccription'

  });

  // Default Language (English)
  $translateProvider.preferredLanguage('en_US');
});
