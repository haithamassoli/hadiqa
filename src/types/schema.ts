import { z } from "zod";

export const validationComplaintsSchema = z.object({
  complaints: z
    .string({
      required_error: "حقل الشكوى يجب أن لا يكون فارغ",
    })
    .min(10, "حقل الشكوى يجب أن يكون على الأقل 10 أحرف"),
});

export type validationComplaintsSchemaType = z.infer<
  typeof validationComplaintsSchema
>;
