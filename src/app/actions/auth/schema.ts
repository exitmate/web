import { MemberSchema } from "@/generated/zod";
import z from "zod";

export const infoInputSchema = MemberSchema.pick({
    name: true,
    email: true,
    birthDate: true,
    gender: true,
    agreedPrivacyPolicy: true,
    agreedTermsOfUse: true,
    agreedDataUsage: true,
    agreedMarketing: true,
  }).extend({
    agreedPrivacyPolicy: z.literal(true),
    agreedTermsOfUse: z.literal(true),
    agreedDataUsage: z.literal(true),
    birthDate: z
      .date()
      .min(new Date('1910-01-01'))
      .max(new Date((new Date()).getFullYear() - 19, (new Date()).getMonth(), (new Date()).getDate())),
  })
