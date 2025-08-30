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
  HStack,
  Text
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SearchAddressModal from './SearchAddressModal'

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
  const [isSearchAddressModalOpen, setIsSearchAddressModalOpen] = useState(false)
  
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
      phoneNumber: '',
      address: '',
      addressDetail: '',
      zipCode: '',
      agreedPrivacyPolicy: false,
      agreedTermsOfUse: false,
      agreedDataUsage: false,
      agreedMarketing: false,
    },
  })

const onSubmit = async () => {
  const payload = getValues();
  setMember(payload as Partial<Member>);
  router.push('/signup/detail');
};

const handleCompleteAddress = (data: any) => {
  setValue('address', data.address, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  })
  setValue('zipCode', String(data.zonecode), {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  })
}

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
            <FieldRoot>
              <CustomFieldLabel>전화번호</CustomFieldLabel>
              <CommonInput
                placeholder="전화번호를 입력해주세요."
                register={register('phoneNumber')}
                type="tel"
                isInvalid={!!errors.phoneNumber}
                errorMessage={touchedFields.phoneNumber ? errors.phoneNumber?.message : undefined}
              />
            </FieldRoot>
            <FieldRoot>
              <CustomFieldLabel>우편번호</CustomFieldLabel>
              <CommonInput
                placeholder="우편번호를 입력해주세요."
                register={register('zipCode')}
                type="text"
                isInvalid={!!errors.zipCode}
                errorMessage={touchedFields.zipCode ? errors.zipCode?.message : undefined}
              />
            </FieldRoot>
            <FieldRoot>
              <CustomFieldLabel>주소</CustomFieldLabel>
            <HStack width="100%" justifyContent="space-between" alignItems="flex-start" gap={2}>
              <CommonInput
                placeholder="주소를 입력해주세요."
                register={register('address')}
                type="text"
                isInvalid={!!errors.address}
                errorMessage={touchedFields.address ? errors.address?.message : undefined}
              />
              <CommonButton label="주소검색" onClick={() => setIsSearchAddressModalOpen(true)} />
            </HStack>
            </FieldRoot>
            <FieldRoot>
              <CustomFieldLabel>상세주소</CustomFieldLabel>
              <CommonInput
                placeholder="상세주소를 입력해주세요."
                register={register('addressDetail')}
                type="text"
                isInvalid={!!errors.addressDetail}
                errorMessage={touchedFields.addressDetail ? errors.addressDetail?.message : undefined}
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
      <SearchAddressModal isOpen={isSearchAddressModalOpen} onClose={() => setIsSearchAddressModalOpen(false)} onComplete={handleCompleteAddress} />
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
