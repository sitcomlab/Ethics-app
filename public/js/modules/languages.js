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

    // TEST
    DOCUMENTS : 'Dokumente'
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

    // TEST
    DOCUMENTS : 'Documents'
  });

  // Default Language (English)
  $translateProvider.preferredLanguage('en_US');
});
