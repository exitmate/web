'use client'
import { MemberInfoInputSchema } from '@/app/api/members/schema'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import { CommonButton } from '@/components/common/CommonButton'
import { CommonCheckbox } from '@/components/common/CommonCheckbox'
import { CommonInput } from '@/components/common/CommonInput'
import CommonSelect from '@/components/common/CommonSelect'
import DatePicker from '@/components/common/DatePicker'
import Spacing from '@/components/common/Spacing'
import { Member } from '@/generated/prisma'
import useUserStore from '@/stores/user'
import colors from '@/utils/colors'
import {
  FieldLabel,
  FieldRoot,
  Fieldset,
  FieldsetContent,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

const ReadFullText = ({ url }: { url: string }) => {
  return (
    <ReadFullTextContainer onClick={() => window.open(url, '_blank')}>
      <Text>전문보기</Text>
      <Image src={ArrowRightIcon} alt="arrow-right" />
    </ReadFullTextContainer>
  )
}

export const SignUpForm = () => {
  const router = useRouter()
  const { setMember } = useUserStore()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, touchedFields },
    setValue, 
    trigger,
    control,
  } = useForm({
    resolver: zodResolver(MemberInfoInputSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      name: '',
      email: '',
      birthDate: undefined,
      gender: undefined,
      agreedPrivacyPolicy: false,
      agreedTermsOfUse: false,
      agreedDataUsage: false,
      agreedMarketing: false,
    },
  })

const onSubmit = async () => {
  try {
    const payload = getValues();
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let message = '서버 오류';
      try {
        const json = text ? JSON.parse(text) : null;
        message = json?.message ?? message;
      } catch {
        /* ignore JSON parse error */
      }
      alert(`회원가입에 실패했습니다: ${message}`);
      return;
    }
    setMember(payload as Partial<Member>);
    router.push('/signup/detail');
  } catch (err) {
    console.error('Fetch 에러:', err);
    alert('네트워크에 문제가 발생했습니다. 다시 시도해주세요.');
  }
};

  useEffect(() => {
    trigger()
  }, [trigger])

  const handleDateChange = (year: string, month: string, day: string) => {
    if (year && month && day) {
      const birthDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`
      setValue('birthDate', new Date(birthDate), { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    } else {
      setValue('birthDate', undefined, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    }
  }

  return (
    <SignUpFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root size="sm" >
          <FieldsetContent>
            <FieldRoot>
              <CustomFieldLabel>이메일</CustomFieldLabel>
              <CommonInput
                placeholder="이메일을 입력해주세요."
                register={register('email')}
                type="email"
                isInvalid={!!errors.email}
                errorMessage={touchedFields.email ? errors.email?.message : undefined}
              />
            </FieldRoot>
            <FieldRoot>
              <CustomFieldLabel>이름</CustomFieldLabel>
              <CommonInput
                placeholder="이름을 입력해주세요."
                register={register('name')}
                type="text"
                isInvalid={!!errors.name}
                errorMessage={touchedFields.name ? errors.name?.message : undefined}
              />
            </FieldRoot>
            <FieldRoot>
              <CustomFieldLabel>성별</CustomFieldLabel>
              <CommonSelect
                placeholder="성별을 선택해주세요"
                items={[
                  { label: '남자', value: 'MALE' },
                  { label: '여자', value: 'FEMALE' },
                ]}
                register={register('gender')}
                isInvalid={!!errors.gender}
                errorMessage={touchedFields.gender ? errors.gender?.message : undefined}
              />
            </FieldRoot>
            <FieldRoot>
              <CustomFieldLabel>생년월일</CustomFieldLabel>
              <DatePicker
                isInvalid={!!errors.birthDate}
                onDateChange={handleDateChange}
                errorMessage={touchedFields.birthDate ? errors.birthDate?.message : undefined}
              />
            </FieldRoot>
            <Spacing height={18} />
            <FieldRoot>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'space-between',
                }}
              >
                <Controller
                  control={control}
                  name="agreedTermsOfUse"
                  render={({ field }) => (
                    <CommonCheckbox
                      label="[필수] 개인정보 처리방침에 동의합니다."
                      checked={!!field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <ReadFullText url="https://www.google.com" />
              </div>
            </FieldRoot>
            <FieldRoot>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'space-between',
                }}
              >
                <Controller
                  control={control}
                  name="agreedPrivacyPolicy"
                  render={({ field }) => (
                    <CommonCheckbox
                      label="[필수]이용약관에 동의합니다."
                      checked={!!field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <ReadFullText url="https://www.google.com" />
              </div>
            </FieldRoot>
            <FieldRoot>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'space-between',
                }}
              >
                <Controller
                  control={control}
                  name="agreedDataUsage"
                  render={({ field }) => (
                    <CommonCheckbox
                      label="[필수] 데이터 활용에 동의합니다."
                      checked={!!field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <ReadFullText url="https://www.google.com" />
              </div>
            </FieldRoot>
            <FieldRoot>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'space-between',
                }}
              >
                <Controller
                  control={control}
                  name="agreedMarketing"
                  render={({ field }) => (
                    <CommonCheckbox
                      label="[선택] 마케팅 수신에 동의합니다."
                      checked={!!field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </FieldRoot>
            <Spacing height={24} />
            <CommonButton
              label="다음 단계로 넘어가기"
              disabled={!isValid}
              type="submit"
            />
          </FieldsetContent>
        </Fieldset.Root>
      </form>
    </SignUpFormContainer>
  )
}

const SignUpFormContainer = styled.div`
  width: 100%;
  max-width: 438px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const CustomFieldLabel = styled(FieldLabel)`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.gray[8]};
`

const ReadFullTextContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  color: ${colors.gray[6]};
`

export default SignUpForm
