var mongoose = require('mongoose');
var validator = require('validator');

var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    email_address: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'invalid email']
    },
    title: { // Example: "Prof. Dr."
        type: String,
        required: false,
        default: ""
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    subscription_status: { // if 'false' no Emails will be send to this Email-address
        type: Boolean,
        required: true,
        default: true
    },
    working_address: { // Working place
        name: { // Example: "Institute for Geoinformatics"
            type: String,
            required: true
        },
        position: { // Example: "Situated Computing and Interaction Lab"
            type: String,
            required: false,
            default: ""
        },
        street: { // Example: "Heisenbergstraße"
            type: String,
            required: false
        },
        house_number: { // Example: "2"
            type: String,
            required: false
        },
        zip_code: { // Example: "48149"
            type: String,
            required: false
        },
        city: { // Example: "Münster"
            type: String,
            required: false,
            default: ""
        },
        state: { // Example: "NRW" (uppercase for automatic translation)
            type: String,
            required: false,
            default: ""
        },
        country: { // Example: "GERMANY" (uppercase for automatic translation)
            type: String,
            required: false,
            default: ""
        },
        office_room_number: { // "245"
            type: String,
            required: false,
            default: ""
        },
        phone_number: { // "+49123456789"
            type: String,
            required: false,
            default: ""
        },
        fax_number: { // "+49123456789"
            type: String,
            required: false,
            default: ""
        },
        website: { // Ifgi-Website to person: https://www.uni-muenster.de/Geoinformatics/en/institute/staff/index.php
            type: String,
            required: false,
            default: ""
        }
    }
});


MemberSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Member', MemberSchema);
