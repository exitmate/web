"use client";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { CommonButton } from "@/components/common/CommonButton";
import { CommonCheckbox } from "@/components/common/CommonCheckbox";
import { CommonInput } from "@/components/common/CommonInput";
import CommonSelect from "@/components/common/CommonSelect";
import DatePicker from "@/components/common/DatePicker";
import Spacing from "@/components/common/Spacing";
import colors from "@/utils/colors";
import { FieldLabel, FieldRoot, Fieldset, FieldsetContent, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const ReadFullText = ({ url }: { url: string }) => {
  return (
    <ReadFullTextContainer onClick={() => window.open(url, "_blank")}>
      <Text>전문보기</Text>
      <Image src={ArrowRightIcon} alt="arrow-right" />
    </ReadFullTextContainer>
  );
};

export const SignUpForm = () => {
  const router = useRouter();
  const schema = z.object({
    name: z.string().min(1).max(10), 
    email: z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다"),
    birth: z.string().min(1, "생년월일을 선택해주세요"),
    gender: z.string().min(1, "성별을 선택해주세요").refine((val) => val === "male" || val === "female", "올바른 성별을 선택해주세요"),
    agreeToTerms: z.boolean().refine((val) => val === true, "개인정보 처리방침에 동의해주세요"),
    agreeToPrivacy: z.boolean().refine((val) => val === true, "이용약관에 동의해주세요"),
  });

  const { register, watch, handleSubmit, getValues, formState: { errors, isValid }, setValue, control } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      email: "",
      birth: "",
      gender: "",
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });
  
  const onSubmit = () => {
    console.log(errors);
    console.log(getValues());
    router.push("/signup/detail");
  };

  const handleDateChange = (year: string, month: string, day: string) => {
    if (year && month && day) {
      const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      setValue("birth", birthDate);
    } else {
      setValue("birth", "");
    }
  };
  
  return (
    <SignUpFormContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <FieldRoot>
          <CustomFieldLabel>성별</CustomFieldLabel>
          <CommonSelect
            placeholder="성별을 선택해주세요"
            items={[{ label: "남자", value: "male" }, { label: "여자", value: "female" }]}
            register={register("gender")}
            isInvalid={watch("gender") === "" || !!errors.gender}
          />
        </FieldRoot>
        <FieldRoot>
          <CustomFieldLabel>생년월일</CustomFieldLabel>
          <DatePicker 
            isInvalid={watch("birth") === "" || !!errors.birth}
            onDateChange={handleDateChange}
          />
        </FieldRoot>
        <Spacing height={24} />
        <FieldRoot>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
            <Controller
                control={control}
                name="agreeToTerms"
                render={({ field }) => (
                  <CommonCheckbox
                    label="개인정보 처리방침에 동의합니다."
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />  
            <ReadFullText url="https://www.google.com" />
          </div>
        </FieldRoot>
        <FieldRoot>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
            <Controller
                control={control}
                name="agreeToPrivacy"
                render={({ field }) => (
                  <CommonCheckbox
                    label="이용약관에 동의합니다."
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            <ReadFullText url="https://www.google.com" />
          </div>
        </FieldRoot>
        <Spacing height={24} />
        <CommonButton label="다음 단계로 넘어가기" disabled={!isValid} type="submit" />
      </FieldsetContent>
    </Fieldset.Root>
    </form>
    </SignUpFormContainer>
  );
};

const SignUpFormContainer = styled.div`
  width: 100%;
  max-width: 438px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CustomFieldLabel = styled(FieldLabel)`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.gray[8]};
`;

const ReadFullTextContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  color: ${colors.gray[6]};
`;

export default SignUpForm;