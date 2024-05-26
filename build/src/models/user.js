"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../enum");
const userSchema = new mongoose_1.Schema({
    fn: { type: String },
    un: { type: String },
    email: { type: String },
    pwd: { type: String },
    role: {
        type: String,
        enum: [
            enum_1.CONSTANTS.ROLE.SUPER_ADMIN,
            enum_1.CONSTANTS.ROLE.ADMIN,
            enum_1.CONSTANTS.ROLE.USER,
        ],
        default: "USER",
    },
    add: { type: String },
    token: { type: String },
    expTime: { type: Number },
    isActive: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.model("User", userSchema);
//# sourceMappingURL=user.js.map