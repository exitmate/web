import { CommonInput } from "@/components/common/CommonInput";
import { Flex } from "@chakra-ui/react";

export const SignUpForm = () => {
  return (
    <Flex>
      <CommonInput placeholder="이메일" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="비밀번호" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="비밀번호 확인" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="이름" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="생년월일" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="전화번호" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="주소" value="" onChange={() => {}} isValid={true} />
      <CommonInput placeholder="상세주소" value="" onChange={() => {}} isValid={true} />
    </Flex>
  );
};