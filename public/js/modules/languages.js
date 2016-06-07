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
    BUTTON_SUBMIT: 'Abschicken',

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
    DEVELOPERS: 'Entwickler',

    // STUDY DESCRIPTION
    STUDY_DESCRIPTION: 'Study description',
    STUDY_DESCRIPTION_INFO:'This form will be used to automatically generate the Informed Consent Form that every participant of your study will have to sign. Please fill in the German and/or the English version depending on the language(s) in which you want your Informed Consent Forms to be generated.',
    SD_TITLE:'1. Title of the project.',
    SD_NAME:'2. Name of the lead researcher, position and lab.',
    SD_TIME_SCALE:'3. Time scale of the data collection process (range).',
    SD_TIME_SCALE_INFO: "Specify the period during which you will be collecting the data. If you do not know the exact staring and ending dates, specify in 'month-year' format.",
    SD_THEME:"4. Theme and purpose of the study.",
    SD_THEME_INFO: "In a few sentences, describe the theme and purpose of the study (do not get very technical - the content of this box should be understandable to your participants).",
    SD_PROCEDURE:"5. Describe the procedure of your study. Make sure to list, all potentially difficult or distressing actions that you will require from your participants.",
    SD_PROCEDURE_INFO: "Keep this limited to a few sentences. Do not describe the details of your experimental design, but make sure that you mention all important actions which are required from the participants.",
    SD_DURATION:'6. Specify the estimated duration of the study, for a single person.',
    SD_DURATION_INFO: "Try to give a conservative estimate which will be higher then the average completion time. If you have not used a similar procedure in the past, you can run a simple pilot study to estimate this.",
    SD_RISKS:'7. List all potential risks and uncomfortable activities which can occur to your participants over the course of the study.',
    SD_RISKS_INFO: "Potential risks include (but are not limited to): walking on stairs, nausea (e.g. in Virtual Reality studies), spending time in confined spaces (e.g. lifts), cycling, operating vehicles (including simple ones like sport equipment), navigating in crowded or heavy-traffic areas, observing quickly changing or blinking stimuli (e.g. in computer-based studies), interacting with potentially strong emotional content (e.g. viewing pictures), wearing any additional electronics (eye-tracker, sensors), any activities that might cause physical effort or pain (e.g. attaching movement sensors to the body).",
    SD_BENEFITS:'8. List benefits (if applicable).',
    SD_BENEFITS_INFO: "For instance a monetary payment, or a lottery voucher.",
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
    EC_11_1:'11. Does the study involve audio or film recordings potentially identifying participants (spoken-aloud personal information, video recording of faces)?',
    EC_11_2:'If "yes": Will the study involve any recording without prior consent?',
    EC_12:'12. Is any raw data from the study likely to be passed on to external partners (e.g. companies, funding bodies, other universities)?',
    EC_13:'13. Does the study involve collection of any information without obtaining an Informed Consent in a situation different from public observations or anonymous street surveys?',
    EC_EXPLAIN:"explain",

    // SUMMARY
    SUM_HEADING:'Confirmation',
    SUM_CONFIRM_INFO:'There were no ethical issues found. Please find below the following documents and next steps for your experiment:',
    SUM_NOT_CONFIRM_INFO:'Your project is not confirmed, yet, because there might be ethical conserns. Your answers will be reviewed by the ethical committee and you will be notified soon. Your project ID has been send to your for a later login. For an urgent request please contact committee@ethics-app.com.',
    SUM_LI_1_TOPIC:'Statement of the Researcher',
    SUM_LI_1:'to be printed, signed and stored together with the Informed Consent Form and other hardcopy material.',
    SUM_LI_2_TOPIC:'Debriefing information',
    SUM_LI_2:'To be prepared in written form or provided verbally to all participants after the experiment.',
    SUM_LI_3_TOPIC:'Template of the Informed Consent Form',
    SUM_LI_3:'To be printed and signed by every particiant in advance to the experiment.',

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
    BUTTON_PREVIOUS:'Previous',
    BUTTON_SUBMIT: 'Submit',

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
    DEVELOPERS: 'Developers',
    DOCUMENT: ' document',
    SAVE: 'Save',
    DELETE: 'Delete',
    LOGOUT: 'Logout',

    // STUDY DESCRIPTION
    STUDY_DESCRIPTION: 'Study description',
    STUDY_DESCRIPTION_INFO:'This form will be used to automatically generate the Informed Consent Form that every participant of your study will have to sign. Please fill in the German and/or the English version depending on the language(s) in which you want your Informed Consent Forms to be generated.',
    SD_TITLE:'1. Title of the project.',
    SD_NAME:'2. Name of the lead researcher, position and lab.',
    SD_TIME_SCALE:'3. Time scale of the data collection process (range).',
    SD_TIME_SCALE_INFO: "Specify the period during which you will be collecting the data. If you do not know the exact staring and ending dates, specify in 'month-year' format.",
    SD_THEME:"4. Theme and purpose of the study.",
    SD_THEME_INFO: "In a few sentences, describe the theme and purpose of the study (do not get very technical - the content of this box should be understandable to your participants).",
    SD_PROCEDURE:"5. Describe the procedure of your study. Make sure to list, all potentially difficult or distressing actions that you will require from your participants.",
    SD_PROCEDURE_INFO: "Keep this limited to a few sentences. Do not describe the details of your experimental design, but make sure that you mention all important actions which are required from the participants.",
    SD_DURATION:'6. Specify the estimated duration of the study, for a single person.',
    SD_DURATION_INFO: "Try to give a conservative estimate which will be higher then the average completion time. If you have not used a similar procedure in the past, you can run a simple pilot study to estimate this.",
    SD_RISKS:'7. List all potential risks and uncomfortable activities which can occur to your participants over the course of the study.',
    SD_RISKS_INFO: "Potential risks include (but are not limited to): walking on stairs, nausea (e.g. in Virtual Reality studies), spending time in confined spaces (e.g. lifts), cycling, operating vehicles (including simple ones like sport equipment), navigating in crowded or heavy-traffic areas, observing quickly changing or blinking stimuli (e.g. in computer-based studies), interacting with potentially strong emotional content (e.g. viewing pictures), wearing any additional electronics (eye-tracker, sensors), any activities that might cause physical effort or pain (e.g. attaching movement sensors to the body).",
    SD_BENEFITS:'8. List benefits (if applicable).',
    SD_BENEFITS_INFO: "For instance a monetary payment, or a lottery voucher.",
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
    EC_1:'1. Will the study involve potentially vulnerable groups of participants or people who are unable or unauthorized to give informed consent?',
    EC_1_INFO:"",
    EC_2:'2. Will the study involve deception?',
    EC_2_INFO:"That is to say: Will participants be deliberately mislead in such a way that they might show distress or ask to retract their data when debriefed?",
    EC_3:'3. Will the study involve discussion, judgment or presentation of strongly emotional or sensitive stimuli or topics?',
    EC_3_INFO:"For instance: viewing images involving emotional content that participants might want to avoid, discussing topics related to sexuality, asking personal questions in a publicly exposed environment.",
    EC_4:'4. Will participants be required to eat or drink any potentially allergic substances?',
    EC_5:'5. Will you be in the position of power in relation to your participants?',
    EC_5_INFO:"That is to say: Does the procedure require you to give orders that participants might hesitate or not wish to perform?",
    EC_6:'6. Will there be any other live observers present who are invisible to the participant and whose presence will not be disclosed to the participant?',
    EC_7:"7. Can any element of the procedure cause physical pain or more than mild discomfort?",
    EC_7_INFO:"For instance: attaching anything to participant’s body, requiring participants to perform physically demanding gestures or poses, operating equipment.",
    EC_8:'8. Can the study cause psychological stress, anxiety or negative emotions stronger than what is experienced naturally on an everyday basis outside of research?',
    EC_9:'9. Will any additional information on your participants be obtained from third parties?',
    EC_9_INFO:"If yes: list those parties, approval to use this data (if applicable) and whether participants will be aware of the data aggregation process.",
    EC_10:'10. Does the procedure involve potential moments when the participant is left without the supervision of a researcher in a potentially challenging or dangerous situation in an uncontrolled environment?',
    EC_10_INFO:"For instance: mobile HCI studies in heavy-traffic areas, navigational tasks in-the-wild without following, Virtual Reality studies.",
    EC_11_1:'Does the study involve audio or film recordings potentially identifying participants?',
    EC_11_1_INFO:"For instance: spoken-aloud personal information, video recording of faces.",
    EC_11_2:'If "yes": Will the study involve any recording without prior consent?',
    EC_12:'12. Is any raw data from the study likely to be passed on to external partners?',
    EC_12_INFO:"For instance companies, funding bodies, other universities. If yes: who is responsible for the safety of the passed information?",
    EC_13:'13. Does the study involve collection of any information without obtaining an Informed Consent in a situation different from public observations or anonymous street surveys?',
    EC_13_INFO:"Excluded cases (select ‘no’): remote sensing data, recordings from public settings allowed by the law, and other situations where the observed individual is expected to be aware of remaining in the public view. Continuous observation of targeted individuals, however, infringes this condition (similarly to how following someone physically in the public is different from observing the same person passing-by).",
    EC_EXPLAIN:"explain",

    // SUMMARY
    SUM_HEADING:'Confirmation',
    SUM_CONFIRM_INFO:'No ethical issues were identified. The ethical clearance is automatically granted, conditional on the following steps. Please find below the generated documents together with the steps required:',
    SUM_NOT_CONFIRM_INFO:'Your project is not confirmed, yet, because there might be ethical conserns. Your answers will be reviewed by the ethical committee and you will be notified soon. Your project ID has been send to your for a later login. For an urgent request please contact committee@ethics-app.com.',
    SUM_LI_1_TOPIC:'Statement of the Researcher',
    SUM_LI_1:'to be printed, signed and stored together with the Informed Consent Form and other hardcopy material.',
    SUM_LI_2_TOPIC:'Debriefing information',
    SUM_LI_2:'To be prepared in written form or provided verbally to all participants after the experiment.',
    SUM_LI_3_TOPIC:'Template of the Informed Consent Form',
    SUM_LI_3:'To be printed and signed by the researcher and every participant prior to the experiment. Researcher must store the signed copies together with other hardcopy material. Each participant must also receive a signed copy.',

  });

  // Default Language (English)
  $translateProvider.preferredLanguage('en_US');
});
