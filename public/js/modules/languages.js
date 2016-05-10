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
    BUTTON_NEXT:'Weiter',
    BUTTON_PREVIOUS:'Zurück',

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

    // STUDY DESCRIPTION
    STUDY_DESCRIPTION: 'Experiment Beschreibung',
    SD_TITLE:'1. Titel des Projektes.',
    SD_NAME:'2. Name des Projektverantwortlichen, Position und Arbeitsgruppe.',
    SD_TIME_SCALE:'3. Zeitrahmen des Experiments (von...bis).',
    SD_THEME:'4. Beschreibe in ein paar Sätzen die Motivation und die Methodik des Experiments (nicht zu technisch - es muss nur verständlich für die Teilnehmer sein).',
    SD_PROCEDURE:'5. Beschreibe den Ablauf des Experiments (gehe nicht zu stark ins Detail, aber achte darauf alle wichtigen Aktionen, die vom Teilnehmer erwartet werden, zu beschreiben). Achte vor allem darauf potentielle Schwierigkeiten oder Stressauslöser zu erwähnen.',
    SD_DURATION:'6. Beschreibe kurz die Dauer des Experiments (überprüfe dieses in deiner Vorstudie).',
    SD_RISKS:'7. Benenne die potentiellen Risiken und Aufgaben, die möglicherweise unangenehm für den Teilnehmer sein könnten. Potentielle Rikiken können sein: Treppen steigen, Übelkeit (in Virtual Reality Experimenten), enge Räume, Fahren mit dem Fahrrad oder anderen Fahrzeugen, sich in überfüllten Umgebungen aufhalten, schnell wechselnden Reizen ausgesetzt sein (Experimente am PC), Aufgaben mit potentiell hochemotionalen Inhalten (z.B. Bilder), elektronische Gegenstände tragen (z.B. Eyetracker, Sensoren), irgendwelche Aktivitäten, die Schmerzen verursachen könnten (z.B. Bewegungssensoren am Körper).',
    SD_BENEFITS:'8. Bennene den Nutzen (falls zutreffend).',
    SD_TITLE_FIELD:'Titel',
    SD_NAME_FIELD:'Name',
    SD_TIME_SCALE_FIELD:'Zeitrahmen',
    SD_THEME_FIELD:'Motivation und Methodik',
    SD_PROCEDURE_FIELD:'Ablauf',
    SD_DURATION_FIELD:'Dauer',
    SD_RISKS_FIELD:'Risiken',
    SD_BENEFITS_FIELD:'Nutzen',

    // ETHICS CHECKLIST
    ETHICS_CHECKLIST:'Research Ethics Checklist',
    EC_1:'1. Will the study involve potentially vulnerable groups of participants or people who are unable or unauthorized to give informed consent (e.g. children and youth under 18yo, participants with impairments, patients, people assisted by a carer, people recruited from groups associated with a specific mental or physical condition)?',
    EC_2:'2. Will the study involve deception? Will participants be deliberately mislead in such a way that they might show distress or ask to retract their data when debriefed?',
    EC_3:'3. Will the study involve discussion, judgment or presentation of strongly emotional or sensitive stimuli (e.g. images) or topics (e.g. questions related to sexuality)?',
    EC_4:'4. Will participants be required to eat or drink any potentially allergic substances?',
    EC_5:'5. Will you be in the position of power in relation to your participants (e.g. does the procedure require you to give orders that participants might hesitate to perform)?',
    EC_6:'6. Will there be any other live observers present who are invisible to the participant and whose presence will not be disclosed to the participant?',
    EC_7:"7. Can any element of the procedure cause physical pain or more than mild discomfort (e.g. attaching anything to participants' bodies)?",
    EC_8:'8. Can the study cause psychological stress, anxiety or negative emotions stronger than what is experienced naturally on an everyday basis outside of research?',
    EC_9:'9. Will any additional information on your participants be obtained from third parties?',
    EC_10:'10. Does the procedure involve potential moments when the participant is left without the supervision of a researcher in a potentially challenging or dangerous situation in an uncontrolled environment (e.g. mobile HCI studies in heavy traffic areas)?',
    EC_11:'11. Does the study involve audio or film recordings potentially identifying participants (spoken-aloud personal information, video recording of faces)?',
    EC_12:'12. Is any raw data from the study likely to be passed on to external partners (e.g. companies, funding bodies, other universities)?',
    EC_13:'13. Does the study involve collection of any information without obtaining an Informed Consent in a situation different from public observations or anonymous street surveys?',

});

  $translateProvider.translations('en_US', {

    // NAV
    NAV_HOME: 'Home',
    NAV_DOCS: 'Documents',
    NAV_SETTINGS: 'Settings',
    NAV_HELP: 'Help',
    ENGLISH: 'English',
    GERMAN: 'German',

    // BUTTONS
    BUTTON_SAVE: 'Save',
    BUTTON_CANCEL: 'Cancel',
    BUTTON_OK: 'Okay',
    BUTTON_CLOSE: 'Close',
    BUTTON_NEXT:'Next',
    BUTTON_PREVIOUS:'Back',

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

    // STUDY DESCRIPTION
    STUDY_DESCRIPTION: 'Study description',
    SD_TITLE:'1. Title of the project.',
    SD_NAME:'2. Name of the lead researcher, position and lab.',
    SD_TIME_SCALE:'3. Time scale of data collection (range).',
    SD_THEME:"4. In few sentences, describe the theme and purpose of the study (don't get too technical - this should be understandable to your participants).",
    SD_PROCEDURE:"5. Describe the procedure (don't get into details of your experimental design, but make sure you mention all important actions which will be required from the participant). In particular, all potentially difficult or distressing actions must be listed.",
    SD_DURATION:'6. Briefly specify the duration (make sure you run a pilot study to estimate this).',
    SD_RISKS:'7. List potential all risks and activities which might be uncomfortable to some people. Potential risks include (but are not limited to): walking on stairs, nausea (in Virtual Reality studies), spending time in confined spaces, cycling or operating any other vehicle, navigating in crowded/heavy-traffic areas, observing quickly changing stimuli (computer-based studies), interacting with potentially strongly emotional content (such as pictures), wearing any additional electronics (eye-tracker, sensors), any activities that might cause physical effort or pain (e.g. attaching movement sensors to the body).',
    SD_BENEFITS:'8. List benefits (if applicable).',
    SD_TITLE_FIELD:'Title',
    SD_NAME_FIELD:'Name',
    SD_TIME_SCALE_FIELD:'Time scale',
    SD_THEME_FIELD:'Theme and purpose',
    SD_PROCEDURE_FIELD:'Procedure',
    SD_DURATION_FIELD:'Duration',
    SD_RISKS_FIELD:'Risks',
    SD_BENEFITS_FIELD:'Benefits',

    // ETHICS CHECKLIST
    ETHICS_CHECKLIST:'Research Ethics Checklist',
    EC_1:'1. Will the study involve potentially vulnerable groups of participants or people who are unable or unauthorized to give informed consent (e.g. children and youth under 18yo, participants with impairments, patients, people assisted by a carer, people recruited from groups associated with a specific mental or physical condition)?',
    EC_2:'2. Will the study involve deception? Will participants be deliberately mislead in such a way that they might show distress or ask to retract their data when debriefed?',
    EC_3:'3. Will the study involve discussion, judgment or presentation of strongly emotional or sensitive stimuli (e.g. images) or topics (e.g. questions related to sexuality)?',
    EC_4:'4. Will participants be required to eat or drink any potentially allergic substances?',
    EC_5:'5. Will you be in the position of power in relation to your participants (e.g. does the procedure require you to give orders that participants might hesitate to perform)?',
    EC_6:'6. Will there be any other live observers present who are invisible to the participant and whose presence will not be disclosed to the participant?',
    EC_7:"7. Can any element of the procedure cause physical pain or more than mild discomfort (e.g. attaching anything to participants' bodies)?",
    EC_8:'8. Can the study cause psychological stress, anxiety or negative emotions stronger than what is experienced naturally on an everyday basis outside of research?',
    EC_9:'9. Will any additional information on your participants be obtained from third parties?',
    EC_10:'10. Does the procedure involve potential moments when the participant is left without the supervision of a researcher in a potentially challenging or dangerous situation in an uncontrolled environment (e.g. mobile HCI studies in heavy traffic areas)?',
    EC_11:'11. Does the study involve audio or film recordings potentially identifying participants (spoken-aloud personal information, video recording of faces)?',
    EC_12:'12. Is any raw data from the study likely to be passed on to external partners (e.g. companies, funding bodies, other universities)?',
    EC_13:'13. Does the study involve collection of any information without obtaining an Informed Consent in a situation different from public observations or anonymous street surveys?',
  });

  // Default Language (English)
  $translateProvider.preferredLanguage('en_US');
});
