import { CommonInput } from "@/components/common/CommonInput";
import colors from "@/utils/colors";
import { FieldLabel, FieldRoot, Fieldset, FieldsetContent } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignUpForm = () => {
  const schema = z.object({
    name: z.string().min(1).max(10), 
    email: z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다"),
    birth: z.string(),  
    gender: z.enum(["male", "female"]),
    agreeToTerms: z.boolean(),
    agreeToPrivacy: z.boolean(),
  });

  const { register, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    shouldUnregister: false,
  });
  
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  
  return (
    <Fieldset.Root
      size="sm"
      invalid
    >
      <FieldsetContent>
        <FieldRoot>
          <CustomFieldLabel>이메일</CustomFieldLabel>
          <CommonInput
            placeholder="이메일을 입력해주세요."
            register={register("email")}
            type="email"
            isInvalid={watch("email") === "" || !!errors.email}
          />
        </FieldRoot>
        <FieldRoot>
          <CustomFieldLabel>이름</CustomFieldLabel>
          <CommonInput
            placeholder="이름을 입력해주세요."
            register={register("name")}
            type="text"
            isInvalid={watch("name") === "" || !!errors.name}
          />
        </FieldRoot>
      </FieldsetContent>
    </Fieldset.Root>
  );
};

const CustomFieldLabel = styled(FieldLabel)`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.gray[8]};
`;

export default SignUpForm;