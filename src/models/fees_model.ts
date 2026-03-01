import mongoose, { Schema, models, Document, Query } from "mongoose";

interface Installment {
  name?: string;
  due_date?: Date;
  amount?: number;
  paid?: boolean;
  payment_date?: Date;
  receipt_number?: string;
}

interface FeesDocument extends Document {
  student_id: mongoose.Types.ObjectId;
  full_name: {
    first_name?: string;
    last_name?: string;
  };
  class: string;
  academic_year: string;
  fee_heads: {
    name: string;
    amount: number;
  }[];
  total_amount: number;
  discount: number;
  installments: Installment[];
  status: "Pending" | "Partially Paid" | "Paid";
  payment_gateway_ref?: string;
}

const InstallmentSchema = new Schema<Installment>({
  name: String,
  due_date: Date,
  amount: Number,
  paid: { type: Boolean, default: false },
  payment_date: Date,
  receipt_number: String,
});

const FeesSchema = new Schema<FeesDocument>(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdmissionStudentInfo",
      required: true,
    },
    full_name: {
      first_name: { type: String },
      last_name: { type: String },
    },

    class: { type: String, required: true },
    academic_year: { type: String, required: true },

    fee_heads: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],

    total_amount: { type: Number, required: true },
    discount: { type: Number, default: 0 },

    installments: [InstallmentSchema],

    status: {
      type: String,
      enum: ["Pending", "Partially Paid", "Paid"],
      default: "Pending",
    },

    payment_gateway_ref: String,
  },
  { timestamps: true, collection: "unigrad_fees" },
);

FeesSchema.pre(
  /^find/,
  function (this: Query<FeesDocument[], FeesDocument>, next) {
    this.populate(
      "student_id",
      "full_name.first_name full_name.middle_name full_name.last_name",
    );
    next();
  },
);

export default models.Fees || mongoose.model<FeesDocument>("Fees", FeesSchema);
