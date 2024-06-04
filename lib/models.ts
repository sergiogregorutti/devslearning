const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber",
    },
    resetPasswordLink: {
      data: String,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function (this: any, password: any) {
    // create a temporarity variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: any) {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText: any) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password: string) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

const TechnologyCategorySchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      trim: true,
      default: 0,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    name_es: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

TechnologyCategorySchema.virtual("technologies", {
  ref: "Technology",
  localField: "_id",
  foreignField: "technologyCategory",
});

TechnologyCategorySchema.index({ name: "text" });

TechnologyCategorySchema.plugin(mongoosePaginate);

const TechnologySchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      trim: true,
      default: 0,
    },
    technologyCategory: {
      type: ObjectId,
      ref: "TechnologyCategory",
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    imageWhite: {
      type: String,
      trim: true,
    },
    imageWhiteFilepath: {
      type: String,
      trim: true,
    },
    imageLightBlue: {
      type: String,
      trim: true,
    },
    imageLightBlueFilepath: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

TechnologySchema.index({ name: "text" });

TechnologySchema.plugin(mongoosePaginate);

const CourseSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["en", "es"],
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    description: {
      type: String,
      required: true,
      max: 2000,
    },
    image: {
      type: String,
      trim: true,
    },
    imageFilepath: {
      type: String,
      trim: true,
    },
    platform: {
      type: String,
      max: 2000,
    },
    author: {
      type: String,
      max: 2000,
    },
    pricing: {
      type: String,
      enum: ["free", "one-time-payment", "subscription"],
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      max: 9999,
      default: 0,
    },
    year: {
      type: Number,
      trim: true,
    },
    technology: {
      type: ObjectId,
      ref: "Technology",
    },
    link: {
      type: String,
      trim: true,
      required: true,
      max: 2000,
    },
  },
  { timestamps: true }
);

CourseSchema.index({ name: "text" });

CourseSchema.plugin(mongoosePaginate);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const TechnologyCategory =
  mongoose.models.TechnologyCategory ||
  mongoose.model("TechnologyCategory", TechnologyCategorySchema);
export const Technology =
  mongoose.models.Technology || mongoose.model("Technology", TechnologySchema);
export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
