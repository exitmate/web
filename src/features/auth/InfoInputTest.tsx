'use client'

import { infoInput } from '@/app/actions/auth/infoInput'
import { CommonButton } from '@/components/common/CommonButton'
import { CommonInput } from '@/components/common/CommonInput'
import { CommonCheckbox } from '@/components/common/CommonCheckbox'
import { DatePicker } from '@/components/common/DatePicker'
import { CommonSelect } from '@/components/common/CommonSelect'
import { useActionState } from 'react'
import { useRef, useState } from 'react'
import { ActionResult } from '@/app/actions/schema'

export default function InfoInputTest() {
  const formRef = useRef<HTMLFormElement>(null)
  const initialState: ActionResult = {
    success: false,
    errors: [],
  }
  const [state, formAction] = useActionState(infoInput, initialState)

  // 체크박스 상태 관리
  const [agreedPrivacyPolicy, setAgreedPrivacyPolicy] = useState(false)
  const [agreedTermsOfUse, setAgreedTermsOfUse] = useState(false)
  const [agreedDataUsage, setAgreedDataUsage] = useState(false)
  const [agreedMarketing, setAgreedMarketing] = useState(false)

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">InfoInput Action 테스트</h1>

      <form ref={formRef} action={formAction} className="space-y-4">
        {/* 이름 입력 */}
        <div>
          <label className="block text-sm font-medium mb-1">이름 *</label>
          <CommonInput
            placeholder="이름을 입력하세요"
            type="text"
            isInvalid={!!state?.errors?.find((e) => e.field === 'name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">이메일 *</label>
          <CommonInput
            placeholder="이메일을 입력하세요"
            type="email"
            isInvalid={!!state?.errors?.find((e) => e.field === 'email')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">생년월일 *</label>
          <DatePicker
            isInvalid={!!state?.errors?.find((e) => e.field === 'birthDate')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">성별 *</label>
          <CommonSelect
            placeholder="성별을 선택하세요"
            items={[
              { label: '남성', value: 'MALE' },
              { label: '여성', value: 'FEMALE' },
            ]}
            isInvalid={!!state?.errors?.find((e) => e.field === 'gender')}
          />
        </div>

        {/* 약관 동의 */}
        <div className="space-y-2">
          <div>
            <CommonCheckbox
              label="개인정보 처리방침 동의 *"
              checked={agreedPrivacyPolicy}
              onChange={setAgreedPrivacyPolicy}
            />
            <input
              type="hidden"
              name="agreedPrivacyPolicy"
              value={agreedPrivacyPolicy ? 'true' : 'false'}
            />
          </div>

          <div>
            <CommonCheckbox
              label="이용약관 동의 *"
              checked={agreedTermsOfUse}
              onChange={setAgreedTermsOfUse}
            />
            <input
              type="hidden"
              name="agreedTermsOfUse"
              value={agreedTermsOfUse ? 'true' : 'false'}
            />
          </div>

          <div>
            <CommonCheckbox
              label="데이터 사용 동의 *"
              checked={agreedDataUsage}
              onChange={setAgreedDataUsage}
            />
            <input
              type="hidden"
              name="agreedDataUsage"
              value={agreedDataUsage ? 'true' : 'false'}
            />
          </div>

          <div>
            <CommonCheckbox
              label="마케팅 정보 수신 동의 (선택)"
              checked={agreedMarketing}
              onChange={setAgreedMarketing}
            />
            <input
              type="hidden"
              name="agreedMarketing"
              value={agreedMarketing ? 'true' : 'false'}
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <CommonButton label="정보 입력" type="submit" />
      </form>

      {/* 결과 표시 */}
      {state && (
        <div
          className={`p-4 rounded-lg ${
            state.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${
              state.success ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {state.success ? '성공' : '오류'}
          </h3>

          {state.success ? (
            <div className="space-y-2 text-sm">
              <p>
                <strong>입력된 데이터:</strong>
              </p>
              <pre className="bg-white p-2 rounded text-xs overflow-auto">
                {JSON.stringify(state.data, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-sm">{state.error}</p>
          )}
        </div>
      )}

      {/* 필드별 에러 표시 */}
      {state?.errors && state.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">입력 오류</h3>
          <ul className="text-sm text-red-700 space-y-1">
            {state.errors.map((error, index) => (
              <li key={index}>
                <strong>{error.field}:</strong> {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
